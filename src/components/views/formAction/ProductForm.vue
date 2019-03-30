<template>
	<div class="modal fade" id="myModal" tabindex="-10000" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content" style="padding-bottom: 0px;">
	      <div class="modal-header" style=" border: none;">
	              <div class="modal-title">添加货物信息</div>
	          </div>
	          <div class="modal-body">
	              <form id="form-data" class="form-horizontal">
	                <fieldset>
	                  <div class="form-group">
	                    <label name="productNum" class="col-xs-3 col-sm-3 col-md-3 control-label" for="productNum">货品型号</label>
	                    <div class="col-xs-6 col-sm-6 col-md-6">
	                      <input v-model="productForm.productNum" class="form-control" type="text" placeholder="货品型号">                      
	                    </div>
	                  </div>
	                  <div class="form-group">
	                    <label class="col-xs-3 col-sm-3 col-md-3 control-label" for="goodsName">货品名称</label>
	                    <div class="col-xs-6 col-sm-6 col-md-6">
	                      <input v-model="productForm.productName" name="productName" class="form-control" type="text" placeholder="货品名称">
	                    </div>
	                  </div>
	                  <div @click="addProcessPrice" v-if="!isEdit" id="add_area" class="form-group">
	                    <label class="control-label col-xs-3 col-sm-3 col-md-3">操作</label>
	                    <div class="col-xs-9 col-sm-9 col-md-9">
	                      <a class="add_process btn btn-info" href="javascript:void(0)"><i class="fa fa-lg fa-plus"></i><span>添加新的工序和相应工价</span></a> 
	                     
	                    </div>
	                  </div>
	                  <div id="process_list">        	
	                    <div class="process_info">     

	                      <div v-for="(item,index) in productForm.processPrice" :key="index" class="form-group">
	                        <label class="control-label col-xs-3 col-sm-3 col-md-3">工序{{index+1}}</label>
	                        <div class="col-sm-3 col-md-3">
	                          <input v-model="item.process" name="process" class="process form-control" type="text" list="process-list" placeholder="工序">
	                          
	                        </div>
	                        <div class="col-xs-3 col-sm-3 col-md-3">
	                          <input v-model="item.price" name="number" class="price form-control" type="number" list="process-list" placeholder="工价" >
	                        </div>
	                        <a v-if="index>0 && !isEdit" @click="removeProcessPrice(index)" class="remove_process btn btn-warning" href="javascript:void(0)"><i class="fa fa-lg fa-minus"></i></a>
	                      </div>

	                    
	                    </div>
	                  </div>
		              <datalist id="process-list">
		                  <option>成型</option>
		                  <option>上釉</option>
		                  <option>贴标</option>
		                  <option>安搭上水</option>
		                  <option>注把</option>
		              </datalist>
	                </fieldset>
	              </form>
	          </div>
	          <div class="modal-footer">
	              <button data-dismiss="modal" class="btn btn-default icon-btn" ><i class="fa fa-fw fa-lg fa-times-circle"></i>
	              	取消</a>
	              </button>
	              <button @click="submit" data-dismiss="modal" class="btn btn-primary"type="button"><i class="fa fa-fw fa-lg fa-check-circle"></i>
		              {{isEdit?'修改':'确定'}}
		          </button>
	          </div>
	      </div>
	  </div>
	</div>

</template>


<script>
	export default{
		name: 'productForm',
		props: {
        oldProductForm: Object,
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
            productForm: {
            	id: '',
            	productNum: '',
            	productName: '',
            	processPrice: [{id: '',price: '', process: '', productId: ''}]
            },
            imageDialogVisible: false
        }
    },
    watch: {
        oldProductForm(val) {
        	this.productForm  = val;
        }
    },
    mounted() {
    	let self = this
    	$("#myModal").on('hidden.bs.modal',function(){
    		self.clear()
    		self.$emit('clear')
    	})
    },
    methods: {
    	detailPriceExpand() {
			for (let i in this.productForm.processPrice){
	    		this.productForm.processPrice[i].price = this.Filters.expendMoneyUnit(this.productForm.processPrice[i].price)
    	    }
    	},

    	submit() {
    		var self = this
    	    // 表单校验
	    	this.detailPriceExpand()
    	    if(self.isEdit){
	   	    	this.$http({
	    	      	method: 'put',
	    	      	url: this.apiUrls.getUserIdPrefix()+this.apiUrls.updateProduct+this.productForm.id,
	    	      	data: JSON.stringify(this.productForm),
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
    	    	console.log(this.productForm)

    	    	this.$http({
	    	      method: 'post',
	    	      url: this.apiUrls.getUserIdPrefix()+this.apiUrls.insertProduct,
	    	      data: JSON.stringify(this.productForm),
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
    	addProcessPrice() {
    		this.productForm.processPrice.push({id: '',price: '', process: '', productId: ''})
    	},
    	removeProcessPrice(index) {
    		this.productForm.processPrice.splice(index,1)
    	},
    	clear() {
    	    // 重置表单
    	    this.productForm= {
	            	id: '',
	            	productNum: '',
	            	productName: '',
	            	processPrice: [{id: '',price: '', process: '', productId: ''}]
            	}
    		},
    	}
	}
</script>
<style>
	
</style>