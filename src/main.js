import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import fastclick from 'fastclick' //处理点击300s延迟问题
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
  loading: require('common/images/default.png')
})

Vue.config.productionTip = false
import 'common/stylus/index.styl'

fastclick.attach(document.body)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
