<template>
  <div>
    <!--信息展示页-->
    <div>
      <!--标题文字-->
      <el-row>
        <el-col :span="3" :offset="1">
          <div class="infoText">
            <span>账号信息</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <div class="line-text">
        <el-divider></el-divider>
      </div>
    </el-row>
    <!--主要内容-->

    <!--姓名-->
    <el-row class="lab">
      <el-col :span="1" :offset="2" class="label_Before">
        <div>姓名：</div>
      </el-col>
      <el-col :span="1" class="text_label">
        <div>{{ this.info.adminName }}</div>
      </el-col>
    </el-row>
    <!--电话-->
    <el-row class="lab">
      <el-col :span="1" :offset="2" class="label_Before">
        <div>电话：</div>
      </el-col>
      <el-col :span="1" class="text_label">
        <div>{{ this.info.telephone }}</div>
      </el-col>
    </el-row>
    <!--邮箱-->
    <el-row class="lab">
      <el-col :span="1" :offset="2" class="label_Before">
        <div>邮箱：</div>
      </el-col>
      <el-col :span="1" class="text_label">
        <div>{{ this.info.email }}</div>
      </el-col>
    </el-row>
    <!--身份-->
    <el-row class="lab">
      <el-col :span="1" :offset="2" class="label_Before">
        <div>身份：</div>
      </el-col>
      <el-col :span="1" class="text_label">
        <div>{{ this.info.roleId }}</div>
      </el-col>
    </el-row>
    <!--工号-->
    <el-row class="lab">
      <el-col :span="1" :offset="2" class="label_Before">
        <div>工号</div>
      </el-col>
      <el-col :span="1" class="text_label">
        <div>{{ this.info.teacherNo }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "showinfo",
  data() {
    return {
      info: {},
    };
  },
  created() {
    // console.log(this.$store.state.user);
    this.info = JSON.parse(this.$store.state.user);
    this.changeWord(this.info);
  },
  methods: {
    changeWord(info) {
      if (info.roleId == "1") {
        info.roleId = "管理员";
      }
      for (let key in info) {
        if (info[key] == null) {
          info[key] = "未填写";
        }
        console.log(info[key]);
      }
    },
  },
};
</script>

<style>
@import "./css/showinfo.css";
</style>
