import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BuildView from '@/views/BuildView.vue';
import CartView from '@/views/CartView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import LoginView from '@/views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/build',
    name: 'build',
    component: BuildView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { requiresAuth: true },  // Proteger apenas o carrinho
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Verifica se o usuário está autenticado antes de acessar páginas protegidas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Salva a URL que o usuário tentou acessar
    localStorage.setItem('redirectTo', to.fullPath);
    next('/login');  // Redireciona para o login
  } else {
    next();  // Acesso permitido
  }
});

export default router;
