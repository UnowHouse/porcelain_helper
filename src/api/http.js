import axios from 'axios'
import { SERVER_BASE_URL } from './config'
import Vue from 'vue'


// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = SERVER_BASE_URL

//让ajax携带cookie
axios.defaults.withCredentials = true


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //console.log("响应之前:"+JSON.stringify(response))
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});


//axios.interceptors.request.use(function (config) {
//  // console.log(config);
//  return config;
//})
//
Vue.prototype.$http = axios;
