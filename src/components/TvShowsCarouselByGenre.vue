<template>
  <div class="tvShows">
    <h1 class="title">{{ title }}</h1>
    <carousel-3d
      :width="315"
      :height="550"
      :controls-visible="true"
      :display="9"
      :clickable="false"
    >
      <slide v-for="(tvShow, i) in tvShows" :index="i" :key="tvShow.id">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
          <router-link
            :to="{ name: 'tvShowDetails', params: { id: tvShow.id } }"
          >
            <img
              @click="clickImage(tvShow)"
              :src="tvShow.image.medium"
              class="img"
              :alt="tvShow.name"
              :data-index="index"
              :class="{
                current: isCurrent,
                onLeft: leftIndex >= 0,
                onRight: rightIndex >= 0,
              }"
            />
            <VueStarRating
              :rating="tvShow.rating.average / 2"
              :read-only="true"
              :increment="0.01"
              :star-size="30"
              :show-rating="false"
              class="star-rating"
            ></VueStarRating>
          </router-link>

          <!-- <DetailsModal v-show="isModalVisible" @close="closeModal"
            ><template v-slot:header> This is a new modal header. </template>

            <template v-slot:body> This is a new modal body. </template>

            <template v-slot:footer>
              This is a new modal footer.
            </template></DetailsModal
          > -->
        </template>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
//import TvShowCard from "../components/TvShowCard.vue";
import VueStarRating from "vue-star-rating";
//import DetailsModal from "./DetailsModal.vue";

export default {
  components: { VueStarRating },
  // data() {
  //   return {
  //     isModalVisible: false,
  //   };
  // },
  props: {
    tvShows: { type: Array, default: () => [] },
    title: { type: String },
  },
  methods: {
    clickImage(tvShow) {
      console.log("emitting");
      this.$emit("clickedImage", tvShow);
    },
    // showModal() {
    //   this.isModalVisible = true;
    // },
    // closeModal() {
    //   this.isModalVisible = false;
    // },
  },
};
</script>

<style lang="scss">
.title {
  color: #ffff;
}
.carousel-3d-container {
  .carousel-3d-controls {
    .next,
    .prev {
      color: #ffff;
    }
  }
  .carousel-3d-slide {
    background-color: black;
    .img {
      width: 100%;
      height: 442px;
      left: 0;
    }
    .star-rating {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0.5rem;
    }
  }
}
</style>
