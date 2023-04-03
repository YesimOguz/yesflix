<template>
  <div class="tvShows">
    <div v-for="tvShow in searchedTvShow" :key="tvShow.show.id" class="tvShow">
      <TvShowCard @clickedImage="showModal" :tvShow="tvShow.show" />
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
      searchedTvShow: (state) => state.TvShow.searchedTvShow,
    }),
  },
  created() {
    console.log("zzz", this.searchedTvShow);
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
  margin: 0 auto;
  //gap: 60px;
  margin: 30px 0;

  .tvShow {
    width: 100%;
    padding: 80px;
    box-sizing: border-box;

    @media (min-width: $small-screen) {
      width: calc(100% / 2);
    }

    @media (min-width: $medium-screen) {
      width: calc(100% / 3);
    }

    @media (min-width: $large-screen) {
      width: calc(100% / 4);
    }
  }
}
</style>
