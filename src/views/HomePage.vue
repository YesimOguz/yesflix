<template>
  <SearchLoader v-if="!isLoaded" />
  <div v-else-if="!tvShows.length" class="notFound">No Tv Shows found!</div>
  <div v-else>
    <TvShowsCarouselByGenre
      @imageIsClicked="showModal"
      v-for="genre in allGenres"
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
      tvShow: {},
      isLoaded: false,
      isModalVisible: false,
    };
  },
  mounted() {
    this.getTvShowsByGenres();
  },
  computed: {
    ...mapState({
      tvShows: (state) => state.TvShow.tvShows,
    }),
    allGenres() {
      return this.tvShows.reduce((allGenres, show) => {
        for (const genre of show.genres) {
          allGenres.add(genre);
        }
        return allGenres;
      }, new Set());
    },
    tvShowsByGenre() {
      return (genre) => {
        return this.tvShows
          .filter((tvShow) => {
            return tvShow.genres.some((gr) => gr.includes(genre));
          })
          .sort(
            (tvShow1, tvShow2) =>
              tvShow2.rating.average - tvShow1.rating.average
          );
      };
    },
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
      this.isModalVisible = true;
      this.tvShow = tvShow;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
