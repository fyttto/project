<template>
 <div class="btnTolog">
  <span @click='clickItem'>
    <el-button type="primary" round>已有账号，去登陆<i class="el-icon-right el-icon--right"></i></el-button>
  </span>
</div>
</template>

<script>
export default {
    name:'tologin',
    methods: {
    clickItem() {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style>
    .btnTolog{
  width: 7rem;
  height: 4rem;
position: absolute;
top: 1em;
left: 1em;

}
</style>