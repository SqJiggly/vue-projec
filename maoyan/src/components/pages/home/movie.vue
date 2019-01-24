<template>
  <div class='movie'>
  	<div class="topbar">
    	<div class="white-bg topbar-bg ">
		    <City></City>
		    <div class="switch-hot" data-active=".n-hot">
	      		<div class="hot-item" data-tab=".n-hot" v-for='(item,index) in showway' :key='index' :class='item.show==tab.show?"active":""' @click='change(item.show,item.zj)'>{{item.show}}</div>
    		</div>
    		<div class="search-entry search-icon" data-type="movie" @click="goPage()">
    		</div>
    	</div>
  	</div>
  	<component :is="tab.zj"></component>
  </div>
</template>

<script>
import Hotmovie from './hotmovie.vue'
import Willmovie from './willmovie.vue'
import City from './nowcity.vue'
export default{
  name:'Movie',
  components:{Hotmovie,Willmovie,City},
  data(){
  	return {
  		showway:[{show:'正在热映',zj:'Hotmovie'},{show:'即将上映',zj:'Willmovie'}],
  		tab:{show:'正在热映',zj:'Hotmovie'}
  	}
  },
    computed:{},
    methods:{
    	gopage(path){
    		this.$router.push({path:`${path}`});
    	},
    	change(show,zj){
    		this.tab.show=show;
    		this.tab.zj=zj;
    	},
    	goPage(){
       	 this.$router.push({path:'/toseach',query: { searchtype:'movie' }})
        
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
	// var storage=window.localStorage;
	// this.currentCity=storage.getItem('city');
	// // console.log(this.currentCity);
}

} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.movie{
	.topbar{
		border-bottom: 1px solid #e6e6e6;
		.h(44);
		.topbar-bg {
		    display: flex;
		    align-items: center;
		    .h(44);
		    justify-content: space-between;
		    .search-icon {
		    	.w(20);
		    	.h(20);
			    background-size: 20px;
			    .padding(10,15,10,10);
			    background: url(../../../assets/seach.png) 10px no-repeat;
			}
		    .switch-hot {
			    display: flex;
			    .h(44);
			    .lh(44);
			    color: #666;
			    position: relative;
			    .hot-item {
				    .fs(15);
				    .w(80);
				    width: 21.33333vw;
				    text-align: center;
				    .margin(0,12,0,12);
				    font-weight: 700;
				}
			}
		}	
	}
}
.active{
	color:red;
	border-bottom:2px solid red;
}
</style>