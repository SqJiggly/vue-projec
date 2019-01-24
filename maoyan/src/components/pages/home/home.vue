<template>
  <div class='home'>
    <component :is="path"></component>
    <!-- <movie></movie> -->
    <Footer :test='path'></Footer>
  </div>
</template>

<script>
import Header from '../common/header.vue'
import cinema from '../cinema/cinema.vue'
import movie from './movie.vue'
import mine from './mine.vue'
import Footer from '../common/footer.vue'
export default{
  name:'Home',
  components:{Header,Footer,cinema,movie,mine},
    computed:{},
    methods:{},
    data(){
    	return {
    		path:''
    	}
    },
    created(){
    	this.path=this.$route.name;
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

</style>