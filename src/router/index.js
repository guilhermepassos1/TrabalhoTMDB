import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue')
  },
  {
    path: '/movie/:movieId',
    name: 'MovieDetails',
    component: () => import('@/views/MovieDetailsView.vue'),
    props: true,
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router