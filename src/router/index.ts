import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('../views/SearchResultsView.vue'),
        },
        {
          path: 'new-arrivals',
          name: 'new-arrivals',
          component: () => import('../views/NewArrivalsView.vue'),
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import('../views/FavoritesView.vue'),
        },
        {
          path: 'shop',
          name: 'shop',
          component: () => import('../views/MainCategoryView.vue'),
        },
        {
          path: 'category/:slug',
          name: 'category',
          component: () => import('../views/CategoryListingView.vue'),
        },
        {
          path: 'product/:slug',
          name: 'product',
          component: () => import('../views/ProductDetailView.vue'),
        },
        {
          path: 'compare',
          name: 'compare',
          component: () => import('../views/CompareView.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue'),
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('../views/CheckoutView.vue'),
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../views/MyAccountView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
    },
  ],
})

export default router
