import { createRouter, createWebHistory } from 'vue-router';
import TableView from '@/views/TableView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'table',
      component: TableView,
    },
    {
      path: '/transactions/:id',
      name: 'TransactionDetails',
      component: () => import('../views/TransactionDetails.vue'),
    },
  ],
});

export default router;
