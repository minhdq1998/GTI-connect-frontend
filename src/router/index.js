import { 
  createRouter
  // , createWebHistory
  , createWebHashHistory
} from 'vue-router'

import store from '@/store'

import Home from '../pages/Home/index.vue'

import { tokenIsAlive, hasRefreshToken} from '@/utils/auth'
import { account_role} from '@/constants'
import {permissions, hasPermission} from '@/utils/permissions'

const routes = [
  {
    path: '/',
    name: 'About',
    component: Home,
    meta: { permission: permissions.EVERYBODY }
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: () => import('../pages/SignIn/index.vue'),
    meta: { permission: permissions.ONLY_VISITORS }
  },
  {
    path: '/signup',
    name: 'Join',
    component: () => import ('../pages/SignUp/index.vue'),
    meta: { permission: permissions.ONLY_VISITORS }
  },
  {
    path: '/experts',
    name: 'Our Experts',
    component: () => import('../pages/OurExperts/index.vue'),
    meta: { permission: permissions.ONLY_LOGGED_IN }
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../pages/Jobs/index.vue'),
    meta: { permission: permissions.ONLY_LOGGED_IN }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard/index.vue'),
    meta: { permission: permissions.ONLY_LOGGED_IN },
    children: [
      {
        path: '',
        name: 'Your Profile',
        component: () => import('../pages/Dashboard/UserProfile/index.vue'),
        meta: { permission: permissions.ONLY_LOGGED_IN }
      },
      {
        path: 'manageconnections',
        name: 'Manage Connections',
        component: () => import('../pages/Dashboard/ManageConnectionRequest/index.vue'),
        meta: { permission: permissions.ONLY_LOGGED_IN }
      },
      {
        path: 'createconnection',
        name: 'New Connection',
        component: () => import('../pages/Dashboard/CreateConnection/index.vue'),
        meta: { permission: permissions.ONLY_GLOBAL_TALENTS }
      },
      {
        path: 'payments',
        name: 'Payments',
        component: () => import('../pages/Dashboard/Payments/index.vue'),
        meta: { permission: permissions.ONLY_LOGGED_IN }
      }
    ]
  },
]


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  let access_permission = to.meta.permission

  let accessToken = store.state.user.accessToken

  if (hasRefreshToken()) {
    // Refresh token in case lost track of access token or access token expired
    if (!accessToken || !tokenIsAlive()) await store.dispatch('user/refreshToken')
    // Refresh user information
    if (!store.state.user.id) await store.dispatch('user/getCurrentUser')
  }

  if (!hasPermission(access_permission) ) {
    if (store.state.user.role === account_role.VISITOR) return next({name: 'Sign In'})
    else return next({path: '/'})
  }
  return next()
})

export default router
