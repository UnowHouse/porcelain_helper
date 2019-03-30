<template>
<div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
          &times;
        </button>
        <h4 class="modal-title" id="myModalLabel">
          {{title}}的工作记录单
        </h4>
      </div>
      <div class="modal-body" style="text-align:center;">
        <table id="salaryTable" class="table table-hover table-bordered table-responsive">
          <thead> 
            <tr>
              <th>品名</th>
              <th>工序</th>
              <th>用餐次数</th>
              <th>价格</th>
              <th>数量</th>
              <th>记录时间</th>
              <th>合计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in detailData.salaryRecords" :key="index">
              <td>{{item.productName}}</td>
              <td>{{item.process}}</td>
              <td>{{item.mealTime}}</td>
              <td>¥{{item.price|shrinkMoneyUnit}}</td>
              <td>{{item.number}}</td>
              <td>{{item.created|timeFormat}}</td>
              <td>¥{{(item.number * item.price)|shrinkMoneyUnit}}</td>
            </tr>
            <tr>
              <td colspan=7></td>
            </tr>
            <tr>
              <td colspan=2>总用餐次数：</td>
              <td>{{detailData.totalMealTime}}</td>
              <td>伙食费：</td>
              <td>¥ {{detailData.mealTotalCost|shrinkMoneyUnit}}</td>
              <td>总合计：</td>
              <td>¥ {{detailData.workTotal|shrinkMoneyUnit}}</td>
            </tr>
            <tr></tr>
            <tr>
               <td colspan=2>总工资：</td>
               <td colspan=5>¥ {{detailData.salary|shrinkMoneyUnit}}({{detailData.workTotal|shrinkMoneyUnit}} - {{detailData.mealTotalCost|shrinkMoneyUnit}})</td> 
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
		name: 'salary-detail',
		props: {
      title: String,
			detailData: Object,  
		},
		methods: {

		}
	}
</script>
<style scope>

</style>