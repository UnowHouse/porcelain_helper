<template>
	<div>
		<div class="page-title">
		  <div>
		    <h1><i class="fa fa-laptop"></i>个人中心</h1>
		  </div>
		  <div>
		    <ul class="breadcrumb">
              <li><i class="fa fa-user fa-lg"></i></li>
              <li><a href="#/profile">个人中心</a></li>
            </ul>
		  </div>
		</div>


		<div class="row">

		  <div class="col-md-12">
		    <div class="card">
		      <div id="card-body"  class="card-body">
		        <div class="row">
                    <!-- Column -->
                    <div class="col-lg-4 col-xlg-3 col-md-5">
                        <div class="card">
                            <div class="card-block">
                                <center class="m-t-30"> <img v-bind:src="userInfo.face" class="img-circle" width="150">
                                	<h4>&nbsp;</h4>
                                    <h4 class="card-title m-t-10">{{userInfo.sickname}}</h4>
                                    <h6 class="card-subtitle">{{userInfo.identity}}</h6>
                                    <button @click="changeFace" class="btn btn-info">修改头像</button>
                                </center>
                            </div>
                        </div>
                    </div>
                    <!-- Column -->
                    <!-- Column -->
                    <div class="col-lg-8 col-xlg-9 col-md-7">
                        <div class="card">
                            <div class="card-block">
                                <form class="form-horizontal form-material">
                                    <div class="form-group">
                                        <label class="col-md-12">昵称</label>
                                        <div class="col-md-12">
                                            <input v-model="userInfo.sickname" type="text" placeholder="我的昵称" class="form-control form-control-line">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="example-email" class="col-md-12">餐费设置</label>
                                        <div class="col-md-12">
                                            <input v-model="userInfo.mealCost" type="number" placeholder="" class="form-control form-control-line" >
                                        </div>
                                    </div>
                                
                          			<div class="form-group">
                                        <label class="col-md-12">用户名：{{userInfo.username}}</label>
                                        
                                    </div>
                                        <div class="form-group">
                                    	<label class="col-md-12">身份：{{userInfo.identity}}</label>
                                    </div>
                          			<div class="form-group">
                                        <label class="col-md-12">注册时间：{{userInfo.created|timeFormat('Y/MM/D')}}</label>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <a @click="updateProfile" href="javascript:void(0)" class="btn btn-success">确定修改</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- Column -->
                </div>
		        
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>
<script>
	
	export default{
		name: 'profile',
		data (){
			return {
				userInfo: {},
			}
		},
        mounted (){
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
            this.userInfo.mealCost = this.Filters.shrinkMoneyUnit(this.userInfo.mealCost)
        },
        methods: {
            updateProfile() {
                let expendMoney = this.Filters.expendMoneyUnit(this.userInfo.mealCost)
                this.$http({
                    url: this.apiUrls.getUserIdPrefix+this.apiUrls.updateProfile,
                    method: 'put',
                    data: { 

                            id: this.userInfo.id,
                            username: this.userInfo.username,
                            sickname:this.userInfo.sickname,
                            mealCost:expendMoney,         
                        }
                }).then(()=>{
                    $.notify({
                        title: "修改成功",
                        message: `数据成功更新至后台`,
                        icon: 'fa fa-check' 
                    },{
                        type: "success"
                    });
                    this.$emit("updateProfile", this.userInfo)
                    let newInfo = this.userInfo;
                    newInfo.mealCost = expendMoney
                    this.$store.commit("USER_STATUS",JSON.stringify(newInfo))

                    this.userInfo.mealCost = this.Filters.shrinkMoneyUnit(this.userInfo.mealCost)

                }).catch(()=>{
                   $.notify({
                        title: "修改失败",
                        message: `请检测网络状况`,
                        icon: 'fa fa-close' 
                    },{
                        type: "danger"
                    }); 
                })

            },
            changeFace (){
                $.notify({
                        title: "待开发",
                        message: `努力补加新功能中！谢谢`,
                        icon: 'fa fa-child fa-lg' 
                    },{
                        type: "info"
                    }); 
            }
        }
	}
</script>
<style>
	
</style>