<template>
  <div class='footer'>
    <div class="bottom-nav-bar">
      <div class="nav-icon-wrapper current" v-for='(item,index) in tabs' :key='item.name' :class='item.path==current?"active":""' @click='toggle(item.path)'  data-tab=".movie">
        <!-- <span class="nav-icons" id="icon-movie"> -->
          <i :class="item.icon" aria-hidden="true"></i>
        <!-- </span> -->
        <span class="nav-text">{{item.name}}</span>
    </div>
    </div>
  </div>
</template>

<script>

export default{
  name:'Footer',
  props:['test'],
  components:{},
  data(){
    return {
      tabs:[{name:'电影',path:'movie',icon:'fa fa-video-camera'},{name:'影院',path:'cinema',icon:'fa fa-minus-square-o'},{name:'我的',path:'mine',icon:'fa fa-user-circle-o'}],
      current:'movie'
    }
  },
    computed:{},
    methods:{
      toggle(path){
        this.current=path;
        this.$router.push({path:`/${path}`});
      }
      },
    created(){
      this.current=this.test;
    },
  watch: {
     $route : function (newQuestion, oldQuestion) {
            this.current=newQuestion.name;

    }
  }
} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.footer{
  .bottom-nav-bar{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top: .5px solid #d8d8d8;
    display: -webkit-box;
    display: flex;color: #696969;
    justify-content: space-around;
    .nav-icon-wrapper {
      float: left;
      .w(25);
      .h(48);
      .lh(48);
      box-sizing: border-box;
      
      position: relative;
      text-align: center;
      flex: 1;
      // .nav-icons {
      //   display: block;
      //   .w(25);
      //   .h(25);
      //   margin: auto;
      //   background-repeat: no-repeat;
      //   background-size: 25px;
        i{
          .fs(25);
          position: absolute;
          .left(50);
          .top(5);
        }
      // }
      .nav-text {
          .lh(12);
          position: absolute;
          .top(33);
          .left(0);
          .right(0);
          .fs(10);
      }
    }
  }
}
.active{
  color: #f03d37;
}
</style>