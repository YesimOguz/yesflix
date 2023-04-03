import Vue from 'vue'
import App from './App.vue'
import Carousel3d from 'vue-carousel-3d';
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueStarRating from "vue-star-rating";

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Carousel3d)
Vue.component('star-rating', VueStarRating.default)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
