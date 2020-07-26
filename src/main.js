import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/Vuesax';
import './plugins/firebase';
import './assets/main.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    if (store.state.authId) {
      this.$store.dispatch('fetchUser', { id: store.state.authId });
    }
  },
}).$mount('#app');
