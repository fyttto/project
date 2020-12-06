<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu :default-active="this.$route.path" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-radio-group v-model="isCollapse" size="small" style="position: relative; top: 3px; left: 1px; bottom: 0">
            <el-radio-button :label="true">收起</el-radio-button>
            <el-radio-button :label="false">展开</el-radio-button>
          </el-radio-group>
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/search">
            <i class="el-icon-search"></i>
            <span slot="title">缺勤查询</span>
          </el-menu-item>
          <el-menu-item index="/more">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">打卡查询</span>
          </el-menu-item>
          <el-menu-item index="/having-class">
            <i class="el-icon-school"></i>
            <span slot="title">上课信息</span>
          </el-menu-item>
          <el-menu-item index="/info">
            <i class="el-icon-user-solid"></i>
            <span slot="title">账号信息</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "tabbar_left",
  data() {
    return {
      isCollapse: true,
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style></style>
