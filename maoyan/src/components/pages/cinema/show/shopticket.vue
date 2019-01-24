<template>
    <div class='shopticket'>
        <div class="discount-block">
          <div class="vip-tips" v-show='tdata.vdata!=""'>
            <a>
              <div class="label">{{tdata.vdata.tag}}</div>
              <div class="label-text line-ellipsis">{{tdata.vdata.title}}</div>  
              <div class="process">{{tdata.vdata.process}}</div>
            </a>
          </div>
        </div>
        <div class="seat-inner-wrap">
          <div class="seat-list">
            <div class="list-warp">
              <div class="item-outer mb-line-b" data-bid="dp_wx_cinema_show_item" v-for='(item,index) in tdata.shopticket' :key='index'>
                  <div class="item box-flex">
                    <div class="time-block">
                      <div class="begin">{{item.tm}}</div>
                      <div class="end">{{endingtime[index]}}<span class="tui" >散场</span></div>
                    </div>
                    <div class="info-block">
                      <div class="lan">{{item.lang}} {{item.tp}}</div>
                      <div class="hall">{{item.th}}</div>
                    </div>
                    <div class="price">
                      <div class="sellPr"><span class="d">¥</span><span class="stonefont">28</span></div>
                      <div class="vipPrice" v-show='item.vipPriceName'><span class="icon">{{item.vipPriceName}}</span><span class="num">¥{{item.vipPrice}}</span></div>
                      <div class="extraDesc" v-show='item.extraDesc'>{{item.extraDesc}}</div>
                    </div>
                    <div class="button-block">
                      <div class="button" data-bid="dp_wx_cinema_show_btn">购票</div> 
                    </div>
                  </div> 
              </div>
            </div>  
          </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default{
  name:'shopTicket',
  components:{},
  props:['tdata'],
  date(){
    return {
      listdata:[],
      endingtime:[]
    }
  },
    computed:{},
    methods:{
      enddata(){
        console.log(777);
        let cinematime=this.tdata.time;
        let bgtime=this.tdata.shopticket.map((item,index)=>{
          // let alltime=item.tm;
          let endtime;
          let hour = Number(item.tm.slice(0,2));
          let miao = Number(item.tm.slice(-2));
          let dhour = Math.floor(cinematime/60);
          let dmiao = cinematime%60;
          if((dmiao+miao)>60){
            hour=hour+dhour+1;
            // if(hour<10){
            //   hour='0'+hour+'';
            // }
            miao=(dmiao+miao)-60;
            if((hour-24)<0){
              endtime=''+hour+':'+miao;
            }else if((hour-24)==0){
              endtime=''+'00'+':'+miao;
            }else{
              hour=hour-24;
              endtime=''+hour+':'+miao;
            }
            
          }else if((dmiao+miao)==60){
            hour=hour+dhour+1;
            // if(hour<10){
            //   hour='0'+hour+'';
            // }
            if((hour-24)<0){
              endtime=''+hour+': 00';
            }else if((hour-24)==0){
              endtime=''+'00'+': 00';
            }else{
              hour=hour-24;
              endtime=''+hour+': 00';
            }
          }else{
            hour=hour+dhour;
            // if(hour<10){
            //   hour='0'+hour+'';
            // }
            if((hour-24)<0){
              endtime=''+hour+':'+dmiao;
            }else if((hour-24)==0){
              endtime=''+'00'+':'+dmiao;
            }else{
              hour=hour-24;
              endtime=''+hour+':'+dmiao;
            }
          }
          return endtime;
        });
        this.endingtime=bgtime;
      }
    },
    mounted(){
    },
    created(){
      console.log(this.tdata);
      this.enddata();
    },
    watch:{
     tdata(curVal,oldVal){
      console.log(666);
       this.enddata();
     },
}
} 

</script>
<style lang="less" scoped>
@import url('../../../../styles/main.less');
.vip-tips{
  background-color: #fff5ea;
  .padding(0,15,0,15);
  .h(42);
  .lh(42);
  a{
    display: flex;
    color: #777;
    .label{
      background-color: #ff941a;
      flex: 0 0 auto;
      display: inline-block;
      .border-radius(2);
      .fs(10);
      .h(15);
      .lh(15);
      .w(34);
      text-align: center;
      color: #fff;
      .margin(13,10,0,0);
    }
    .label-text{
      color: #fa9600;
      flex: 1 1 auto;
      .fs(12);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .process{
      flex: 0 0 auto;
      .lh(42);
      .fs(12);
      color: #999;
    }
    .process::after{
      display: inline-block;
      content: "";
      width: 7px;
      height: 7px;
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      -webkit-transform: rotate(135deg);
      transform: rotate(135deg);
    }
  }
}
.seat-inner-wrap {
    min-height: 40px;
    .item-outer{
      .padding(17,0,17,0);
      .margin(0,0,0,12.5);
      background-size: 1px 1px;
      .item{
        .h(44);
        .padding(0,12.5,0,0);
        display: flex;
        .time-block{
          position: relative;
          .begin{
            .fs(20);
            color: #333;
            line-height: 1;
            white-space: nowrap;
          }
          .end{
            .margin(10,0,0,0);
            color: #999;
            .fs(11);
            line-height: 1;
            white-space: nowrap;
          }
        }
        .info-block{
          .margin(0,0,0,17);
          flex: 1;
          overflow-x: hidden;
          .lan{
            .margin(2,0,0,0);
            .lh(18);
            .fs(13);
            color: #333;
            white-space: normal;
          }
          .hall{
            .margin(7,0,0,0);
            .fs(11);
            color: #999;
            white-space: normal;
          }
        }
        .price{
          flex: 0 1 auto;
          .w(130);
          .margin(0,0,0,5);
          .sellPr{
            display: inline-block;
            line-height: 1;
            color: #f03d37;
            .margin(1,0,0,0);
            .fs(19);
            .d{
              .fs(11);
            }
          }
        }
        .vipPrice{
          display: inline-block;
          .h(15);
          .lh(15);
          transform: scale(.8);
          transform-origin: left;
          .margin(0,-16,0,0);
          .border-radius(2);
          .fs(12);
          border: 1px solid #ff9000;
          .icon{
            display: inline-block;
            .padding(0,2,0,2);
            color: #fff;
            background-color: #f90;
          }
        }
      }
    }
}
</style>