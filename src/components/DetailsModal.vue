<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <button
          type="button"
          class="btn-close"
          @click="close"
          aria-label="Close modal"
        >
          x
        </button>

        <div class="tv-details">
          <div class="img-container">
            <img
              v-if="tvShow.image"
              :src="tvShow.image.original"
              class="img"
              :alt="tvShow.name"
            />
          </div>

          <div v-if="tvShow && tvShow.rating" class="tv-content">
            <h2 class="tv-title">{{ tvShow.name }}</h2>
            <p class="tv-rating">{{ tvShow.rating.average }}/10</p>
            <p class="tv-summary">{{ tvShow.summary }}</p>
            <p class="tv-info">Language: {{ tvShow.language }}</p>
            <p class="tv-info">Genres: {{ tvShow.genres.join(", ") }}</p>
            <p class="tv-info">Status: {{ tvShow.status }}</p>
            <p class="tv-info">Runtime: {{ tvShow.runtime }} minutes</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "DetailsModal",
  props: { tvShow: { type: Object } },
  //   computed: {
  //     ...mapState({
  //       tvShow: (state) => state.TvShow.tvShow,
  //     }),
  //   },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

.modal {
  background: #302d2d;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  max-width: 90%;
  max-height: 90%;
  padding: 2rem;
  position: relative;
}

.btn-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
}

.tv-details {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2rem;
}

.img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50%;
  margin-right: 2rem;
}

.img {
  max-width: 50%;
  height: auto;
}

.tv-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.tv-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1rem;
}

.tv-rating {
  font-size: 1.2rem;
  text-align: left;
  margin-bottom: 1rem;
}

.tv-summary {
  font-size: 1.2rem;
  text-align: justify;
  margin-bottom: 1rem;
}

.tv-info {
  font-size: 1.2rem;
  text-align: left;
  margin-bottom: 1rem;
}

@media screen and (min-width: 768px) {
  .modal {
    max-width: 50%;
    max-height: 80%;
  }
}
</style>
