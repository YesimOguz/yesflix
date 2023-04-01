<template>
  <div class="tvShow-card">
    <router-link
      :to="{ name: 'tvShowDetails', params: { id: tvShow.show.id } }"
    >
      <img
        :src="tvShow.show.image.medium"
        class="img"
        :alt="tvShow.show.name"
      />
    </router-link>
    <input
      class="rating"
      max="5"
      oninput="this.style.setProperty('--value', `${tvShow.show.rating}`)"
      step="0.5"
      style="--value: 2.5"
      type="range"
      value="2.5"
    />
  </div>
</template>

<script>
export default {
  props: {
    tvShow: {
      type: Object,
      default: () => ({
        show: {
          id: null,
          image: null,
          rating: null,
        },
      }),
    },
  },
};
</script>

<style lang="scss">
.tvShow-card {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }

  .img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}
</style>
