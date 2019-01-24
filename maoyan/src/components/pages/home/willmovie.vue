<!-- <template>
  <div class='hotmovie'>
  	22222
  </div>
</template>

<script>
export default{
  name:'Hotmovie',
  components:{},
    computed:{
      
    }
} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');

</style> -->





<template>
  <div
    class="movielistmore"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="50"
  >
    <!--infinite-scroll-disabled  等于true时代表正在执行加载，这时禁用滚动触发 -->
    <!--infinite-scroll-distance  指定滚动条距离底部多高时触发v-infinite-scroll指向的方法 -->
    <div class="list">
      <div class="top_list">
        <p class="title">近期最受期待</p>
        <div class="most_list">
          <div class="m_item" v-for="(item,index) in tablist" :key="index">
            <div class="img_bg">
              <img :src="item.img|getImg2">
              <span class="wish">
                <span class="wish_num">{{item.wish}}</span>人想看
              </span>
              <div class="toggle_wish">
                <img src="../../../assets/xin.png">
              </div>
            </div>
            <h5>{{item.nm}}</h5>
            <p>{{item.comingTitle|getDates}}</p>
          </div>
        </div>
      </div>
      <div class="coming_list">
        <div v-for="(item,index) in movielist" :key="index">
          <p
            style="font-size:13px;"
            v-if="index>=1?(item.comingTitle!=movielist[index-1].comingTitle):true"
            class="days"
          >{{item.comingTitle}}</p>
          <div class="item">
            <img class="img1" :src="item.img|getImg2">
            <div class="contain">
              <div class="left">
                <div class="nm line">
                  <p class="p1 line">{{item.nm}}</p>
                  <p :class='item.version==""?"hide":""'>
                    <img
                      :class='item.version=="v3d imax"?"":"hide"'
                      src="../../../assets/3DIMAX.png"
                    >
                    <img :class='item.version=="v3d"?"imgc":"hide"' src="../../../assets/3D.png">
                    <img
                      :class='item.version=="v2d imax"?"":"hide"'
                      src="../../../assets/2DIMAX.png"
                    >
                  </p>
                </div>
                <div class="sc line">
                  <p>
                    <span>{{item.wish}}</span> 人想看
                  </p>
                </div>
                <p class="star line">主演: {{item.star}}</p>
                <p class="info line">{{item.rt}}上映</p>
              </div>
              <div class="right">
                <p v-if="item.showInfo">预售</p>
                <p v-if="!item.showInfo" style="background-color: #faaf00;">想看</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "mint-ui";
import { InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);
export default {
  name: "MovieListMore",
  props: ["path"],
  data() {
    return {
      tablist: [],
      offset: 0,
      movielist: [],
      movieid: [],
	  length: 0,
	  state:true,
	  loading:false,
	  length2:0
    };
  },
  methods: {
    loadMore() {
		if(this.state){
			this.moviedata();
		}
    },
    // http://m.maoyan.com/ajax/mostExpected?ci=20&limit=10&offset=0&token=
    tabdata() {
      this.$axios.get("/api/ajax/mostExpected", {
          params: {
            ci: 20,
            token: "",
            limit: 10,
            offset: this.offset
          }
        })
        .then(res => {
        //   console.log(res);
          this.tablist = this.tablist.concat(res.data.coming);
          this.length = res.data.paging.total;
          this.offset += 10;
          if (res.data.coming.length != 0) {
            this.tabdata();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // http://m.maoyan.com/ajax/comingList?ci=20&token=&limit=10
    moviedata() {
      if (this.movielist.length == 0) {
        this.$axios.get("/api/ajax/comingList", {
            params: {
              ci: 20,
              token: "",
              limit: 10
            }
          })
          .then(res => {
            // console.log(res);
			this.movielist = res.data.coming;
			this.length2=res.data.coming.length;
			// console.log(this.length2)
			this.movieid=res.data.movieIds;
          })
          .catch(err => {
            // console.log(err);
          });
      }else if(this.length2<this.movieid.length){
				this.loading=true;
				var str='';
				// console.log(this.movieid.length-this.length2);
    			if((this.movieid.length-this.length2)>=10){
					// console.log(1)
    				for(let i=this.length2;i<(this.length2+10);i++){
    					str+=this.movieid[i]+',';
					}
					this.length2+=10;
    			}else if(10>(this.movieid.length-this.length2)>0){
					// console.log(2)
    				for(let i=this.length2;i<this.movieid.length;i++){
					str+=this.movieid[i]+',';
					// this.state=false;
					}
					this.length2=this.movieid.length;
    			}
				str=str.slice(0,-1);
				// console.log(this.state,this.length2);
				// if(this.state==true){
					this.$axios.get('/api/ajax/moreComingList',{params:{	
    					token:'',
    					movieIds:str
    				}
					})
					.then((res)=>{
						// console.log(res);
						this.movielist=this.movielist.concat(res.data.coming);
						this.loading=false;
					})
				// }
    			
    		}
    }
  },
  created() {
    this.tabdata();
  }
};
</script>

<style lang="less" scoped>
@import url("../../../styles/main.less");
.movielistmore {
  .w(375);
  .h(522);
  overflow: auto;
  .list {
    .w(358);
    .top_list {
      .padding(12, 0, 12, 15);
      margin-bottom: 10px;
      .title {
        .fs(13);
        margin-bottom: 12px;
        color: #333;
      }
      .most_list {
        overflow-x: auto;
        white-space: nowrap;
        .m_item {
          display: inline-block;
          .w(85);
          margin-right: 15px;
          .img_bg {
            .w(85);
            .h(115);
            position: relative;
            margin-bottom: 6px;
            img {
              .w(85);
              .h(115);
            }
            .wish {
              position: absolute;
              left: 4px;
              bottom: 2px;
              color: #faaf00;
              .fs(11);
              font-weight: 600;
            }
            .toggle_wish {
              .w(28);
              .lh(28);
              background: rgba(61, 63, 71, 0.6);
              text-align: center;
              border-bottom-right-radius: 10px;
              position: absolute;
              top: 0;
              left: 0;
              img {
                .w(10);
                .h(10);
              }
            }
          }
          h5 {
            .fs(13);
            color: #222;
            margin-bottom: 3px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          p {
            .fs(12);
            color: #999;
          }
        }
      }
      .most_list::-webkit-scrollbar {
        display: none;
      }
    }
    .coming_list {
      // .w(358);
      .days {
        .padding(12, 15, 0, 15);
        color: #333;
      }
      .item {
        .padding(0, 0, 0, 15);
        box-sizing: border-box;
        .img1 {
          .w(64);
          .h(90);
          margin-top: 12px;
          float: left;
        }
        .contain {
          .padding(12, 12, 12, 0);
          margin-left: 74px;
          border-bottom: 1px solid #e6e6e6;
          .h(89);
          .left {
            float: left;
            .w(207);
            .padding(0, 3, 0, 0);
            overflow: hidden;
            .nm {
              .fs(17);
              color: #333;
              font-weight: 700;
              margin-bottom: 5px;
              display: flex;
              .p1 {
                .padding(0, 5, 0, 0);
              }
              p:nth-child(2) {
                .w(43);
                .h(14);
                .fs(12);
                font-weight: normal;
                margin-top: 5px;
                img {
                  width: 43px;
                  height: 14px;
                }
                .imgc {
                  width: 17px;
                }
              }
            }
            .sc,
            .star,
            .info {
              .fs(13);
              color: #666;
            }
            .sc {
              span {
                .fs(15);
                font-weight: 700;
                color: #faaf00;
              }
            }
            .star {
              margin-top: 4px;
            }
            .info {
              margin-top: 4px;
            }
            .line {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          .hide {
            display: none;
          }
          .right {
            float: right;
            margin-top: 31px;
            p {
              .w(47);
              .h(27);
              .lh(28);
              text-align: center;
              background-color: #3c9fe6;
              color: #fff;
              border-radius: 4px;
              .fs(12);
            }
          }
        }
      }
    }
  }
}
.movielistmore::-webkit-scrollbar {
  display: none;
}
</style>