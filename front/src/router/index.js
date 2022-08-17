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
    component: () => import('../views/AppView.vue'),
    beforeEnter: (to, from, next) =>{
      const accountStore = useAccountStore();
      if(accountStore.isAuthenticated()){
        return next(); 
      } else {
        return next({name:'auth'});
      }
    },
    children:[
      {
        path: '',
        name: 'app.nocommit',
        component: () => import('../views/commit/EmptyView.vue')
      },
      {
        path: 'commit/:id(.*)',
        props: true,
        name: 'app.commit',
        component: () => import('../views/commit/CommitView.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(()=>{
  window.scrollTop = 0;
})

export default router
