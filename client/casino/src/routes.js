// routes.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue'; // 


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Ajoutez d'autres routes si nécessaire
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
