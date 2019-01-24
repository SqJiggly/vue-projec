<template>
  <div class='header'>
    <header class="navbar" v-if='path!="city-list"'>
      <!-- <div class="nav-wrap-left">
          <a class="back" href="#" onclick="javascript: window.history.back();return false;"><i class="icon-back"></i></a>
      </div> -->
    <h1 class="nav-header">猫眼电影</h1>
  </header>
  </div>
</template>

<script>

export default{
  name:'Header',
  data(){
    return {
      path:''
    }

  },
  components:{},
    computed:{},
    methods:{
      },
    created(){
    },
    watch: {
     $route : function (newQuestion, oldQuestion) {
            this.path=newQuestion.name;

    }
  }
} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.header{
  .navbar {
    // height: 50.5px;
    .h(50.5);
    color: #fff;
    background: #e54847;
    border-bottom: 1px solid #e54847;
    // display: -webkit-box;
    // display: -ms-flexbox;
    position: relative;
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
    .nav-wrap-left {
    .h(50.5);
    .lh(50.5);
    }
    .nav-header{
      display: block;
      .fs(18);
      font-weight: 400;
      text-align: center;
      .lh(50);
      .margin(0,52.5,0,0);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-right: 0!important;
    }
}
}
</style>