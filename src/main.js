// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import utils from './common/util'
import 'element-ui/lib/theme-chalk/index.css'
import {
  fetchGet,
  fetchPost
} from './common/axiosconfig'
Vue.prototype.$get = fetchGet
Vue.prototype.$post = fetchPost
Vue.prototype.$utils = utils
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
