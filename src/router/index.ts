import { createRouter, createWebHistory } from '@ionic/vue-router';

import { RouteRecordRaw } from 'vue-router';

import { useAuthStore } from '../stores/auth';

import MainPage from '@/views/MainPage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/authentication',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/',
    component: MainPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/projects'
      },
      {
        path: 'projects',
        component: () => import('@/views/ProjectsPage.vue')
      },
      {
        path: 'offers',
        component: () => import('@/views/OffersPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsPage.vue')
      }
    ]
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/authentication');
  } else if (to.path === '/authentication' && authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});
