<template>
    <div class='navshow'>
      <div class="showtab">
          <div v-for='(item,index) in moviesdata' @click='toggle(index)'  class="nav-item" data-bid="dp_wx_cinema_show_date" data-id="2018-11-29">
          <span class="date-title">{{item.dateShow}}</span>
          <div v-show='changenum==index' class="after"></div>
        </div>
      </div>
      <div>
        
      </div>
      <div class="shopticket">

      </div>
      <shopTicket v-if='Object.keys(ticketdata).length!=0' :tdata='ticketdata'></shopTicket>
           <!-- <shopTicket v-if='shopticket.length!=0&&vdata.length!=0' :tdata='shopticket' :vdata='vdata'></shopTicket>  --> 
    </div>
</template>

<script>
import Vue from 'vue'
import shopTicket from './shopticket.vue'
export default{
  name:'Show',
  components:{shopTicket},
  props:['test'],
  data(){
    return {
        id:'',
        moviesdata:[],
        num:0,
        changenum:0,
        // shopticket:[],
        // vdata:[],
        ticketdata:{}
    }
  },
    computed:{
      
    },
    methods:{
      getdata(){
          this.id=this.$route.params.id;
          console.log(this.id);
          //http://m.maoyan.com/ajax/cinemaDetail?cinemaId=2386
          this.$axios.get('/api/ajax/cinemaDetail',{params:{cinemaId:this.id}
          })
          .then((res)=>{
              let obj={};
              this.moviesdata=res.data.showData.movies[this.num].shows;
              let time=res.data.showData.movies[this.num].dur;
              let shopticket=res.data.showData.movies[this.num].shows[this.changenum].plist;
              console.log(res.data.showData.vipInfo);
              if(res.data.showData.vipInfo){
                var vdata=res.data.showData.vipInfo[0];
              }else{
                var vdata='';
              }
              obj.shopticket=shopticket;
              obj.vdata=vdata;
              obj.time=time;
              this.ticketdata=obj;
              console.log(this.ticketdata);
          })
          .catch((err)=>{
              console.log(err);
          })
      },
      toggle(val){
        this.changenum=val;
        this.getdata();
        
      }
  },
  watch: {
    test : function (newQuestion, oldQuestion) {
            console.log(newQuestion, oldQuestion)
            this.num=newQuestion;
            this.changenum=0;  
            this.getdata();
    }
  },
    mounted(){
    },
    created(){
      this.getdata();
    }
    // beforeCreate(){
    //   this.getdata();
    // }
} 

</script>
<style lang="less" scoped>
@import url('../../../../styles/main.less');
.navshow{
  // .h(45);
  position: relative;
  .fs(14);
  .showtab{
    overflow-x: scroll;
    white-space: nowrap;
    .nav-item{
      .h(45);
      .lh(45);
      display:inline-block;
      .margin(0,0,0,30);
      position:relative;
    }
    .nav-item:first-child{
      .margin(0,0,0,15);
    }
    .nav-item:last-child {
      .margin(0,15,0,30);
    }
  }
  .shopticket{
  }
}
.after{
    content: "";
    position: absolute;
    // width: 110%;
    .w(88);
    height: 2px;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #f03d37;
  }
</style>