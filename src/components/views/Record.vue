<template>
	<div>
		<div class="page-title">
		  <div>
		    <h1><i class="fa fa-laptop"></i>员工的工作记录</h1>
		    <p>录入或修改我的员工的工作记录</p>
		  </div>
		  <div>
		    <ul class="breadcrumb">
              <li><i class="fa fa-database fa-lg"></i></li>
              <li>管理</li>
              <li><a href="#/staffs">工作记录信息</a></li>
            </ul>
		  </div>
		</div>


		<div class="row">

		  <div class="col-md-12">
		    <div class="card">
		      <div id="card-body"  class="card-body">
		        <div class="row">
		          <ul class="col-sm-6 bread-li">
		            <li @click="addRecord" data-toggle="modal" data-target="#myModal" >
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
		          <v-table 
		              class="table-responsive"         
		              :is-loading="isLoading"
		              is-horizontal-resize
		              column-width-drag
		              :multiple-sort="multipleSort"
		              @sort-change="sortChange"
		              style="width:100%"
		              :columns="tableConfig.columns" 
		              :table-data="tableConfig.tableData" 
		              :paging-index="(pageIndex-1)*pageSize"
		              row-hover-color="#eee"
		              row-click-color="#edf7ff"
		              @on-custom-comp="customCompFunc">
		          </v-table>
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

		<record-form :oldRecordForm="recordForm" :isEdit="isEdit" @reload="getTableData"></record-form>
	</div>
</template>
<script>
	import itemAction from './customeItem/ItemAction'
	import Vue from 'vue'
	import RecordForm from "./formAction/RecordForm"

    Vue.component('item-action',itemAction)


	export default {
		components: {
			'record-form': RecordForm,
		},
		name: "record",
		props:{
			barLoad: Boolean,
		},
		data() {
			return {
				isEdit: false, // 判断是编辑还是新增
				recordForm:{
		          buildedType: '',
		          productInfo: {},
		          staffInfo: [],
		        },            
				styleWidth: '',

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
				  columns: [
				     {
				         field: "staffName",
				         title: "员工姓名",
				         titleAlign: 'center',
				         width: 80,
				         columnAlign: "center",
				         isResize:true
				     },
				     {
				         field: "productNum",
				         title: "货品编号",
				         titleAlign: 'center',
				         width: 80,
				         columnAlign: "center",
				         isResize:true
				     },
				     {
				         field: "productName",
				         title: "货物品名",
				         titleAlign: 'center',
				         width: 80,
				         columnAlign: "center",
				         isResize:true
				     },  
				     {
				         field: "buildedType",
				         title: "成型工艺",
				         titleAlign: 'center',
				         width: 80,
				         columnAlign: "center",
				         isResize:true
						 }, 
						 {
				         field: "mealTime",
				         title: "用餐次数",
				         titleAlign: 'center',
				         width: 40,
				         columnAlign: "center",
				         isResize:true
				     },   
				     {
				         field: "process",
				         title: "工序",
				         titleAlign: 'center',
				         width: 80,
				         columnAlign: "center",
				         isResize:true
				     },  
				     {
				         field: "number",
				         title: "数量",
				         titleAlign: 'center',
				         orderBy:'desc',
				         width: 80,
				         columnAlign: "center",
				         isResize:true
				     },        
				     {
				         field: "created",
				         title: "日期",
				         titleAlign: 'center',
				         orderBy:'desc',
				         width: 160,
				         columnAlign: "center",
				         isResize:true
				     },      
				     {
				       field: 'custome-adv', 
				       title: '操作',
				       titleAlign: 'center',
				       width: 160, 
				       titleAlign: 'center',
				       columnAlign:'center',
				       componentName:'item-action',
				       isResize:true
				     }

				 ]
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
			transferDate(datas) {
				for ( let index in datas){
					
					datas[index].created = this.Filters.timeFormat(datas[index].created)
					

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
                this.$api.recordList(params).then((res)=>{
                	res.datas=this.transferDate(res.datas)
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
	               	this.recordForm={
	               		id: params.rowData.id,
	               		productInfo: {
		               		productName: params.rowData.productName,
						 	productNum: params.rowData.productNum
						 },
	               		buildedType: params.rowData.buildedType,
	               		staffInfo: [{staffName: params.rowData.staffName,
       								 process: params.rowData.process,
       								 number: params.rowData.number
       					 }]
       				}
       				
	               	// this.apiUrls.updateRecord+this.params.rowData.id
	
			     	$("#myModal").modal('show');

			     
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
			addRecord() {
				this.isEdit = false
			},

			deleteStaff(recordId) {
				  this.$api.deleteRecord(recordId).then((res)=>{
				    this.getTableData()
				    swal("删除成功!", "该条记录已被永久性移除", "success")
				})
			}    	
		}
	}

</script>