// import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../views/HomePage.vue'
//import DetailsModal from '../components/DetailsModal.vue'
import SearchedTvShows from '../views/SearchedTvShows.vue'
import Vue from 'vue'
import VueRouter from  'vue-router'

Vue.use(VueRouter);


const routes = [
//    {
//        path: '/',
//        children: [
        {
          path: '/',
          name: 'tvShows',
          component: HomePage
        },
        // {
        //    path: '/tvShow/:id',
        //    name: 'tvShowDetails',
        //    component: DetailsModal,
        // },
        {
            path: '/search/:name',
            name: 'searchedTvShows',
            component: SearchedTvShows,
         },
//        ]
//    },
];

const router = new VueRouter({
    mode: 'history',
    routes
  })


export default router;