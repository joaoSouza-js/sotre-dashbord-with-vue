import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Product from '../views/Product.vue'
import UserCardView from '../views/UserCardView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView
    },
    {
      path: "/products/:id",
      name: "product",
      component: Product
    },
    {
      path: "/card",
      name: "userCard",
      component: UserCardView
    },
    {
      path: "/dashboard",
      name: "dashboardView",
      component: DashboardView
    }
  ]
})

export default router
