<template>
    <div class='show'> 
           <BannerShow></BannerShow>
           <!-- <Navshow></Navshow>   -->
    </div>
</template>

<script>
import Vue from 'vue'
import BannerShow from './banner-show.vue'
// import Navshow from './nav-show.vue'
export default{
  name:'Show',
  components:{BannerShow},
  date(){
    return {
        id:''
    }
  },
    computed:{
      
    },
    mounted(){
    },
    created(){

    }
} 

</script>
<style lang="less" scoped>
@import url('../../../../styles/main.less');
</style>