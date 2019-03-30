
const authority = {
  state: {
    userInfo: {},
    isLogin: undefined,
    remember: undefined,
    online: undefined,
  },

  mutations: {

  	KEEP_LIVED(state, remember){
  		localStorage.setItem("remember", "remembered")
  	},
    //保存登录状态
    USER_STATUS(state, res, remember) {
      sessionStorage.setItem("online","true")
      localStorage.setItem("userInfo", res)
      localStorage.setItem("isLogin", "logined")
    },
    LOGOUT_STATUS(state){
      sessionStorage.setItem("online", "")
  	  localStorage.setItem("userInfo", "")
  	  localStorage.setItem("remember", "")
      localStorage.setItem("isLogin", "")	   
  	}
  }
}

export default authority