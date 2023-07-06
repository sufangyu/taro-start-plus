import { createRouter, createWebHashHistory } from 'vue-router'
// import { baseRouters } from './base'
import { demoRouters } from './demo'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/share/create'
    },
    ...demoRouters,
    // ...baseRouters
  ]
})

export default router
