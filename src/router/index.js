import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../layout'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('../views/index')
      }
    ]
  },
  // TODO刷新页面找不到路由会跳404、原因可能是会先加载404页面、要把*跳404在动态添加路由时添加
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
