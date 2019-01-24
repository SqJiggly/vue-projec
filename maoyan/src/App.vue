<template>
  <div id="app">
  <Header></Header>
  <router-view></router-view>
  </div>
</template>
<script>
// import  Cinema from './components/pages/cinema/cinema.vue'
import Header from '../src/components/pages/common/header.vue'
export default {
  name: 'App',
  components: {Header}
}

</script>

<style>
</style>
