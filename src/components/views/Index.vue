<template>
  <div>
    <div class="page-title">
      <div>
        <h1><i class="fa fa-home-o"></i>虚拟首页</h1>
        <p>模拟首页样式，数据显示纯属虚构</p>
      </div>
      <div>
        <ul class="breadcrumb">
          <li><i class="fa fa-home fa-lg"></i></li>
          <li><a href="#/index">首页</a></li>
        </ul>
      </div>
    </div>
    <div id="chart" class="row">
      <div class="col-md-6">
        <div class="card">
          <h3 class="card-title">财务支出</h3>
          <div class="embed-responsive embed-responsive-16by9">

            <div id="chart1" :style="{width:'90%',height:'300px'}">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <h3 class="card-title">进货情况</h3>
          <div class="embed-responsive embed-responsive-16by9">
            <div id="chart2" :style="{width:'90%',height:'300px'}">
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
          <div class="col-md-6">
            <div class="card">
              <h3 class="card-title">Radar Chart</h3>
              <div class="embed-responsive embed-responsive-16by9">
                <canvas class="embed-responsive-item" id="radarChartDemo"></canvas>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <h3 class="card-title">Polar Chart</h3>
              <div class="embed-responsive embed-responsive-16by9">
                <canvas class="embed-responsive-item" id="polarChartDemo"></canvas>
              </div>
            </div>
          </div>
      
      
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts' 
  export default {
    name: 'index',
    data () {
      return {
        
      }
    },
    computed: {},
    mounted () {
      /*ECharts图表*/
      var myChart = echarts.init(document.getElementById('chart1'));
      myChart.setOption({
        tooltip : {
              trigger: 'axis',
                
            },
        xAxis: {
           type: 'category',
           name:'时间(月份)',
           data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
         },
         yAxis: {
             type: 'value',
             name: '金额(¥万元)'
         },
         series: [{
             data: [33.3, 40.1, 28.8, 59.231, 23.12, 36.66, 45.9],
             type: 'line'
        }]
       })

      var myChart = echarts.init(document.getElementById('chart2'));
      myChart.setOption({
        color: ['#3398DB'],
        tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            
        xAxis : [
               {
                   type: 'category',
                   name:'时间(月份)',
                   data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
                   axisTick: {
                       alignWithLabel: true
                   }
               }
           ],
         yAxis : [
             {
                 type : 'value',
                 name:'进货数量'
             }
         ],
         series : [
             {
                 name:'进货数量',
                 type:'bar',
                 barWidth: '60%',
                 data:[200, 152, 200, 334, 390, 330, 220]
             }
         ]
      });

    },

    methods: {
      /**
       * 刷新页面请求
       * */
      refresh () {

      }
    },
    created () {

    }
  }
</script>
<style lang="less" scoped>
  .cardMessage {
    .ivu-icon {
      font-size: 38px;
    }
    .subText {
      color: #9ea7b4;
    }
  }
</style>
