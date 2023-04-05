<template>
  <div class="tvShow-card">
    <img
      v-if="tvShow.image"
      @click="clickImage(tvShow)"
      :src="tvShow.image.medium"
      class="img"
      :alt="tvShow.name"
      :data-index="dataIndex || null"
      :class="classForCarousel || {}"
    />
    <VueStarRating
      v-if="tvShow.rating"
      :rating="tvShow.rating.average / 2"
      :read-only="true"
      :increment="0.01"
      :star-size="30"
      :show-rating="false"
      class="star-rating"
    ></VueStarRating>
  </div>
</template>

<script>
import VueStarRating from "vue-star-rating";
export default {
  components: { VueStarRating },
  props: {
    dataIndex: { type: Number, required: false },
    classForCarousel: { required: false, type: Object, default: () => ({}) },
    tvShow: {
      type: Object,
      default: () => ({
        id: null,
        image: null,
        rating: null,
      }),
    },
  },
  methods: {
    clickImage(tvShow) {
      console.log("emitting");
      //this.$store.dispatch("getTvShow", tvShow.id);
      this.$emit("clickedImage", tvShow);
    },
  },
};
</script>

<style lang="scss">
.img {
  width: 100%;
  height: 442px;
  left: 0;
}
.star-rating {
  //position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
}
</style>
