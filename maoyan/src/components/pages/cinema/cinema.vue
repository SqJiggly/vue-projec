<template>
  <div class='cinema'>
      <!-- <div class="navbar"></div> -->
      <Seach></Seach>
      <Tab></Tab>
      <List></List>
      <!-- <div class="bottombar"></div> -->
  </div>
</template>

<script>
import  Seach from './seach.vue'
import Tab from './tab.vue'
import List from './cinemaList.vue'

export default{
  name:'Cinema',
  components:{Seach,Tab,List},
    computed:{
      
    }
} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.cinema{
  position:fixed;
  .top(0);
  .left(0);
  .right(0);
  
  .padding(51.5,0,0,0);
  // .navbar{
  //   position:fixed;
  //   // z-index: 99;
  //   .top(0);
  //   .w(375);
  //   .h(50);
  //   background: #e54847;
  // }
  // .bottombar{
  //   position:fixed;
  //   z-index: 99;
  //   .bottom(0);
  //   .w(375);
  //   .h(49);
  //   background: #e54847;
  // }
}

</style>