import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/events/create',
      name: 'eventCreate',
      component: () => import('../views/EventCreate.vue')
    },
    {
      path: '/events/:id',
      name: 'eventEdit',
      component: () => import('../views/EventEdit.vue')
    }
  ]
})

export default router
