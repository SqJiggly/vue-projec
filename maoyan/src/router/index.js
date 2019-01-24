import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../components/pages/home/home.vue'
import toSeach  from '../components/pages/cinema/toseach.vue'
import cinema from '../components/pages/cinema/cinema.vue'
import Show from '../components/pages/cinema/show/show.vue'
import Movie from '../components/pages/home/movie.vue'
import Mine from '../components/pages/home/mine.vue'
import citylist from '../components/pages/movie/citylist.vue'
// import Banner from '../components/pages/cinema/show/banner-show.vue'

export default new Router({
  routes: [
    {  path: '/',redirect:'/movie'},//重定向
   { path: '/cinema', component:Home ,name:'cinema'},
   { path: '/movie', component:Home  ,name:'movie'},
   { path: '/mine', component: Home ,name:'mine'},
   { path: '/toSeach', component:toSeach  ,name:'toSeach'},
   { path: '/show/:id', component:Show  ,name:'show'},
   { path: '/show/:id/:movieId', component:Show  ,name:'idshow'},
   { path: '/city-list', component:citylist  ,name:'city-list'},

    // {
    //   path: '/toseach',
    //   name: 'toSeach',
    //   component: toSeach
    // }
  ]
})
