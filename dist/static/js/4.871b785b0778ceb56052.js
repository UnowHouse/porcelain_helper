webpackJsonp([4],{Fue7:function(t,a){},Vo3Q:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={name:"salary-detail",props:{title:String,detailData:Object},methods:{}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal fade",attrs:{id:"detailModal",tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog"},[e("div",{staticClass:"modal-content"},[e("div",{staticClass:"modal-header"},[e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-hidden":"true"}},[t._v("\n          ×\n        ")]),t._v(" "),e("h4",{staticClass:"modal-title",attrs:{id:"myModalLabel"}},[t._v("\n          "+t._s(t.title)+"的工作记录单\n        ")])]),t._v(" "),e("div",{staticClass:"modal-body",staticStyle:{"text-align":"center"}},[e("table",{staticClass:"table table-hover table-bordered table-responsive",attrs:{id:"salaryTable"}},[t._m(0),t._v(" "),e("tbody",[t._l(t.detailData.salaryRecords,function(a,s){return e("tr",{key:s},[e("td",[t._v(t._s(a.productName))]),t._v(" "),e("td",[t._v(t._s(a.process))]),t._v(" "),e("td",[t._v(t._s(a.mealTime))]),t._v(" "),e("td",[t._v("¥"+t._s(t._f("shrinkMoneyUnit")(a.price)))]),t._v(" "),e("td",[t._v(t._s(a.number))]),t._v(" "),e("td",[t._v(t._s(t._f("timeFormat")(a.created)))]),t._v(" "),e("td",[t._v("¥"+t._s(t._f("shrinkMoneyUnit")(a.number*a.price)))])])}),t._v(" "),t._m(1),t._v(" "),e("tr",[e("td",{attrs:{colspan:"2"}},[t._v("总用餐次数：")]),t._v(" "),e("td",[t._v(t._s(t.detailData.totalMealTime))]),t._v(" "),e("td",[t._v("伙食费：")]),t._v(" "),e("td",[t._v("¥ "+t._s(t._f("shrinkMoneyUnit")(t.detailData.mealTotalCost)))]),t._v(" "),e("td",[t._v("总合计：")]),t._v(" "),e("td",[t._v("¥ "+t._s(t._f("shrinkMoneyUnit")(t.detailData.workTotal)))])]),t._v(" "),e("tr"),t._v(" "),e("tr",[e("td",{attrs:{colspan:"2"}},[t._v("总工资：")]),t._v(" "),e("td",{attrs:{colspan:"5"}},[t._v("¥ "+t._s(t._f("shrinkMoneyUnit")(t.detailData.salary))+"("+t._s(t._f("shrinkMoneyUnit")(t.detailData.workTotal))+" - "+t._s(t._f("shrinkMoneyUnit")(t.detailData.mealTotalCost))+")")])])],2)])])])])])},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",[t._v("品名")]),t._v(" "),e("th",[t._v("工序")]),t._v(" "),e("th",[t._v("用餐次数")]),t._v(" "),e("th",[t._v("价格")]),t._v(" "),e("th",[t._v("数量")]),t._v(" "),e("th",[t._v("记录时间")]),t._v(" "),e("th",[t._v("合计")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("tr",[a("td",{attrs:{colspan:"7"}})])}]};var r={name:"salary",components:{"salary-detail":e("VU/8")(s,i,!1,function(t){e("Fue7")},null,null).exports},props:{barLoad:Boolean},data:function(){return{mealCost:"",currentShow:{},startDate:"",endDate:"",isLoading:!1,multipleSort:!1,pageIndex:1,pageSize:10,total:0,tableConfig:{tableData:[]}}},watch:{currentShow:function(t){this.$nextTick(function(){t.export&&this.utils.exportTable("#salaryTable",this.currentShow.staffName+this.Filters.timeFormat(this.startDate,"Y/MM/D")+"-"+this.Filters.timeFormat(this.endDate,"Y/MM/D"))})},barLoad:function(){var t=this,a=this.tableConfig.tableData;this.isLoading=!0,this.tableConfig.tableData=[],setTimeout(function(){t.tableConfig.tableData=a,t.isLoading=!1},400)}},mounted:function(){var t=JSON.parse(localStorage.getItem("userInfo"));this.mealCost=t.mealCost,laydate.render({elem:"#startDate"}),laydate.render({elem:"#endDate"})},methods:{search:function(){this.startDate=this.utils.convertDateFromString($("#startDate").val()),this.endDate=this.utils.convertDateFromString($("#endDate").val()),this.getTableData()},caculateSalary:function(t){var a=this;return $.each(t,function(e,s){var i=0,r=0,l=0;$.each(s.salaryRecords,function(t,e){l+=e.mealTime,r+=a.mealCost*e.mealTime,i+=e.number*e.price}),t[e].totalMealTime=l,t[e].workTotal=i,t[e].mealTotalCost=r,t[e].salary=i-r}),t},exportData:function(t){this.currentShow=this.tableConfig.tableData[t],this.currentShow.export=!0},showDetail:function(t){this.currentShow.export=!1,this.currentShow=this.tableConfig.tableData[t],$("#detailModal").modal("show")},getTableData:function(){var t=this;if(this.startDate&&this.startDate){this.isLoading=!0,swal({title:"正在查询并计算工资中...",showConfirmButton:!1,showCancelButton:!1});var a={page:this.pageIndex,rows:this.pageSize,startDate:this.startDate,endDate:this.endDate};$.ajax({url:this.apiUrls.baseUrl+this.apiUrls.getUserIdPrefix()+this.apiUrls.salaryRecord,type:"GET",data:a,xhrFields:{withCredentials:!0},success:function(a){var e=t.caculateSalary(a.datas);t.tableConfig.tableData=e,t.total=a.total,t.isLoading=!1,swal({title:"正在查询并计算工资中...",showConfirmButton:!1,showCancelButton:!1,timer:10})},error:function(){t.isLoading=!1,swal({title:"正在查询并计算工资中...",showConfirmButton:!1,showCancelButton:!1,timer:10}),$.notify({title:"数据加载失败",message:"请检查网络情况或刷新重试",icon:"fa fa-close"},{type:"danger"})}})}else $.notify({title:"提示",message:"请选择日期",icon:"fa fa-close"},{type:"danger"})},pageChange:function(t){this.pageIndex=t,this.getTableData()},pageSizeChange:function(t){this.pageIndex=1,this.pageSize=t,this.getTableData()},customCompFunc:function(t){}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[t._m(0),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"row"},[e("form",{staticClass:"form-inline pull-right"},[t._m(1),t._v(" "),t._m(2),t._v(" "),e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-primary icon-btn",attrs:{type:"button"},on:{click:t.search}},[e("i",{staticClass:"fa fa-fw fa-lg fa-check-circle"}),t._v("查询生成")])])])]),t._v(" "),e("br",{attrs:{id:"tmpBr"}}),t._v(" "),e("div",{staticClass:"row"},[e("table",{staticClass:"table table-hover table-bordered table-responsive",attrs:{id:"workTable"}},[t._m(3),t._v(" "),e("tbody",t._l(t.tableConfig.tableData,function(a,s){return e("tr",[e("td",[t._v(t._s(a.staffNum))]),t._v(" "),e("td",[t._v(t._s(a.staffName))]),t._v(" "),e("td",[t._v(t._s(a.department))]),t._v(" "),e("td",[e("a",{attrs:{href:"javascript:void(0)"},on:{click:function(a){return t.showDetail(s)}}},[t._v("查看工资详情")])]),t._v(" "),e("td",[e("a",{attrs:{href:"javascript:void(0)"},on:{click:function(a){return t.exportData(s)}}},[t._v("导出文件")])]),t._v(" "),e("td",[t._v("¥ "+t._s(t._f("shrinkMoneyUnit")(a.salary)))])])}),0)])]),t._v(" "),e("div",{staticClass:"row v-pagin"},[e("v-pagination",{attrs:{total:t.total,"page-size":t.pageSize,layout:["total","prev","pager","next","sizer","jumper"]},on:{"page-change":t.pageChange,"page-size-change":t.pageSizeChange}})],1)])])])]),t._v(" "),e("salary-detail",{attrs:{detailData:t.currentShow,title:t.currentShow.staffName}})],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"page-title"},[a("div",[a("h1",[a("i",{staticClass:"fa fa-laptop"}),this._v("工资结算")]),this._v(" "),a("p",[this._v("选择对应员工和对应时间断生成工作记录表")])]),this._v(" "),a("div",[a("ul",{staticClass:"breadcrumb"},[a("li",[a("i",{staticClass:"fa fa-calculator fa-lg"})]),this._v(" "),a("li",[a("a",{attrs:{href:"#/salary"}},[this._v("工资清算")])])])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label"},[this._v("起始时间")]),this._v(" "),a("input",{staticClass:"form-control",attrs:{id:"startDate",type:"text",placeholder:"起始时间"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label"},[this._v("截止时间")]),this._v(" "),a("input",{staticClass:"form-control",attrs:{id:"endDate",type:"text",placeholder:"截止时间"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",[t._v("员工编号")]),t._v(" "),e("th",[t._v("员工姓名")]),t._v(" "),e("th",[t._v("部门")]),t._v(" "),e("th",[t._v("工作详情")]),t._v(" "),e("th",[t._v("记录文件")]),t._v(" "),e("th",[t._v("工资")])])])}]},n=e("VU/8")(r,l,!1,null,null,null);a.default=n.exports}});
//# sourceMappingURL=4.871b785b0778ceb56052.js.map