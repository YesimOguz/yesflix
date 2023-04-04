<template>
  <div id="app">
    <notifications />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
