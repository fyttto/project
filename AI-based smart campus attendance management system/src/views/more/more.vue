<template>
  <div class="bac_block">
    <selectinputOfpurchCrad></selectinputOfpurchCrad>
    <el-divider content-position="right" class="textInLine">选择查询范围即可查看数据哦</el-divider>
    <router-view></router-view>
  </div>
</template>

<script>
import selectinputOfpurchCrad from "./component/selectinputOfpurchCard";
export default {
  name: "more",
  data() {
    return {};
  },
  methods: {},
  components: { selectinputOfpurchCrad },
};
</script>

<style>
@import "./css/purchcard.css";
</style>
