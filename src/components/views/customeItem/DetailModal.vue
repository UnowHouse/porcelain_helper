<template>
<div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
          &times;
        </button>
        <h4 class="modal-title" id="myModalLabel">
          {{title}}
        </h4>
      </div>
      <div class="modal-body" style="text-align:center;">
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
            <tr v-for="(item,index) in this.tableConfig.tableData">
              <td>{{item.staffNum}}</td>
              <td>{{item.staffName}}</td>
              <td>{{item.department}}</td>
              <td><a @click="" href="javascript:void(0)">查看工资详情</a></td>
              <td><a @click="" href="javascript:void(0)">导出文件</a></td>
              <td>¥ {{item.salary|shrinkMoneyUnit}}</td>

            </tr>
          </tbody>
        </table>
        
      </div>
      
    </div>
  </div>
 </div>

</template>
<script>
	export default{
		name: 'detail-modal',
		props: {
      title: String,
			detailData: Object,
      
		},
		methods: {

		}
	}
</script>
<style scope>
	.modal-body{
		text-align:center;
	}
</style>