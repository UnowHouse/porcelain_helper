<template>
	<span>
        <a class="btn btn-info" href="" @click.stop.prevent="update(rowData,index)">
        <i class="fa fa-lg fa-edit"></i>编辑</a>&nbsp;
        <a class="btn btn-danger"  href="" @click.stop.prevent="deleteRow(rowData,index)">
        <i class="fa fa-lg fa-trash"></i>删除</a>
	</span>

</template>
<script>
	export default{
		name: 'itemAction',
		props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
	    methods: {
	        update(){

               // 参数根据业务场景随意构造
               let params = {type: 'edit', rowData: this.rowData}
               this.$emit('on-custom-comp',params)
            },

            deleteRow(){
                let path = this.$router.history.current.fullPath
                let tip = ''
                console.log(path)
                if(path !== '/record')
                    tip = '（将会同步删除对应的工作记录）'
                let self = this
                swal({
                    title: `确定删除? ${tip}`,
                    text: "确认删除后，将无法恢复该条数据!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "确认删除!",
                    // cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },function(isConfirm){
                    if(isConfirm){
                        let params = {type: 'delete' , id: self.rowData['id']}
                        self.$emit('on-custom-comp',params);
                        
                    }
                });
                

            }
	    }
	}
</script>
<style>
	
</style>