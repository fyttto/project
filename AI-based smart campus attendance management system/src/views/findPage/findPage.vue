<template>
  <div class="bac_block">
    <selectInput />
    <el-divider content-position="right" class="textInLine">选择查询范围即可查看数据哦</el-divider>
    <router-view></router-view>
  </div>
</template>

<script>
import selectInput from "../findPage/component/selectInput";
export default {
  name: "findPage",
  components: {
    selectInput,
  },
};
</script>

<style>
@import "./css/findPage.css";
</style>
