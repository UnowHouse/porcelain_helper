<template>  
  <div class="modal fade" id="myModal" tabindex="-10000" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content" style="padding-bottom: 0px;">
        <div class="modal-header" style=" border: none;">
                <div class="modal-title">添加工作记录</div>
            </div>
            <div class="modal-body">
                <form id="form-data" action="#" class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label col-xs-3 col-sm-3 col-md-3">品名</label>
                    <div class="col-xs-6 col-sm-6 col-md-6">
                      <input @blur="loadProcesses" v-model="recordForm.productInfo.productName" class="product_name form-control" type="text"  list="product-list" placeholder="输入或选择陶瓷品名">
                      <datalist id="product-list">
                        <option v-for="(item,index) in productList " :key="index" >
                          {{item.productName}}
                        </option>
                      </datalist>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-xs-3 col-sm-3 col-md-3">成型工艺</label>
                    <div class="col-xs-9 col-sm-9 col-md-9">
                      <div v-for="(item,index) in buildedTypeList " :key="index" class="radio-inline">
                        <label>
                          <input :value="item.value" v-model="recordForm.buildedType" type="radio">{{item.value}}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div v-if="!isEdit" class="form-group">
                    <label class="control-label col-xs-3 col-sm-3 col-md-3">操作</label>
                    <div class="col-xs-9 col-sm-9 col-md-9">
                      <a @click="addWorker" class="add_worker btn btn-info" href="javascript:void(0)">
                        <i class="fa fa-lg fa-plus"></i>添加工作者</a> 
                     
                    </div>
                  </div>
                  <div id="worker_list">

                    <div v-for="(item,index) in recordForm.staffInfo" :key="index"  class="worker_info">
                      <div class="form-group">
                        <label class=" control-label col-xs-3 col-sm-3 col-md-3">
                        工作者{{index+1}}</label>
                        <div class="col-sm-3 col-md-3">
                          <input v-model="item.staffName"  @blur="selectStaff(index)"
                              class="worker_name form-control col-xs-8 col-sm-8 col-md-8" type="text" list="staff-list" placeholder="输入工作者名称">                                            
                        </div>
                        <div class="col-sm-3 col-md-3">
                          <input v-model="item.mealTime"
                              class="worker_name form-control col-xs-8 col-sm-8 col-md-8" type="number" placeholder="用餐次数">                                            
                        </div>
                        <a v-if="index > 0" @click="removeWorker(index)" class="remove_worker btn btn-warning" href="javascript:void(0)"><i class="fa fa-lg fa-minus"></i></a>
                      </div>
                      
                      
                      <div class="form-group">
                        <label class="control-label col-xs-3 col-sm-3 col-md-3">
                          工作者{{index+1}}的工作</label>
                        <div class="col-sm-3 col-md-3">
                          <input @blur="selectProcess(index)" v-model="item.process" class="uphand process form-control" type="text" list="process-list" placeholder="工序">
                          
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3">
                          <input v-model="item.number" class="done_num form-control" type="number"  placeholder="数量" >

                        </div>
                      </div>
                    </div>
                  </div>
                  <datalist id="staff-list">
                    <option v-for="(item,index) in staffList " :key="index">
                      {{item.staffName}}
                    </option>
                  </datalist>
                  <datalist id="process-list">
                    <option v-for="(item,index) in processList " :key="index">
                      {{item.process}}
                    </option>
                  </datalist>
                </form>

            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-default icon-btn" ><i class="fa fa-fw fa-lg fa-times-circle"></i>取消</a>
                </button>
                <button @click="submit" data-dismiss="modal" class="btn btn-primary"type="button"><i class="fa fa-fw fa-lg fa-check-circle"></i>
                  {{isEdit? '修改' : '确定'}}
                </button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "recordForm",
    props: {
        oldRecordForm: Object,
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
        recordForm:{
          buildedType: '高压',
          productInfo: {},
          staffInfo: [
            {id: '', number: '', process: '', mealTime: '', staffName: '', processId: ''},
          ],
        },
        productList: [],
        staffList: [],
        processList: [],
        buildedTypeList: [{value: '高压'}, {value: '滚压'}, {value: '注浆'}],
        
      }
    },
    watch: {
      oldRecordForm(val) {
        this.recordForm  = val;
        this.loadProcesses()
      },
      buildedType(val) {
        console.log(val)
      }

    },
    mounted(){

      this.$api.productNameList().then((res)=>{
        this.productList = res
      })
      this.$api.staffNameList().then((res)=>{
        this.staffList = res
      })
      let self = this
      $("#myModal").on('hidden.bs.modal',function(){
        self.clear()
      })
    },
    methods:{
      submit(){
        console.log(this.isEdit)
        if (this.isEdit){
          var self = this
          this.$http({
              method: 'put',
              url: this.apiUrls.getUserIdPrefix()+this.apiUrls.updateRecord+this.recordForm.id,
              data: JSON.stringify(this.recordForm),
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
              url: this.apiUrls.getUserIdPrefix()+this.apiUrls.insertRecords,
              data: JSON.stringify(this.recordForm),
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


      selectProcess(i){
        let processName = this.recordForm.staffInfo[i].process
        for( let index in this.processList){
          if(this.processList[index].process === processName){
            this.recordForm.staffInfo[i].processId = this.processList[index].id
            return
          }
        }
        swal("警告!", "请选择或写入已存在的工序", "error")
        this.recordForm.processList[i].process=''
      },
      selectStaff(i) {
        let staffName = this.recordForm.staffInfo[i].staffName
        for( let index in this.staffList){
          if(this.staffList[index].staffName === staffName){
            this.recordForm.staffInfo[i].id = this.staffList[index].id
            return
          }
        }
        swal("警告!", "请选择或写入已存在的员工", "error")
        this.recordForm.staffInfo[i].staffName=''
      },
      loadProcesses() {
        let productName = this.recordForm.productInfo.productName
        for( let index in this.productList){
          if(this.productList[index].productName === productName){
            this.recordForm.productInfo.id = this.productList[index].id
            this.$api.productProcessesList({productId : this.productList[index].id}).then((res)=>{
              this.processList = res
            })
            return
          }
        }
        swal("警告!", "请选择或写入已存在的货品名称", "error")
        this.recordForm.productInfo.productName=''
      },
      addWorker() {
        let tmp = {id: '', number: '', process: '', staffName: '', processId: ''}
        this.recordForm.staffInfo.push(tmp)
      },
      removeWorker(index) {
        this.recordForm.staffInfo.splice(index,1)
      },
      clear() {
        this.recordForm = {
          buildedType: '高压',
          productInfo: {},
          staffInfo: [
            {id: '', number: '', process: '', staffName: '', processId: ''},
          ],
        }
      }
    }

  }

</script>