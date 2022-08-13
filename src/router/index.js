import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
