<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
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
</style>
