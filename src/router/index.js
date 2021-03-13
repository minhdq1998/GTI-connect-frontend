import { 
  createRouter
  // , createWebHistory
  , createWebHashHistory
} from 'vue-router'

import Home from '../pages/Home/index.vue'

const routes = [
  {
    path: '/',
    name: 'Landing Page',
    component: Home
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import ('../pages/SignUp/index.vue')
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: () => import('../pages/SignIn/index.vue')
  },
  {
    path: '/experts',
    name: 'Our Experts',
    component: () => import('../pages/OurExperts/index.vue')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../pages/Jobs/index.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
