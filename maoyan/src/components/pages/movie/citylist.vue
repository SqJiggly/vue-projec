<template>
  <div class='citylist'>
  	<div class="">
  	<mt-index-list>
      <mt-index-section index="当前城市">
      <mt-cell @click.native='choose("广州","movie")' title="广州"></mt-cell>
    </mt-index-section>
      <mt-index-section index="最近搜索">
      <mt-cell @click.native='choose("广州","movie")' title="广州"></mt-cell>
    </mt-index-section>
    <mt-index-section index="热门城市">
      <mt-cell @click.native='choose(item.name,"movie")' v-for="item in hotcity" :key="item.name" :title="item.name"></mt-cell>
    </mt-index-section>
	  <mt-index-section v-for="(cities,letter) in allcity" :key="letter" :index="letter" v-if="cities.length>0">
	    <mt-cell @click.native='choose(city.name,"movie")' v-for="city in cities" :key="city.id" :title="city.name"></mt-cell>
	  </mt-index-section>
	</mt-index-list>
  </div>
  </div>
</template>
<script>
import Allcity from '../../../mock/citylist.js'
export default{
  name:'Citylist',
  components:{},
  data(){
  	return {
  		hotcity:[{name:'上海'},{name:'北京'},{name:'广州'},{name:'深圳'},{name:'武汉'},{name:'天津'},{name:'西安'},{name:'南京'},{name:'杭州'},{name:'成都'},{name:'重庆'}],
  		allcity:{}
  	}
  },
    computed:{
      
    },
    methods:{
    	choose(city,path){
    		console.log(666);
    		var storage=window.localStorage;
    		storage.setItem('city',city);
    		this.$router.push({path:`${path}`});
    	}
    },
    created(){
    	Allcity.then((res)=>{
    		this.allcity=res;
    		console.log(this.allcity);
    		
    	})
    }
} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.citylist{
	background-color: #ebebeb;
    .fs(14);
    color: #333;
    .top(0);
    .bottom(0);
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1000;
    overflow-y: auto;
	.mint-indexlist {
    .mint-indexsection-index{
		.padding(0,0,0,15);
		.lh(30);
    }
	}
	.city-list{
		// .h(48);
		overflow: hidden;
		.padding(0,30,0,0);
		.city-item{
			float: left;
		    background: #fff;
		    width: 29%;
		    height: 33px;
		    margin-top: 15px;
		    margin-left: 4%;
		    padding: 0 4px;
		    border: 1px solid #e6e6e6;
		    border-radius: 3px;
		    line-height: 33px;
		    text-align: center;
		    box-sizing: border-box;
		    white-space: nowrap;
		    overflow: hidden;
		    text-overflow: ellipsis;
		}
    }
    .city-list-inline{
    	background-color: #f5f5f5;
    	padding-bottom: 8px;
    	.location-city{
    		width: auto;
		    min-width: 29%;
		    padding: 0 20px;
		    float: left;
		    background: #fff;
		    // width: 29%;
		    height: 33px;
		    margin-top: 15px;
		    margin-left: 4%;
		    padding: 0 4px;
		    border: 1px solid #e6e6e6;
		    border-radius: 3px;
		    line-height: 33px;
		    text-align: center;
		    box-sizing: border-box;
		    white-space: nowrap;
		    overflow: hidden;
		    text-overflow: ellipsis;
		}
	}
  .mint-indexlist-navlist{
    .top(180);
  }
}
</style>