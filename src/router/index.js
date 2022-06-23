import { createRouter, createWebHistory } from 'vue-router'
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
    component: () => import( '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to)=>
{
  const logStatus = localStorage.getItem('access');
  if(logStatus && to.path.includes('/login'))  router.push(to.path)
  if(!to.path.includes('/login') && !logStatus ) router.push('login')
})

export default router
