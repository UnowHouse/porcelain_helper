<template>
  <div>
    <div class="modal-body">
        <form ref="staffForm" id="form-data" class="form-horizontal">
          <fieldset>
            <div class="form-group">
              <label name="staffNum" class="col-xs-3 col-sm-3 col-md-3 control-label" for="staffNum">员工编号</label>
              <div class="col-xs-6 col-sm-6 col-md-6">
                <input class="form-control" v-model="staffForm.staffNum" type="text" placeholder="员工编号">                      
              </div>
            </div>
            <div class="form-group">
              <label class="col-xs-3 col-sm-3 col-md-3 control-label" for="staffName">员工姓名</label>
              <div class="col-xs-6 col-sm-6 col-md-6">
                <input name="staffName" v-model="staffForm.staffName" class="form-control" type="text" placeholder="员工姓名">
              </div>
            </div>
      
            <div class="form-group">
              <label class="col-xs-3 col-sm-3 col-md-3 control-label" for="daprtment">所属部门</label>
              <div class="col-xs-6 col-sm-6 col-md-6">
                <input name="daprtment" v-model="staffForm.department" class="form-control" type="text" placeholder="所属部门" list="process-list">
              </div>
            </div>
            <datalist id="process-list">
                <option>高压</option>
                <option>贴标</option>
                <option>注浆</option>
                <option>上釉</option>
                <option>杯组</option>
                <option>滚压</option>
            </datalist>                   
          </fieldset>
      </form>
    </div>
    <div class="modal-footer">
      <button @click="clear" data-dismiss="modal" class="btn btn-default icon-btn" >
        <i class="fa fa-fw fa-lg fa-times-circle"></i>取消</a>
      </button>
      <button @click="submit" data-dismiss="modal" class="btn btn-primary"type="button"><i class="fa fa-fw fa-lg fa-check-circle"></i>
        {{isEdit? '修改' : '确定'}}
      </button>
    </div>
  </div>

</template>
<script>
	export default{
		name: 'staffForm',
		props: {
        oldStaffForm: Object,
        isEdit: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            baseUrl: '',
            valid: false,
            staffForm: {
            	id: '',
            	staffNum: '',
            	staffName: '',
            	department: ''
            },
            imageDialogVisible: false
        }
    },
    watch: {
        oldStaffForm(val) {
        	this.staffForm  = val;
        }
    },
    mounted() {
    	let self = this
    	$("#myModal").on('hidden.bs.modal',function(){
    		self.clear()
    	})
    },
    methods: {
    	submit() {
    		var self = this
    	    // 表单校验
    	    
    	    if(self.isEdit){
    	    	
    	    	this.$http({
	    	      	method: 'put',
	    	      	url: this.apiUrls.getUserIdPrefix()+this.apiUrls.updateStaff+this.staffForm.id,
	    	      	data: JSON.stringify(this.staffForm),
	    	      	headers: {
	    	      	    'Content-Type': 'application/json;charset=UTF-8'
	    	      	  }
	    	   	}).then(()=>{
	    	   		this.$emit('reload');
	    	   		$.notify({
 	                    title: "操作成功",
 	                    message: `数据已更新至后台`,
 	                    icon: 'fa fa-check' 
 	                },{
 	                    type: "success"
 	                });

	    	   	}).catch(() => {
	    	    	$.notify({
    	    	   	       title: "数据加载失败",
    	    	   	       message: "请检查网络情况或刷新重试",
    	    	   	       icon: 'fa fa-close' 
    	    	   	   },{
    	    	   	       type: "danger"
    	    	   	});
	    		});

    	    	
    	    }else{
    	    	this.$http({
	    	      method: 'post',
	    	      url: this.apiUrls.getUserIdPrefix()+this.apiUrls.insertStaff,
	    	      data: JSON.stringify(this.staffForm),
	    	      headers: {
	    	          'Content-Type': 'application/json;charset=UTF-8'
	    	        }
   	    	   	}).then(()=>{
   	    	   		this.$emit('reload');
   	    	   		$.notify({
	   	                    title: "操作成功",
	   	                    message: `数据已更新至后台`,
	   	                    icon: 'fa fa-check' 
	   	                },{
	   	                    type: "success"
	   	                });
   	    	   	}).catch(() => {
   	    	    	$.notify({
       	    	   	       title: "数据加载失败",
       	    	   	       message: "请检查网络情况或刷新重试",
       	    	   	       icon: 'fa fa-close' 
       	    	   	   },{
       	    	   	       type: "danger"
       	    	   	});
   	    		});

    	    }

    	},
    	clear() {
    	    // 重置表单
    	    this.staffForm.id=''
    	    this.staffForm.staffName=''
    	    this.staffForm.staffNum=''
    	    this.staffForm.department=''
    	},
    }
	}
</script>
<style>
	
</style>