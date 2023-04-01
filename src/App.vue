<template>
  <div id="app">
    <NavBar></NavBar>
    <!-- <router-view></router-view> -->
    <HomePage />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import HomePage from "./views/HomePage.vue";

export default {
  name: "App",
  components: { HomePage, NavBar },
};
</script>

<style lang="scss">
body {
  background-color: #000000;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* #app {
  width: 100%;
  height: 100%;
} */
</style>
