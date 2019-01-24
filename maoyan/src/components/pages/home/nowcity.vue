<template>
    <div class="city">
        <div class="city-entry" @click='gopage("/city-list")'>
            <span v-show='this.choosecity==null' class="city-name">{{currentCity}}</span>
            <span v-show='this.choosecity!=""' class="city-name">{{choosecity}}</span>
            <i class="fa fa-sort-desc"></i>
        </div>
    </div>
</template>

<script>
export default{
  name:'City',
  data(){
  	return {
          currentCity:'',
          choosecity:''
  	}
  },
    computed:{},
    methods:{
    	gopage(path){
    		this.$router.push({path:`${path}`});
    	}
    },
    mounted() {

    // var map = new BMap.Map("bdmap");
    // map.centerAndZoom("广州", 15);
    // // map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
    // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(
    //   res =>{
    //     console.log(res);
    //     // 设置当前城市
    //     this.currentCity = res.address.city.replace(/市$/,'');

    //     this.getMovie();

    //     map.centerAndZoom(new BMap.Point(res.longitude,res.latitude),11);
    //   });
},
created(){
	var storage=window.localStorage;
    this.choosecity=storage.getItem('city');
    this.currentCity=returnCitySN.cname.slice(3,5)

    console.log(this.currentCity,this.choosecity)  
	// console.log(this.currentCity);
}

} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.city{
	.city-entry {
			    .padding(0,0,0,15);
			    .fs(15);
			    color: #666;
			    display: flex;
			    align-items: center;
			.city-name {
			    white-space: nowrap;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    .mw(70);
			    max-width: 19.2vw;
			}
			}
}
.active{
	color:red;
	border-bottom:2px solid red;
}
</style>