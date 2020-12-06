<template>
<div class="wscn-http404-container">
  <div class="wscn-http404">
    <div class="pic-404">
      <img class="pic-404__parent" src="@/assets/404_images/404.png" alt="404">
      <img class="pic-404__child left" src="@/assets/404_images/404_cloud.png" alt="404">
      <img class="pic-404__child mid" src="@/assets/404_images/404_cloud.png" alt="404">
      <img class="pic-404__child right" src="@/assets/404_images/404_cloud.png" alt="404">
    </div>

    
    <div class="bullshit">
      <div class="bullshit__oops">OOPS!</div>
      <div class="bullshit__info">All rights reserved
        <a style="color:#20a0ff" href="https://wallstreetcn.com" target="_blank">wallstreetcn</a>
      </div>
      <div class="bullshit__headline">{{ message }}</div>
      <div class="bullshit__info">Please check that the URL you entered is correct, or click the button below to return to the homepage.</div>
      <a href="" class="bullshit__return-home">Back to home</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>

<style>
  @import './css/notFound.css';
</style>