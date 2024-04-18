import {createRouter, createWebHistory} from 'vue-router'
import Home from './components/Home.vue';
import Test from './components/Test.vue';


const routes = [
  {
    path: '/', // Définissez le chemin de votre nouvelle route
    name: 'Home',
    component: Home
  },

  {
    path: '/test',
    name: 'test',
    component: Test
  }

  // Ajoutez d'autres routes si nécessaire
];

const router = createRouter({
    history:createWebHistory('/'),
    routes
})
export default router;
