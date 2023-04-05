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
          <TvShowCard
            :tvShow="tvShow"
            :classForCarousel="{
              current: isCurrent,
              onLeft: leftIndex >= 0,
              onRight: rightIndex >= 0,
            }"
            :dataIndex="index"
            @clickedImage="imageClicked(tvShow)"
          />
        </template>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import TvShowCard from "../components/TvShowCard.vue";

export default {
  components: { TvShowCard },
  props: {
    tvShows: { type: Array, default: () => [] },
    title: { type: String },
  },
  methods: {
    imageClicked(tvShow) {
      this.$emit("imageIsClicked", tvShow);
    },
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
    background-color: #000000;
  }
}
</style>
