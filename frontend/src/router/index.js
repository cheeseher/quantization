import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/records',
    name: 'records',
    component: () => import('../views/Records.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import('../views/Monitor.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 