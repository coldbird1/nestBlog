import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/login.vue')
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/layout.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('@/views/category/index.vue')
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('@/views/article/index.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue')
        }
      ]
    }
  ]
})

export default router
