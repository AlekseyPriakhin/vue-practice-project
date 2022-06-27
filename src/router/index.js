import { createRouter, createWebHistory } from 'vue-router'
import { checkAuth } from '@/services/AuthService'
//import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("../views/HomeView.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (!to.path.includes('/login') && !checkAuth()) {
      router.push('/login')
  }
  else if (to.path.includes('/login') && checkAuth(router)) {
    router.push('/');
  }
})

export default router
