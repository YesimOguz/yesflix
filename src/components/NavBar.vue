<template>
  <header class="header">
    <router-link :to="{ name: 'tvShows' }" class="link">YESFLIX</router-link>
    <div class="search-logout">
      <div class="search-bar">
        <input
          type="text"
          class="search"
          v-model="search"
          placeholder="Search shows..."
        />
        <img
          alt="Search Icon"
          @click="toggleSearch"
          src="../assets/icons/searchIcon.svg"
        />
      </div>
      <button v-if="user" @click="$store.dispatch('logout')" class="logout">
        Logout
      </button>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  watch: {
    // This function sets a timer to delay searching for tv shows until the user stops typing in the search bar.
    // Then dispatches the searchTvShows action.
    search() {
      clearTimeout(this.searchTimer);
      if (this.search) {
        this.searchTimer = setTimeout(() => {
          this.$store.dispatch("searchTvShows", this.search).catch(() => {
            this.$notify({
              type: "error",
              text: "Something went wrong!",
            });
          });
          this.$router.push({
            name: "searchedTvShows",
            params: { name: this.search },
          });
        }, 1000);
      } else {
        this.$router.push({
          name: "tvShows",
        });
      }
    },
  },
  mounted() {
    if (this.$route.params.name) {
      this.$store
        .dispatch("searchTvShows", this.$route.params.name)
        .catch(() => {
          this.$notify({
            type: "error",
            text: "Something went wrong!",
          });
        });
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.Auth.user,
    }),
  },
  methods: {
    toggleSearch() {
      const searchInput = this.$el.querySelector(".search");
      searchInput.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: #ffffff;
  position: relative;
}

.link {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #ff0000;
}

.search-logout {
  display: flex;
  align-items: center;
}

.search-bar {
  position: relative;
}

.search {
  height: 2rem;
  padding-left: 2.5rem;
  border: none;
  background-color: transparent;
  color: #ffffff;
  width: 0;
  transition: width 0.2s ease-out;
}

.search:focus {
  width: 15rem;
}

img {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
}
.logout {
  background: none !important;
  border: none;
  padding: 0 !important;
  color: #ffffff;
  margin: 0 16px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
}

@media only screen and (max-width: 768px) {
  .header {
    flex-direction: column;
  }

  .link {
    margin-bottom: 1rem;
  }

  .search {
    padding-left: 2rem;
    width: 15rem;
    transition: none;
  }

  img {
    left: 1rem;
  }
}
</style>
