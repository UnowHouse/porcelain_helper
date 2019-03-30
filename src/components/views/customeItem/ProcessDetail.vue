<template>
	<div @click.stop.prevent="openDetail(rowData,index)"  class="dropdown">
	    <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)" aria-expanded="true">
	        工序详情查看
	        <span class="caret"></span>
	    </a>
	</div>
</template>
<script>
	
	export default{
		name: 'processDetail',
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
        data() {
        	return {
        		show:false,
        	}
        },
        
	    methods: {
	        openDetail() {
	        	this.$emit('on-custom-comp',{type:'detail',rowData:this.rowData})
	        }
	    }
	}
</script>
