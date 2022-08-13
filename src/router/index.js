import { useAccountStore } from '@/stores/account';
import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView,
    beforeEnter: (to, from, next) =>{
      const accountStore = useAccountStore();
      if(!accountStore.isAuthenticated()){
        return next(); 
      } else {
        return next({name:'app'});
      }
    },
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: (to, from, next) =>{
      const accountStore = useAccountStore();
      if(accountStore.isAuthenticated()){
        return next(); 
      } else {
        return next({name:'auth'});
      }
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
