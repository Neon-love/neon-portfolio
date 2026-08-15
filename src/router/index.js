import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import AboutView from '@/views/AboutView.vue'
import ProjectsView from '@/views/ProjectsView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',         component: LandingView },
    { path: '/about',    component: AboutView },
    { path: '/projects', component: ProjectsView },
  ],
  scrollBehavior: () => ({ top: 0 })
})