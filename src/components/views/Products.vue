<template>
	<div>
		<div class="page-title">
		  <div>
		    <h1><i class="fa fa-laptop"></i>货物信息</h1>
		    <p>录入或修改我的货物信息</p>
		  </div>
		  <div>
		  	
		    <ul class="breadcrumb">
              <li><i class="fa fa-cubes fa-lg"></i></li>
              <li>管理</li>

              <li><a href="#/staffs">货物信息</a></li>
            </ul>
		  </div>

		</div>


		<div class="row">

		  <div class="col-md-12">
		    <div class="card">
		      <div class="card-body">
		        <div id="card-body"  class="card-body">
		          <div class="row">
		            <ul class="col-sm-6 bread-li">
		              <li @click="addProduct" data-toggle="modal" data-target="#myModal" >
		                <a class="btn btn-primary" href="javascript:void(0)"><i class="fa fa-lg fa-plus"></i>添加</a>
		              </li>
		           </ul> 
		            <ul class="col-sm-6 bread-li right-bread">               
		              <li>
		                  <input class="form-control" type="text" 
		                  v-model="key" 
		                  @change
		                  @keyup.enter="getTableData"
		                  placeholder="输入关键字搜索"></li>
		              <li>
		                  <button class="btn btn-primary" type="button"
		                  @click="getTableData">
		                      <i class="fa fa-fw fa-lg fa-search"></i> 搜索
		                  </button>
		              </li>        
		            </ul>
		          </div>
		          <!-- 表格-->
		          <div class="row">
		            <table class="table table-hover table-bordered table-responsive" id="workTable">
		            <thead> 
		              <tr>
		                <th>货物编号</th>
		                <th>货物品名</th>
		                <th>详情工序</th>
		                <th>添加日期</th>
		                <th>操作</th>
		              </tr>
		            </thead>
		            <tbody>
		            	<tr v-for="(item,index) in tableConfig.tableData">
		            		<td>{{item.productNum}}</td>
		            		<td>{{item.productName}}</td>
		            		<td>
		            			<div class="dropdown">
		            			    <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)" aria-expanded="true">
		            			        工序详情查看
		            			        <span class="caret"></span>
		            			    </a>
	            			    	<ul class="dropdown-menu">
	            			    		<li v-for="(v,i) in item.processPrice" :key="i">
	            			    			 <a href="javascript:void(0)">
				                                {{v.process}}<span class="pull-right">¥ {{v.price }}</span>
				                            </a>
	            			    		</li>
	            			    	</ul>
		            			    
		            			</div>
		            		</td>
		            		<td>{{item.created|timeFormat('Y/MM/D')}}</td>
		            		<td style="text-align:center;">
		            			<item-action @on-custom-comp="customCompFunc" :rowData="item" :index="index"></item-action>
		            		</td>

		            	</tr>
		            	
		            </tbody>
		          </table>
		          </div>
		          <!-- 分页-->
		          <div class="row v-pagin">
		            <v-pagination 
		                @page-change="pageChange" 
		                @page-size-change="pageSizeChange" 
		                :total="total" :page-size="pageSize" 
		                :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
		            </v-pagination>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>  
		<product-form @clear="clear" :oldProductForm="productForm" :isEdit="isEdit" @reload="getTableData"></product-form>
		<!-- <detail-modal :detailData="detailData"></detail-modal> -->
	</div>
</template>
<script>
	import itemAction from './customeItem/ItemAction'
	// import ProcessDetail from './customeItem/ProcessDetail'
	import DetailModal from './customeItem/DetailModal'

	import Vue from 'vue'
	import ProductForm from "./formAction/ProductForm"

    Vue.component('item-action', itemAction)
    // Vue.component('process-detail', ProcessDetail)

	export default {
		components: {
			'product-form': ProductForm,
			'detail-modal': DetailModal,
		},
		name: "product",
		props:{
			barLoad: Boolean,
		},
		data() {
			return {
				isEdit: false, // 判断是编辑还是新增
				productForm: {
					id: '',
					productNum: '',
					productName: '',
					processPrice: [{id: '',price: '', process: '', productId: ''}]
				},         
				detailData: '',

				pageIndex: 1,
				pageSize: 10,
				total: 0,
				sortBy: '',
				sortType: '',
				key: '',

				isLoading:false,
				multipleSort:false,
				tableConfig: {
				  tableData: [],
				}
			}
		},
		created() {
			this.getTableData()
		},
		watch: {
			barLoad() {
				let tmp = this.tableConfig.tableData;
				this.isLoading = true
				this.tableConfig.tableData=[]
				setTimeout(()=>{
					this.tableConfig.tableData = tmp
					this.isLoading = false
				},400)
			},
			key(val){
				if(!val)
			    	this.getTableData()
			}
		},

		methods:{
			detailPriceShrink(datas) {
				for ( let index in datas){
					for (let i in datas[index].processPrice){
						datas[index].processPrice[i].price = this.Filters.shrinkMoneyUnit(datas[index].processPrice[i].price)
					}

				}
				return datas
			},
			getTableData() {
                this.isLoading = true
                let params = {
                        page: this.pageIndex,
                        rows: this.pageSize, 
                        sortBy: this.sortBy,
                        sortType: this.sortType,     
                        key: this.key,                 
                    }
                this.$api.productList(params).then((res)=>{

                	res.datas = this.detailPriceShrink(res.datas)
                    this.tableConfig.tableData = res.datas
                    this.total = res.total
                    this.isLoading = false
                    
                }).catch((error)=>{
                    this.isLoading = false
                   
                })
             },
			pageChange(pageIndex) {
				this.pageIndex = pageIndex;
				this.getTableData();
			},
			pageSizeChange(pageSize) {
				this.pageIndex = 1;
				this.pageSize = pageSize;
				this.getTableData();
			},
			customCompFunc(params){
			  if (params.type === 'delete'){ // do delete operation

			  	this.deleteStaff(params.id)

			  }else if (params.type === 'edit'){ // do edit operation

			    this.isEdit = true
			    this.productForm = params.rowData
			    $("#myModal").modal('show') 

			  }

			},
			clear (){
				this.productForm = {
					id: '',
	            	productNum: '',
	            	productName: '',
	            	processPrice: [{id: '',price: '', process: '', productId: ''}]
            	}
			},
			// 获取 table 组件每次操作后的参数（重新去请求数据）
			sortChange(params){
			 let self = this
			 Object.keys(params).forEach(key => {
			     if (params[key]){
			         self.sortBy = key;
			         self.sortType = params[key];
			         this.getTableData()
			     }
			 })
			},
			addProduct() {
				this.isEdit = false
			},
			deleteStaff(productId) {
				  this.$api.deleteProduct(productId).then((res)=>{
				    this.getTableData()
				    swal("删除成功!", "该条记录已被永久性移除", "success")
				})
			},
			
		}    	
	}	

</script>