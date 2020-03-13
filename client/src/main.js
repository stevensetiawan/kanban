import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  render: element => element(App),
}).$mount('#app');