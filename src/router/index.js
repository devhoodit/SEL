import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/scheduler',
    name: 'scheduler',
    component: () => import('../views/scheduler.vue')
  },
  {
    path: '/currentProcess',
    name: 'currentProcess',
    component: () => import('../views/currentProcess.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/setting.vue')
  },
  {
    path: '/check',
    name: 'check',
    component: () => import('../views/check.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
