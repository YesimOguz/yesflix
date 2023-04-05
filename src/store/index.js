import Vue from 'vue';
import Vuex from 'vuex';
import TvShow from './modules/tvShow';
import Auth from './modules/auth';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        TvShow,
        Auth
    }
})

