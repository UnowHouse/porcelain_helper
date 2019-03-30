<template>
  <div class="login">
    <section class="material-half-bg">
    </section>
    <section class="login-content">
      <div class="logo">
        <h1><img :src="require('@/assets/img/logo.png')" alt="" height="88">瓷客信条</h1>
      </div>
      <div class="login-box" v-model="loginModal" >
        <form class="login-form">
          <h3 class="login-head"><i class="fa fa-lg fa-fw fa-user"></i>登 陆</h3>
          <div class="form-group">
            <label class="control-label">用户名</label>
            <input v-model="formValidate.username" class="form-control" type="text" placeholder="Username" autofocus>
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input v-model="formValidate.password" @keyup.enter="handleSubmit" class="form-control" type="password" placeholder="Password">
          </div>
          <div class="form-group">
            <div class="utility">
              <div class="animated-checkbox">
                <label class="semibold-text">
                  <input v-model="formValidate.remember" type="checkbox">
                  <span class="label-text">保持登陆状态</span>
                </label>
              </div>
              <p class="semibold-text mb-0">
                <a id="forgotten" data-toggle="flip">忘记密码?</a>
              </p>
            </div>
          </div>


          <div class="form-group btn-container">
            <a @click="handleSubmit" href="javascript:void(0)" class="btn btn-primary btn-block">
              <i class="fa fa-sign-in fa-lg fa-fw"></i>登陆
            </a>
          </div>
        </form>

      </div>
    </section>
    <footer class="login_footer"> ©copyright by Tech.Unow </footer>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import qs from 'qs'
  export default {
    name: 'login',
    data () {
      return {
        loginModal: true,
        modal_loading: false,
        formValidate: {
          username: '',
          password: '',
          remember: true,
        },
        ruleValidate: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码错误', trigger: 'blur'}
          ]

        }
      }
    },
    methods: {
      handleSubmit () { // login
        this.$http({
              method: 'post',
              url: this.apiUrls.login,
              data: qs.stringify(this.formValidate)
          }).then((res)=>{
            if(this.formValidate.remember){
              this.$store.commit("KEEP_LIVED", "remembered")
            }
            
            this.$store.commit("USER_STATUS",JSON.stringify(res))
            
            $.notify({
                title: "登陆成功",
                message: `欢迎您，${res.sickname}`,
                icon: 'fa fa-check' 
            },{
                type: "success"
            });
            this.$router.push({path: '/index'})

          }).catch(() => {

            $.notify({
                     title: "登陆失败",
                     message: "请输入正确的账号和密码",
                     icon: 'fa fa-close' 
                 },{
                     type: "danger"
              });
          });

      },
      toRegister () {
        this.$router.push('/register')
      },
      testRule() {

      }
    }
  }
</script>
<style>
  .login_footer{
    height: 40px;
    width: 100%;
    text-align: center;
    line-height: 40px;
    z-index: 9;
    position: fixed;
    bottom: 0;
    color:#fafafa;
  }
</style>

