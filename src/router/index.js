import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from './routes'
import Cookies from 'js-cookie'
import apiUrls from '@/api/apiUrls'



Vue.use(Router)

const router = new Router({
  routes
})

function tmpVerify(url){
  $.ajax({
    url: url,
    method:'get',
    xhrFields: {
            withCredentials: true // 这里设置了withCredentials
    },
    success:()=>{
      sessionStorage.setItem("online","true")
    },
    error:()=>{
      sessionStorage.removeItem("online")
      localStorage.removeItem("remember")
      localStorage.removeItem("isLogin")
      localStorage.removeItem("userInfo")
    }
  })
}

router.beforeEach((to, from, next) => {

  let online = sessionStorage.getItem("online")
  let remember = localStorage.getItem("remember");
  let isLogin = localStorage.getItem("isLogin");
  let userInfo;
  if(localStorage.getItem("userInfo")){
    userInfo = JSON.parse(localStorage.getItem("userInfo"))
  }
  if (to.meta.requiresAuth) {


    if(online){
      if(!remember){
        tmpVerify(apiUrls.baseUrl + apiUrls.verifyActive)
        
      }
      store.dispatch('getCurrentPageName', to.name)
      next()

    }else if(!online && isLogin){

      if(remember){
        tmpVerify(apiUrls.baseUrl + apiUrls.verify)
      }else{
        tmpVerify(apiUrls.baseUrl + apiUrls.verifyActive)
      }

      store.dispatch('getCurrentPageName', to.name)
      next()

    }else{
      next({
        path: '/login',
        query: {redirect: '/index'}
      })
    }  


  } else {
    store.dispatch('getCurrentPageName', to.name)
    next()
  }




  if(to.path === '/login'){
    if(isLogin)
		next({
		    path: '/index',
		    query: {redirect: '/index'}
	 	})
  }
})


export default router