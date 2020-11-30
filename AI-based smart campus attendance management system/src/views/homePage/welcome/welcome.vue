<template>
  <div class="myContainer">
    <el-container>
      <!-- 顶栏 -->
      <el-header height="60px" style="padding: 0">
        <tabbar-top />
      </el-header>
      <!-- 嵌套容器 -->
      <el-container>
        <!-- 侧边导航菜单 -->
        <el-aside style="width: auto !important">
          <tabbarLeft />
        </el-aside>
        <!-- 内容 -->
        <el-main class="mainClass">
          <!--主要内容-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import tabbarTop from "@/components/tabbar/tabbar-top/tabbar-top";
import tabbarLeft from "@/./components/tabbar/tabbar-left/tabbar-left";

export default {
  name: "welcome",
  data() {
    return {
      myWidth: "200",
    };
  },
  components: {
    tabbarTop,
    tabbarLeft,
  },
};
</script>

<style>
#app,
html,
body,
.myContainer,
.el-container {
  height: 100%;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.mainClass {
  background-color: #e4eeec;
}
</style>
