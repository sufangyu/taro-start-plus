import type { RouteRecordRaw } from 'vue-router'

export const demoRouters: RouteRecordRaw[] = [
  {
    path: '/share',
    name: 'Share',
    component: () => import('@/views/demo/share.vue')
  },

]
