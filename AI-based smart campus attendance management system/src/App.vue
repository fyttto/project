<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  // mounted() { //默认跳转到首页
  //   this.$router.push("/home");
  // }
};
</script>

<style>
@import "../src/assets/css/normalize.css";
</style>
