import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../layout'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/goods/list',
    children: [
      {
        path: '/goods/list',
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
