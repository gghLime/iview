// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './vuex/store'
import axios from 'axios'
import _ from 'lodash'
import 'iview/dist/styles/iview.css'
import './style/iview-theme.less'
import './assets/font/iconfont.css'
import 'lib-flexible'

const Axios = axios.create({
  baseURL: 'http://47.106.128.201/v1', // 此处存放请求地址前缀
  timeout: 10000, // 请求超时时间
  responseType: 'json', // 一般一个网站的responseType 都是一样的
  headers: {
    'Content-Type': 'application/json' // 如果一个项目中涉及到不同的header 请通过下文opts进行传递，但是一般很少见
  }
})
Axios.interceptors.request.use(config => {
  if (location.hash.indexOf('login') === -1 || config.url.indexOf('info') > 0) {
    if (localStorage.getItem('curUser')) {
      config.headers['Authorization'] = '{"userId":"' + JSON.parse(localStorage.getItem('curUser')).id + '"}'
    } else {
      router.go('/login')
    }
  }
  return config
}, error => {
  Promise.reject(error)
})
Axios.interceptors.response.use(function (res) {
  return res
}, function (error) {
  return Promise.reject(error)
})
Vue.config.productionTip = false
Vue.use(iView)
Vue.prototype._ = _
Vue.prototype.$http = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
