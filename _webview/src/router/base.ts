import type { RouteRecordRaw } from 'vue-router'

export const baseRouters: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/403',
    name: 'NoAuth',
    component: () => import('@/views/error-page/403.vue')
  },
  {
    path: '/401',
    name: 'NoLogin',
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/redirect',
    component: () => import('@/layout/base.vue'),
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]
