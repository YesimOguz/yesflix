import api from '../../../../api';

export default {
    getTvShows({ commit }) {
        api.get("shows")
           .then((response) => {
             commit('setTvShows', response.data)
            })
    },
    searchTvShows({ commit }, query) {
        api.get(`search/shows?q=${query}`)
           .then((response) => {
             commit('setSearchedTvShow', response.data)
            })
    },
};

