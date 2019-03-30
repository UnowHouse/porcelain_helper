<template>
	<!-- Navbar-->
	<header class="main-header hidden-print">
	  <a class="logo" href="#">瓷客信条</a>
	  <nav class="navbar navbar-static-top">
	    <!-- Sidebar toggle button-->
	    <a @click="resize" class="sidebar-toggle" href="javascript:void(0)" data-toggle="offcanvas"></a>
	    <!-- Navbar Right Menu-->
	    <div class="navbar-custom-menu">
	      <ul class="top-nav">
	        
	        <!-- User Menu-->
	        <li class="dropdown"><a class="dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user fa-lg"></i></a>
	          <ul class="dropdown-menu settings-menu">
	            <li><a @click="profile" href="javascript:void(0)"><i class="fa fa-cog fa-lg"></i> 个人信息</a></li>
	            <li><a @click="logout" href="javascript:void(0)"><i class="fa fa-sign-out fa-lg"></i> 注销</a></li>
	          </ul>
	        </li>
	      </ul>
	    </div>
	  </nav>
	</header>
	<!-- Side-Nav-->

</template>
<script>
	import Cookies from 'js-cookie'
	export default {
	    name: 'topheader',

	    data () {
	      return { 

	      }
	    },
	    created() {
	    	          // Activate sidenav toggle
       		
	    },
	    methods: {
	    	logout() {

	    		this.$http({
	    			method:'get',
	    			url: this.apiUrls.logout
	    		}).then(()=>{
	    			this.$store.commit("LOGOUT_STATUS")
	    			this.$router.push('/login')
		    		$.notify({
	                    title: "注销成功",
	                    message: "",
	                    icon: 'fa fa-check' 
	                },{
	                    type: "success"
	                });
	    		}).catch(()=>{
	    			$.notify({
	                    title: "网络错误",
	                    message: "请刷新尝试",
	                    icon: 'fa fa-close' 
	                },{
	                    type: "danger"
	                });
	    		})
	    		
	    	},
	    	resize() {
	    		this.$emit('reload');
	    	},
	    	profile () {
	    		this.$emit('toProfile', {path:'/profile',active:true})
	    	}

	    }


	}
</script>
