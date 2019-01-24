// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'

Vue.config.productionTip = false
import  './styles/reset.less'
import  axios from 'axios'
Vue.prototype.$axios=axios
import '../static/css/font-awesome.css'
//引入时间插件
import moment from 'moment'
//注册全局过滤器
Vue.filter('dateFrm', function (value) {  
  return  moment(value).format("YYYY-MM-DD");
})
Vue.filter('imgurl', function (value) {  
  return  value.replace(/w.h/i,"140.208");
})
Vue.filter('getImg', function (value) {
  let Img = value.replace("w.h","120.180");
    return  Img;
})
Vue.filter('getImg2', function (value) {
  let Img2 = value.replace("w.h","170.230");
    return  Img2;
})
Vue.filter('getImg3', function (value) {
  let Img3 = value.replace("w.h","148.208");
    return  Img3;
})
Vue.filter('getImg4', function (value) {
  let Img3 = value.replace("w.h","128.180");
    return  Img3;
})
Vue.filter('getDates', function (value) {
  let reg = /\s[\u2E80-\u9FFF]{2}/gi;
  let Dates = value.replace(reg,"");
    return  Dates;
})
//mint-ui

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import Swiper from 'swiper'
import store from './store/index.js'
Vue.use(store)

// loading效果
// 利用axios拦截器全局设置
import { Indicator } from 'mint-ui';
axios.interceptors.request.use(config => {
    Indicator.open();
    // console.log('config:',config);
    config.params.token = '';
    return config
}, error => {
    Indicator.close();
    
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
    // 响应成功关闭loading
    Indicator.close();
    return data
}, error => {
    Indicator.close();
    return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
