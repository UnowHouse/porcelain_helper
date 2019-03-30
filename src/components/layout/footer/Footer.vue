<template>	
    <footer id="footer" class="fixed-bottom">©copyright by Tech.Unow</footer>
	
</template>
<script>
	export default{
		data() {
			return {
		        screenWidth: 123
		    }
			    
		},
		methods:{
			footerPosition(){
				let contentHeight = $(".content-wrapper").height()
           		let winHeight = window.innerHeight
           		if(contentHeight < winHeight)
               		$("#footer").addClass("fixed-bottom")
               	else
               		$("#footer").removeClass("fixed-bottom")
               	console.log(contentHeight)
			},
			fetchDate () {
	        }
		},
		watch:{
			"$route":"fetchDate"
		},

	}
</script>
<style>
  #footer{
    height: 40px;
    width: 100%;
    text-align: center;
    line-height: 40px;
    background: #fafafa;
    border-top: 1px solid #E7E7E7;
    z-index: 9;
  }
  .fixed-bottom{
  	position: fixed;
    bottom: 0;
  }
</style>