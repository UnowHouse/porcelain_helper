// 导入模块
import Vue from 'vue'
import axios from 'axios'
import { SERVER_BASE_URL } from './config'

export default function fetch (options) {

  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: SERVER_BASE_URL,
      timeout: 5000,
      headers: {}
    })
    // http request 拦截器
    instance.interceptors.request.use(
      config => {
        // config.headers.Authorization = 'token'
        return config
      },
      err => {
        return Promise.reject(err)
      })

    // http response 拦截器
    instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error) {
        }
        return Promise.reject(error) // 返回接口返回的错误信息
      })

    // 请求处理
    instance(options)
      .then((res) => {
 

        resolve(res.data)
        return false
      })
      .catch((error) => {
        console.log(error)
        // 请求失败时,根据业务判断状态
        $.notify({
               title: "数据加载失败",
               message: "请检查网络情况或刷新重试",
               icon: 'fa fa-close' 
           },{
               type: "danger"
        });
        reject(error)
      })
  })
}
