import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../layout'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/index')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
