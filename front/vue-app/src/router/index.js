import { createRouter, createWebHashHistory } from 'vue-router';
import UserLogin from '../views/UserLogin.vue';
import UserSignin from '../views/UserSignin.vue';
import DashboardPage from '../views/DashboardPage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/signup',
    name: 'Signin',
    component: UserSignin
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
