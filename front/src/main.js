// main.js
import Vue from 'vue';
import App from './App.vue';
import router from './routes'; // Importez le routeur que vous avez créé

Vue.config.productionTip = false;

new Vue({
  router, // Utilisez le routeur dans votre application
  render: h => h(App),
}).$mount('#app');
