import { 
  createRouter
  // , createWebHistory
  , createWebHashHistory
} from 'vue-router'

import store from '@/store'

import Home from '../pages/Home/index.vue'

import {isLoggedIn, tokenIsAlive} from '@/utils/auth'
import {page_access} from '@/constants'

const routes = [
  {
    path: '/',
    name: 'Landing Page',
    component: Home
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import ('../pages/SignUp/index.vue'),
    meta: {
      page_access: page_access.HAVE_NOT_AUTH
    }
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: () => import('../pages/SignIn/index.vue'),
    meta: {
      page_access: page_access.HAVE_NOT_AUTH
    }
  },
  {
    path: '/experts',
    name: 'Our Experts',
    component: () => import('../pages/OurExperts/index.vue'),
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../pages/Jobs/index.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile/index.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard/index.vue'),
    meta: {
      page_access: page_access.REQUIRE_AUTH
    },
    children: [
      {
        path: '',
        component: () => import('../pages/Dashboard/UserProfile/index.vue'),
      },
      {
        path: 'manageconnections',
        component: () => import('../pages/Dashboard/ManageConnectionRequest/index.vue'),
      },
      {
        path: 'createconnection',
        component: () => import('../pages/Dashboard/CreateConnection/index.vue'),
      },
      {
        path: 'payments',
        component: () => import('../pages/Dashboard/Payments/index.vue'),
      }
    ]
  },
]


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  let page_access_mode = to.meta.page_access
  let accessToken = store.state.user.accessToken
  if (isLoggedIn()) {
    if (!accessToken || !tokenIsAlive()) await store.dispatch('user/refreshToken')
    if (!store.state.user.id) await store.dispatch('user/getCurrentUser')
  }

  if (page_access_mode == page_access.HAVE_NOT_AUTH && isLoggedIn()) {
    next({name: 'Landing Page'})
  } else if (page_access_mode == page_access.REQUIRE_AUTH && !isLoggedIn()) {
    next({name: 'Sign In'})
  }
  next()
})

export default router
