<template>
  <div class="tabbar">
    <div class="tabbar-logo-text">
      <div class="tabbar-logo"><img class="logo-img" src="@/assets/img/logo.png" alt="" /></div>
      <div class="tabbar-text">AI考勤</div>
    </div>

    <div class="tabbar-avatar">
      <div @click="imgClick">
        <el-avatar class="avatar-img" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">修改密码</el-dropdown-item>
          <el-dropdown-item command="b">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar-top",
  data() {
    return {
      count: 0,
      userName: "张三",
      isOpenLeft: true,
    };
  },
  methods: {
    changeOpen() {
      if (this.count % 2 == 1) {
        this.$refs.icon_model.className = "el-icon-s-fold";
        this.isOpenLeft = true;
        this.count++;
      } else if (this.count % 2 == 0) {
        this.$refs.icon_model.className = "el-icon-s-unfold";
        this.isOpenLeft = false;
        this.count++;
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command == "a") {
        this.$message({
          message: "暂不支持修改密码",
          type: "error",
        });
      } else if (command == "b") {
        this.$message({
          message: "注销成功",
          type: "success",
        });
        // console.log('退出登录成功');
      }
    },
    imgClick() {
      this.$router.push({
        path: "/info",
      });
      // console.log('查看个人信息')
      this.$message("个人信息");
      // 此处未加防抖
    },
  },
};
</script>

<style>
@import "../../../assets/css/tabbar.css";
</style>
