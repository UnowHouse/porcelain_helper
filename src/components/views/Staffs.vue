<template>
	<div>
		<div class="page-title">
		  <div>
		    <h1><i class="fa fa-laptop"></i>员工信息</h1>
		    <p>录入或修改我的员工信息</p>
		  </div>
		  <div>
		    <ul class="breadcrumb">
              <li><i class="fa fa-users fa-lg"></i></li>
              <li>管理</li>
              <li><a href="#/staffs">员工信息</a></li>
            </ul>
		  </div>
		</div>


		<div class="row">

		  <div class="col-md-12">
		    <div class="card">		    	
          <div id="card-body"  class="card-body">
              <div class="row">
                <ul class="col-sm-6 bread-li">
                  <li @click="addStaff" data-toggle="modal" data-target="#myModal" >
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
    <div class="modal fade" id="myModal" tabindex="-10000" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content" style="padding-bottom: 0px;">
              <div class="modal-header" style=" border: none;">
                <div class="modal-title" slot='title'>添加员工信息</div>
              </div>
              <staff-form :oldStaffForm="staffForm" :isEdit="isEdit" @reload="getTableData">
                
              </staff-form>
              
            </div>
          </div>
        </div>
	</div>
</template>
<script>
    import itemAction from './customeItem/ItemAction'
    import Vue from 'vue'
    import StaffForm from './formAction/StaffForm'

    Vue.component('item-action',itemAction)

    export default{
        components: {
          StaffForm,
        },
        data() {
             return {  
                show: false,// 是否弹出窗口
                staffForm: {},
                isEdit: false, // 判断是编辑还是新增
                formData: {
                  staffNum: '',
                  staffName: '',
                  department: '',
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
                         field: "staffNum",
                         title: "员工编号",
                         titleAlign: 'center',
                         width: 50,
                         columnAlign: "center",
                         isResize:true
                     },
                     {
                         field: "staffName",
                         title: "员工姓名",
                         titleAlign: 'center',
                         width: 80,
                         columnAlign: "center",
                         isResize:true
                     },
                     {
                         field: "department",
                         title: "部门",
                         titleAlign: 'center',
                         width: 80,
                         columnAlign: "center",
                         isResize:true
                     },        
                     {
                       field: 'custome-adv', 
                       title: '操作',
                       titleAlign: 'center',
                       width: 80, 
                       titleAlign: 'center',
                       columnAlign:'center',
                       componentName:'item-action',
                       isResize:true
                     }

                 ]
                }
             };
         },
         created() {
             this.getTableData();
         },
         mounted() {
           // this.styleWidth = document.getElementById('card-body').clientWidth

           // setInterval(()=>{
           //  let tmp = document.getElementById('card-body').clientWidth
           //   if(this.styleWidth < tmp-50 || this.styleWidth-50 > tmp){
           //     this.styleWidth = document.getElementById('card-body').clientWidth
           //     this.getTableData()
           //   }
           // },1000)
         },
         watch: {

            key(val){
                if(!val)
                    this.getTableData()
            }

         },
         methods: {
            
             getTableData() {
                this.isLoading = true
                let params = {
                        page: this.pageIndex,
                        rows: this.pageSize, 
                        sortBy: this.sortBy,
                        sortType: this.sortType,     
                        key: this.key,                 
                    }
                this.$api.staffList(params).then((res)=>{

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
                 let formParams = {id: params.rowData['id'],
                               staffNum: params.rowData['staffNum'],
                               staffName: params.rowData['staffName'],
                               department: params.rowData['department']}
                  this.isEdit = true
                  this.staffForm = formParams

                  $("#myModal").modal('show');

                  
               }

             },

            addStaff() {
              this.isEdit = false
            },
            deleteStaff(staffId) {
              this.$api.deleteStaff(staffId).then((res)=>{
                this.getTableData()
                swal("删除成功!", "该条记录已被永久性移除", "success")
            })
          }

       }
        
    }

</script>
<style>
	
</style>

