import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HomeComponent from './pages/HomeComponent'
import AboutComponent from './pages/AboutComponent'

require('@/assets/main.scss');

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
      {path: '/', component: HomeComponent, name: 'form', meta: {title: 'Form'}},
      {path: '/about', component: AboutComponent, name: 'about', meta: {title: 'About'}}
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
