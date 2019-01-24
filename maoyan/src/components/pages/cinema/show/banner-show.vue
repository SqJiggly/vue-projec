<template>
    <div class='bannershow'>
        <div class="cinema-block">
            <div class="cinema-info">
                <div class="title line-ellipsis">{{msg.nm}}</div>
                <div class="location line-ellipsis">{{msg.addr}}）</div>
                <div class="location-icon" data-bid="dp_wx_cinema_map"><img src="../../../../assets/posetion.png"></div>
            </div>
            <div class="swiper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for='(item,index) in moviesdata' :key='index'>
                           <div class="swiper-div swiper-slide-active"  data-obj="">
                                <div class="post" :class='num==index?"tobig":""' data-bid="dp_wx_cinema_movie_pic_click">
                                    <img :src="item.img|imgurl">
                                    <div class="after" v-show='num==index'>   
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
                <div class="movie-info">
                    <div class="movie-title line-ellipsis">
                        <span class="title">{{moviesdata[num].nm}}</span>
                        <span class="grade">
                            <span v-show='moviesdata[num].sc!=0'>{{moviesdata[num].sc}}<span class="small">分</span></span>
                            <span v-show='moviesdata[num].sc==0'>{{moviesdata[num].wish}}<span class="small">想看</span></span>
                        </span>    
                    </div>
                <div class="movie-desc line-ellipsis">{{moviesdata[num].desc}}</div>
            </div>
            </div>
        </div>
        <navshow :test='num'></navshow>
    </div>
</template>

<script>
import Swiper from 'swiper'
import Vue from 'vue'
import navshow from './nav-show.vue'
export default{
  name:'BannerShow',
  components:{navshow},
  data(){
    return {
        id:'',
        moviesdata:[],
        msg:[],
        num:0,
    }
  },
  methods:{
    getdata(){
        // let storage=window.localStorage;
        // console.log(storage.getItem("index"));
        // let keeplive=storage.getItem("index");
        // if(keeplive>0){
        //     this.num=keeplive;
        // }

        this.id=this.$route.params.id;
        //http://m.maoyan.com/ajax/cinemaDetail?cinemaId=2386
        this.$axios.get('/api/ajax/cinemaDetail',{params:{cinemaId:this.id}
        })
        .then((res)=>{
            let data=res.data;
            this.msg=data.cinemaData;
            this.moviesdata=data.showData.movies
            Vue.nextTick(()=>{
                    this.initSwiper();
                 })
            
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    initSwiper(){
        var swiper = new Swiper('.swiper-container', {

          slidesPerView: 4,
          spaceBetween: 30,
          centeredSlides: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          on: {
            slideChangeTransitionEnd: ()=>{
              // swiper.activeIndex=this.num;
              let nownum=swiper.activeIndex;
              this.num=nownum;
              this.$router.push({path:`/show/${this.id}/movieId${this.moviesdata[this.num].id}`});
              var storage=window.localStorage;
              storage.setItem("index",this.num);
            },

          }
        });
       },
            
  },
  // watch: {
  //   // 如果 `question` 发生改变，这个函数就会运行
  //   num: function (newQuestion, oldQuestion) {
  //     // this.answer = 'Waiting for you to stop typing...'
  //     // this.debouncedGetAnswer()
  //     // console.log(newQuestion,oldQuestion);
  //     // this.getdata();
  //   }
  // },
    computed:{
      
    },
    mounted(){
         
    },
    created(){
        this.getdata();
        // var storage=window.localStorage;
        // storage.setItem("index",this.num);

    }
} 

</script>
<style lang="less" scoped>
@import url('../../../../../node_modules/swiper/dist/css/swiper.min.css');
@import url('../../../../styles/main.less');
.bannershow{
    .top(0);
    .left(0);
    .right(0);
    // .padding(51.5,0,0,0);
    .cinema-block{    
        background-color: #fff;
        .cinema-info{
            position: relative;
            .padding(15,100,15,15);
            .line-ellipsis{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .title{
                .fs(17);
                .lh(24);
                font-weight: 700;
                color: #333;
            }
            .location{
                .margin(2,0,0,0);
                .fs(13);
                .lh(18.5);
                color: #999;
            }
            .location-icon{
                position: absolute;
                right: 0;
                top: 50%;
                .w(70);
                .h(31);
                transform: translateY(-50%);
                border-left: 1px solid #d8d8d8;
                text-align: center;
                img{
                    display: inline-block;
                    position:absolute;
                    .w(19);
                    .h(22);
                    .top(5);
                    .right(25);
                    // .margin(5,0,0,0);
                }
            }
        }
        .swiper{
            .h(202);
            position:relative;
            z-index: 1;
            .swiper-container{
                .w(375);
                .h(135);
                // background-image: url(http://p0.meituan.net/148.208/movie/363e3a7e614d29b2847ff4e62afcd3f42168651.jpg);
                // filter: blur(10px);
                // display:table-cell;
                // vertical-align:middle;
                // text-align: center;
                background-color: #40454d;
                overflow:hidden;
                // background-position-y: 40%;
                // position:absolute;
                z-index: -1;
                .mark{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background-color: #40454d;
                    opacity: .75;
                }
                // .swiper-wrapper:first-child{
                //     .margin(0,0,0,10);
                //     img{
                        
                //     }
                // }
                .swiper-wrapper{
                    position:absolute;
                    top:50%;
                    .margin(-47.5,0,0,0);
                    z-index: 1;
                    // .w(355);
                    .h(95);
                    .swiper-slide{
                        .w(69) !important;
                        .padding(0,5,0,0);
                        .margin(0,27,0,0) !important;
                        .swiper-div{
                            .post{
                                border: 2px solid #fff;
                                .w(69);
                                .h(99);
                                box-sizing: border-box;
                                img{
                                    .w(65);
                                    .h(95); 
                                }
                            }
                        }
                    }
                }
            }
            .movie-info{
                .padding(11,11,15,15);
                text-align: center;
                .movie-desc{
                    margin-top: 2px;
                    height: 18.5px;
                    line-height: 18.5px;
                    font-size: 13px;
                    color: #999;
                }
                .movie-title{
                    height: 24px;
                    line-height: 24px;
                    font-size: 17px;
                    color: #333;
                    font-weight: 700;
                    .grade{
                        color: #ffb400;
                        font-size: 16px;
                        span{
                            span{
                                .fs(10);
                            }
                        }
                    }
                }
            }
        }
    }
}
.after{
    content: "";
    position: absolute;
    .bottom(-8);
    // bottom:-8px;
    left: 50%;
    transform: translateX(-50%);
    .w(10);
    .h(5);
    background: url('../../../../assets/bottom.png') no-repeat;
    background-size: contain;
}
.tobig{
    transform: scale(1.15);
}
</style>
