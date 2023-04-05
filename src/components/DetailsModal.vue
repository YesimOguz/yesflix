<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        @click.stop
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
              :src="tvShow.image.medium"
              class="img"
              :alt="tvShow.name"
            />
          </div>

          <div v-if="tvShow && tvShow.rating" class="tv-content">
            <h2 class="tv-title">{{ tvShow.name }}</h2>
            <p class="tv-rating">{{ tvShow.rating.average }}/10</p>
            <div class="tv-summary" v-html="tvShow.summary"></div>
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
export default {
  name: "DetailsModal",
  props: { tvShow: { type: Object } },
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
  background-color: rgba(69, 69, 69, 0.95);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  max-width: 90%;
  max-height: 90%;
  padding: 2rem;
  position: relative;
  border-radius: 5px;
}

.btn-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
  color: #737373;
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
}

.tv-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 2rem;
}

.img-container {
  width: 40%;
  margin-right: 2rem;
}

.img {
  max-width: 100%;
  height: auto;
}

.tv-content {
  width: 60%;
}

@media screen and (max-width: 767px) {
  .tv-details {
    flex-direction: column;
    align-items: center;
  }

  .img-container {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .tv-content {
    width: 100%;
  }
}

.tv-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1rem;
  color: #ffffff;
}

.tv-rating {
  font-size: 1.5rem;
  text-align: left;
  margin-bottom: 1rem;
  color: #d6d6d6;
}

.tv-summary {
  font-size: 1.4rem;
  text-align: justify;
  margin-bottom: 1rem;
  color: #ffffff;
  line-height: 1.5;
}

.tv-info {
  font-size: 1.4rem;
  text-align: left;
  margin-bottom: 1rem;
  color: #d6d6d6;
}

@media screen and (min-width: 768px) {
  .modal {
    max-width: 50%;
    max-height: 80%;
  }
}
</style>
