<template>
<div class="btnToreg">
  <span @click='clickItem'>
    <el-button type="primary" round> 第一次来，去注册<i class="el-icon-right el-icon--right"></i></el-button>
  </span>
</div>
</template>

<script>
export default {
  name: 'toRegister',
  methods: {
    clickItem() {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>

<style>
.btnToreg {
  width: 10rem;
  height: 3rem;
  position: absolute;
  top: 1em;
  left: 1em;
}
</style>
