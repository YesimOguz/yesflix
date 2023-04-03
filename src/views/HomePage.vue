<template>
  <SearchLoader v-if="!isLoaded" />
  <div v-else-if="!tvShows.length">No Tv Shows found!</div>
  <div v-else>
    <TvShowsCarouselByGenre
      @imageIsClicked="showModal"
      v-for="genre in genres"
      :key="genre"
      :title="genre"
      :tvShows="tvShowsByGenre(genre)"
    />
    <DetailsModal
      v-show="isModalVisible"
      @close="closeModal"
      :tvShow="tvShow"
    ></DetailsModal>
  </div>
</template>

<script>
import SearchLoader from "../components/SearchLoader.vue";
//import api from "../../api";
import TvShowsCarouselByGenre from "../components/TvShowsCarouselByGenre.vue";
import DetailsModal from "../components/DetailsModal.vue";
import { mapState } from "vuex";

export default {
  components: {
    TvShowsCarouselByGenre,
    SearchLoader,
    DetailsModal,
  },
  data() {
    return {
      genres: [
        "drama",
        "music",
        "science-fiction",
        "thriller",
        "action",
        "crime",
        "horror",
        "romance",
        "adventure",
        "espionage",
        "mystery",
        "supernatural",
        "fantasy",
      ],
      tvShow: {},
      //tvShows: [],
      isLoaded: false,
      isModalVisible: false,
    };
  },
  mounted() {
    console.log("i am here");
    this.getTvShowsByGenres();
  },
  computed: {
    ...mapState({
      tvShows: (state) => state.TvShow.tvShows,
    }),
    tvShowsByGenre() {
      return (genre) => {
        return this.tvShows
          .filter((tvShow) => {
            return tvShow.genres.some((gr) => gr.toLowerCase().includes(genre));
          })
          .sort(
            (tvShow1, tvShow2) =>
              tvShow2.rating.average - tvShow1.rating.average
          );
      };
    },
    // tvShowsByGenre() {
    //   return (genre) => {
    //     return this.tvShows.filter((tvShow) => {
    //       return tvShow.genres
    //         .some((gr) => gr.toLowerCase().includes(genre))
    //         .sort(
    //           (tvShow1, tvShow2) =>
    //             tvShow1.rating.average - tvShow2.rating.average
    //         );
    //     });
    //   };
    // },
  },
  methods: {
    getTvShowsByGenres() {
      this.$store
        .dispatch("getTvShows")
        .catch(() => {
          this.$notify({
            type: "error",
            text: "Something went wrong!",
          });
        })
        .finally(() => {
          this.isLoaded = true;
        });
    },
    showModal(tvShow) {
      console.log("xxx");
      this.isModalVisible = true;
      this.tvShow = tvShow;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
