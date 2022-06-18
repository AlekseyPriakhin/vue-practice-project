import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=> import("../views/HomeView.vue")
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>
{
  const logStatus = store.getters.accessToken;
  if(logStatus && to.path.includes('/login'))  //router.push('/')
  if(!to.path.includes('/login'))
  {
    if(!logStatus) next('/login?message=authorization')
  }
  console.log("ok router")
 
  next();
})

export default router
