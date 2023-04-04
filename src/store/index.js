//import {createStore} from 'vuex'
//import Auth from './modules/auth';
 import TvShow from './modules/tvShow';
 import Auth from './modules/auth';

// const store = createStore({
//    modules: {
//     TvShow
//    }
// })

// export default store;

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        TvShow,
        Auth
    }
})

