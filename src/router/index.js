import { 
  createRouter
  // , createWebHistory
  , createWebHashHistory
} from 'vue-router'

import Home from '../components/pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Landing Page',
    component: Home
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import ('../components/pages/SignUp.vue')
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: () => import('../components/pages/SignIn.vue')
  },
  {
    path: '/experts',
    name: 'Our Experts',
    component: () => import('../components/pages/OurExperts.vue')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../components/pages/Jobs.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/pages/Profile.vue')
  },
  {
    path: '/verify-account',
    name: 'Verify',
    component: () => import('../components/pages/VerifyAccount.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
