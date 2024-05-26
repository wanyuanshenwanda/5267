<template>
  <div id="app">
    <Navbar v-if="$route.meta.showNavbar" />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./views/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
