import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

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

router.beforeEach((to,from,next)=>
{
  const logStatus = store.getters.accessToken;
  if(logStatus && to.path.includes('/login')) // router.push('/')
  if(!to.path.includes('/login'))
  {
    if(!logStatus) next('/login?message=authorization')
  }
 
  next();
})

export default router
