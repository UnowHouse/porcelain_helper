<template>

	<div class="wrapper">
        <!-- 头部 -->
		<top-header @toProfile="selectFn" @reload="reload"></top-header>	
        <!-- 头部 /-->
        <!-- 左侧导航栏 -->		
		<side-bar ref="sidebar">
			<li class="linkLi" v-for="(item,index) in menu " :key="index" v-if="item.children.length===0" :class="item.active ? 'active': ''"
             @click="selectFn(item)" >
				<a href="javascript:void(0)">
					<i :class="item.icon ? item.icon :'fa fa-circle-o'"></i>
					<span>{{item.name}}</span>
					<i v-if="item.children.length > 0" class="fa fa-angle-right"></i>
				</a>
			</li>
            <li class="treeview" v-for="(item,index) in menu " :key="index" v-if="item.children.length > 0" >
                <a href="javascript:void(0)">
                    <i :class="item.icon ? item.icon :'fa fa-circle-o'"></i>
                    <span>{{item.name}}</span>
                    <i class="fa fa-angle-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li v-for="(child,i) in item.children" :key="i"
                     @click="selectFn(item)" :class="child.active ? 'active': ''">
                        <a @click="selectFn(child)" href="javascript:void(0)">
                            <i  :class="child.icon ? child.icon :'fa fa-circle-o'"></i>
                            {{child.name}}
                        </a>
                    </li>                    
                </ul>
            </li>
		</side-bar>
        <!-- 左侧导航栏 /-->     
        <!-- 主体 -->
		<container>
			
            <!-- 路由 -->
            <transition name="fade" mode="out-in">
              <router-view @updateProfile="updateProfile" :barLoad="isLoad"></router-view>
            </transition>
            <!-- 路由/ -->

		</container>
        <!-- 主体 /-->
		        <my-footer></my-footer>

	</div>
</template>
<script>
	import Container from './container/Container'
	import TopHeader from './header/TopHeader'
	import SideBar from './sidebar/SideBar'
    import Footer from './footer/Footer'
	import menu from '@/router/menu'

	export default {
		components: {
			'container': Container, 
			'top-header': TopHeader,
			'side-bar': SideBar,
            'my-footer': Footer
	    },
    	name: 'full',
    	data() {

    		const validatePass = (rule, value, callback) => {
    		  
    		}

    		return {
                isLoad: true,
    			theme: 'dark', // 主题
    			themeBool: true,
    			modalUser: false,
    			modal_loading: false,
    			formValidate: {
    			  check_password: ''
    			},
    			menu: menu, // 导航菜单
    			ruleValidate: {
    			  check_password: [
    			    {
    			      validator: validatePass,
    			      trigger: 'blur'
    			    }
    			  ]
    			}
    		}
    	},
      created() {
       
      },

      mounted() {

        let path = this.$router.history.current.fullPath
          $.each(this.menu, function(index,val){
            val.active = false
            if(val.path === path){
                val.active = true
            }

        })
        // $.pushMenu.activate("[data-toggle='offcanvas']");
          
      },
    	computed: {
    	  state () {
    	    return this.$store.state.app
    	  }
    	},

    	methods: {
            selectFn(item){ 
                $.each(this.menu, function(index,val){
                    val.active = false
                })
                item.active = true
               
                this.$router.push({
                    path: item.path
                })
            },
    	    reload(){
                this.isLoad=this.isLoad?false:true
            },
            updateProfile(userInfo) {
                this.$refs.sidebar.updateProfile(userInfo)
            }
    	}, 
       


        watch: {//使用watch 监听$router的变化
            $route(to, from) {
              //如果to索引大于from索引,判断为前进状态,反之则为后退状态
              if(to.meta.index > from.meta.index){
                //设置动画名称
                this.transitionName = 'slide-left';
              }else{
                this.transitionName = 'slide-right';
              }
            }
        }

	}
</script>

<style>
    .table-title{
        font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-weight: bold;    
      }
      .v-pagin{
        text-align: center;
        padding-top: 20px;
      }
      .right-bread{
        text-align: right;
      }
      .bread-li > li{
        display: inline-block;
      }


</style>
