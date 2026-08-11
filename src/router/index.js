import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import AboutView from '@/views/AboutView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',      component: LandingView },
    { path: '/about', component: AboutView },
  ],
  scrollBehavior: () => ({ top: 0 })
})