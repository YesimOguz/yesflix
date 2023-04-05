<template>
  <div class="tvShows">
    <div
      v-for="tvShow in searchedTvShows"
      :key="tvShow.show.id"
      :class="[tvShow.show.image !== null ? 'tvShow' : 'noTvShow']"
    >
      <TvShowCard
        v-if="tvShow.show.image !== null"
        @clickedImage="showModal"
        :tvShow="tvShow.show"
      />
    </div>
    <DetailsModal
      v-show="isModalVisible"
      @close="closeModal"
      :tvShow="tvShow"
    ></DetailsModal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TvShowCard from "../components/TvShowCard.vue";
import DetailsModal from "../components/DetailsModal.vue";

export default {
  components: { TvShowCard, DetailsModal },
  data() {
    return {
      isModalVisible: false,
      tvShow: {},
    };
  },
  computed: {
    ...mapState({
      searchedTvShows: (state) => state.TvShow.searchedTvShows,
    }),
  },
  methods: {
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

<style lang="scss">
$large-screen: 1024px;
$medium-screen: 768px;
$small-screen: 576px;

.tvShows {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;

  .tvShow {
    padding: 80px;
    box-sizing: border-box;
  }
  .noTvShow {
    width: 0;
    height: 0;
  }
}
</style>
