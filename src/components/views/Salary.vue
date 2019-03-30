<template>
	<div>
		<div class="page-title">
		  <div>
		    <h1><i class="fa fa-laptop"></i>工资结算</h1>
		    <p>选择对应员工和对应时间断生成工作记录表</p>
		  </div>
		  <div>
		    <ul class="breadcrumb">
		      <li><i class="fa fa-calculator fa-lg"></i></li>
		      <li><a href="#/salary">工资清算</a></li>
		    </ul>
		  </div>
		</div>


		<div class="row">

		  <div class="col-md-12">
		    <div class="card">
		      <div class="card-body">
		        <div class="row">
		          <form class="form-inline pull-right">
		            <div class="form-group">
		              <label class="control-label">起始时间</label>
		              <input id="startDate" class="form-control" type="text" placeholder="起始时间">
		            </div>
		            <div class="form-group">
		              <label class="control-label">截止时间</label>
		              <input id="endDate" class="form-control" type="text" placeholder="截止时间">
		            </div>
		            <div class="form-group">
		              <button @click="search" class="btn btn-primary icon-btn" type="button"><i class="fa fa-fw fa-lg fa-check-circle"></i>查询生成</button>
		            </div>
		          </form>
		        </div>  
		        <br id="tmpBr">
		        <!-- 表格-->
		        <div class="row">
		          <table class="table table-hover table-bordered table-responsive" id="workTable">
		            <thead> 
		              <tr>
		                <th>员工编号</th>
		                <th>员工姓名</th>
		                <th>部门</th>
		                <th>工作详情</th>
		                <th>记录文件</th>
		                <th>工资</th>
		              </tr>
		            </thead>
		            <tbody>
		            	<tr v-for="(item,index) in tableConfig.tableData">
		            		<td>{{item.staffNum}}</td>
		            		<td>{{item.staffName}}</td>
		            		<td>{{item.department}}</td>
		            		<td><a @click="showDetail(index)" href="javascript:void(0)">查看工资详情</a></td>
		            		<td><a @click="exportData(index)" href="javascript:void(0)">导出文件</a></td>
		            		<td>¥ {{item.salary|shrinkMoneyUnit}}</td>

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
		<salary-detail :detailData="currentShow" :title="currentShow.staffName"></salary-detail>
	</div>
</template>
<script>
	import SalaryDetail from './customeItem/SalaryDetail'
	export default {
		name:'salary',
		components: {
			'salary-detail': SalaryDetail,
		},
		props:{
			barLoad: Boolean,
		},
		data() {
			return {
				mealCost: '',
				currentShow: {},
				startDate:'',
				endDate:'',
				isLoading:false,
				multipleSort:false,
				pageIndex: 1,
				pageSize: 10,
				total: 0,
				tableConfig: {
				  tableData: [],
				  
				}
			}
		},

		watch: {
			currentShow(val) {
				this.$nextTick(function(){
					if(val.export)
					{
						this.utils.exportTable('#salaryTable',this.currentShow.staffName+this.Filters.timeFormat(this.startDate,'Y/MM/D')+'-'+this.Filters.timeFormat(this.endDate,'Y/MM/D'))
					}
				})
			},
			barLoad() {
				let tmp = this.tableConfig.tableData;
				this.isLoading = true
				this.tableConfig.tableData=[]
				setTimeout(()=>{
					this.tableConfig.tableData = tmp
					this.isLoading = false
				},400)
			},
		},
		mounted() {
			let userInfo = JSON.parse(localStorage.getItem("userInfo"))
			this.mealCost = userInfo.mealCost
			laydate.render({
			  elem: '#startDate' ,
		    
			});
			laydate.render({
			  elem: '#endDate' //指定元素
			});
		},
		methods: {
			search() {
				this.startDate = this.utils.convertDateFromString($("#startDate").val())
				this.endDate = this.utils.convertDateFromString($("#endDate").val())
				this.getTableData()
			},

			caculateSalary(arr) {
				let self = this
				$.each(arr,function(index,val){
					let workTotal = 0
					let mealTotalCost = 0
					let totalMealTime = 0
					$.each(val.salaryRecords, function(i,v){
						totalMealTime += v.mealTime
						mealTotalCost += (self.mealCost*v.mealTime)
						workTotal += (v.number*v.price)
					})
					arr[index].totalMealTime = totalMealTime
					arr[index].workTotal = workTotal
					arr[index].mealTotalCost = mealTotalCost
					arr[index].salary = (workTotal - mealTotalCost)
				})
				return arr

			},

			exportData(index){
				this.currentShow = this.tableConfig.tableData[index]
				this.currentShow.export = true
			},

			showDetail(index) {
				this.currentShow.export = false
				this.currentShow = this.tableConfig.tableData[index]
				$("#detailModal").modal('show')
			},

			getTableData() {
				let self = this
				if(!this.startDate || !this.startDate){
					$.notify({
       	    	   	       title: "提示",
       	    	   	       message: "请选择日期",
       	    	   	       icon: 'fa fa-close' 
       	    	   	   },{
       	    	   	       type: "danger"
       	    	   	});
       	    	   	return;
				}
                this.isLoading = true
                swal({
                    title: "正在查询并计算工资中...",
                    showConfirmButton: false,
                    showCancelButton: false,
                });
                let params = {
                        page: this.pageIndex,
                        rows: this.pageSize,    
                        startDate: this.startDate,
                        endDate: this.endDate,            
                    }
                $.ajax({
                    url: this.apiUrls.baseUrl + this.apiUrls.getUserIdPrefix() + this.apiUrls.salaryRecord,
					type:"GET",
					data: params,
					xhrFields: {
					 
						withCredentials: true // 这里设置了withCredentials
					 
					},
					success: function(res){
						let newRes = self.caculateSalary(res.datas)
						self.tableConfig.tableData = newRes
						self.total = res.total
						self.isLoading = false
						 swal({
		                    title: "正在查询并计算工资中...",
		                    showConfirmButton: false,
		                    showCancelButton: false,
		                    timer:10
		                });
					},
					error: function(){
						self.isLoading = false
						swal({
		                    title: "正在查询并计算工资中...",
		                    showConfirmButton: false,
		                    showCancelButton: false,
		                    timer:10
		                });
						$.notify({
						       title: "数据加载失败",
						       message: "请检查网络情况或刷新重试",
						       icon: 'fa fa-close' 
						   },{
						       type: "danger"
						});
					}
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

			  

			     
			}
		}

	}

</script>