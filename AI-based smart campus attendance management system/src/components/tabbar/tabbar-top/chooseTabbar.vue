<template>
<div>
  <el-menu :default-active="this.$route.path" router class="el-menu-demo main-tabbar" mode="horizontal" @select="handleSelect" background-color="rgb(49,49,49)" text-color="#fff" active-text-color="#fff">
    <el-menu-item class="dd" index="/home">数据分析</el-menu-item>
    <el-menu-item class="aa" index="/record">数据展示</el-menu-item>
    <el-menu-item class="aa" index="/about">学生情况</el-menu-item>
    <el-menu-item class="aa" index="/#">上课情况</el-menu-item>
    <el-menu-item class="aa" index="/#">数据分析</el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  name: 'chooseTabbar'

}
</script>

<style>

</style>
