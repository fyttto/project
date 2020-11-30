<template>
  <div class="back_img">
    <toRegister></toRegister>
    <div class="container" id="container" :class="{ 'right-panel-active': isClick }">
      <div class="form-container sign-up-container">
        <div class="form-block stulogin">
          <div class="login-form">
            <div class="input-user">
              <el-input prefix-icon="el-icon-s-check" placeholder="请输入学号" v-model="student.userName" style="width: 20vw" name="stu_name"></el-input>
            </div>
            <div class="input-pass">
              <el-input prefix-icon="el-icon-tickets" placeholder="请输入密码" v-model="student.password" style="width: 20vw" show-password name="stu_ps"> </el-input>
            </div>
            <div class="btn-login">
              <el-button type="primary" round @click.native="login_stu" :loading="isBtnLoading">登录</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-container sign-in-container">
        <div class="form-block">
          <div class="login-form">
            <div class="input-user">
              <el-input prefix-icon="el-icon-s-check" placeholder="请输入工号" ref="admLoginName" v-model="admin.userName" style="width: 20vw" name="admin_na"></el-input>
            </div>
            <div class="input-pass">
              <el-input prefix-icon="el-icon-tickets" placeholder="请输入密码" ref="admLoginPass" v-model="admin.password" style="width: 20vw" show-password name="admin_ps"></el-input>
            </div>
          </div>
          <div class="input-login">
            <el-button type="primary" round @click.native="login_adm" :loading="isBtnLoading">登录</el-button>
          </div>
        </div>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 class="textstu">老师，来这~~</h1>
            <el-button icon="el-icon-link " round type="primary" class="ghost" @click="signInClick" @>管理员登录</el-button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 class="textadmin">同学，来这~~</h1>
            <el-button icon="el-icon-link " round type="primary" class="ghost" ref="stuLogin" @click="signUpClick">学生登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginStu, loginadmin } from "@/api/index";
import { mapMutations } from "vuex";
import toRegister from "./toRegister";

export default {
  name: "loginbox",
  components: {
    toRegister,
  },
  data() {
    return {
      isClick: false,
      student: {
        userName: "",
        password: "",
      },
      admin: {
        userName: "",
        password: "",
      },
      isBtnLoading: false,
      timer: null,
    };
  },

  methods: {
    ...mapMutations({
      SET_TOKEN: "SET_TOKEN",
    }),
    signUpClick: function () {
      //向左滑
      this.isClick = true;
      (this.admin.userName = ""), (this.admin.password = "");
    },

    signInClick() {
      //像右滑
      this.isClick = false;
      // console.log(this.$refs.stuLogin.value);
      (this.student.userName = ""), (this.student.password = "");
    },

    login_stu() {
      //学生登陆
      //登陆验证
      let reg = /^\d{8}|1[3578]\d{9}$/;
      if (reg.test(this.student.userName)) {
        console.log("账号合法");
      } else {
        this.$message({
          message: "请输入一个合法的账号",
        });
      }
      if (!this.student.password) {
        this.timer = window.setTimeout(() => {
          this.$message({
            message: "请输入密码",
          });
        }, 0);
      }

      loginStu(this.student)
        .then((res) => {
          // res.extend.token;
          // console.log(res);

          if (res.data.status == "2000") {
            // console.log('传入数据成功')
            // this.SET_TOKEN(res.data.extend.token)
            // let token_data = res.extend.token

            // window.sessionStorage.setItem('token', token_data)
            // setTimeout(() => {
            //   console.log('------------1Vuex')
            //   console.log(this.$store.state.token)
            // }, 500)
            // console.log(res.data.extend);
            console.log("登陆成功");
            console.log(res.data.extend);
            var userName = JSON.stringify(res.data.extend.admin);
            this.$store.commit("SET_TOKEN", res.data.extend.token);
            this.$store.commit("GET_USER", userName);
            console.log(userName);
            // window.sessionStorage.setItem("token", res.data.extend.token);
            // window.sessionStorage.setItem("user", JSON.stringify(res.data.extend.user));
            setTimeout(() => {
              this.$router.push({
                path: "/welcome",
              });
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // setTimeout(() => {
      //   console.log('----------1');
      //   console.log(window.sessionStorage['token'])
      // }, 1000)
      // console.log("----------2缓存");
      // console.log(window.sessionStorage["token"]);

      // setTimeout(() => {
      //   console.log(123)
      //   console.log(this.$store.state.token)
      // }, 500)
    },
    login_adm() {
      //管理员登陆
      let reg = /^\d{8}|1[3578]\d{9}$/;
      if (reg.test(this.admin.userName)) {
        console.log("账号合法");
      } else {
        this.$message({
          message: "请输入一个合法的账号",
        });
      }
      if (!this.admin.password) {
        this.timer = window.setTimeout(() => {
          this.$message({
            message: "请输入密码",
          });
        }, 0);
      }
      loginadmin(this.admin);
      // setTimeout(() => {
      //   this.SET_TOKEN(window.sessionStorage.getItem('token'))
      // }, 500)
    },
  },
};
</script>

<style>
@import "../../../../assets/css/style.css";
</style>
