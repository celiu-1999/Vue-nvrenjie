import 'babel-polyfill'  // 辅助ES6编译
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import '../static/reset.css'
import '../static/font/iconfont.css'
import '../static/common.css'
import VueScrollTo from 'vue-scrollto'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: require('static/svg-loaders/loaders.svg'),
  attempt: 1
})

fastclick.attach(document.body)

Vue.use(VueScrollTo)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
