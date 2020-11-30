<template>
  <div class="select_class">
    <el-row>
      <el-col :span="3" :offset="2">
        <el-select v-model="gradeId" placeholder="请选择年级" class="grade_box">
          <el-option v-for="item in grade_list" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select v-model="collegeId" placeholder="请选择院系" class="college_box">
          <el-option v-for="item in college_list" :key="item.coloegeId" :label="item.collegeName" :value="item.collegeId"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select v-model="classId" placeholder="请选择班级" class="class_box">
          <el-option v-for="item in class_list" :key="item.classId" :label="item.className" :value="item.classId"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button icon="el-icon-search" type="primary" @click="showClassData">查询</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>
import { havingClass, college, class_name, grade } from "../../../api/index";
// import qs from "qs";
export default {
  name: "selectofClass",
  data() {
    return {
      subjectNow: [],
      subjectFutrue: [],
      value: "",
      age: "",
      gradeId: "",
      classId: "",
      collegeId: "",
      grade_list: [],
      college_list: [],
      class_list: [],
      url_college: "/college/colleges",
      url_class: "/class/classes",
      new_url: {
        url_college: "",
        url_class: "",
      },
    };
  },
  methods: {
    // 年级获取
    getGrade() {
      grade().then((res) => {
        this.grade_list = res.extend.grades;
      });
    },

    // 获取班级
    getClass(url) {
      return new Promise((resolve, reject) => {
        class_name(url).then((res) => {
          this.class_list = res.extend.classes;
          console.log("班级更新");
        });
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    },
    // 获取学院
    getCollege(url) {
      return new Promise((resolve, reject) => {
        college(url).then((res) => {
          this.college_list = res.extend.colleges;
          console.log(res.extend.colleges);
          console.log("学院更新");
        });
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    },
    handleChange(value) {
      console.log(value);
    },
    // 数据筛选
    showClassData() {
      this.value = `/subject/now/${this.gradeId}/${this.collegeId}/${this.classId}`;
      if (this.value != "") {
        havingClass(this.value)
          .then((res) => {
            console.log(res);
            this.subjectNow = res.extend.subjectNow;
            // console.log(this.subjectNow);
            this.$store.commit("GET_SUBJECTNOW", this.subjectNow);
            // console.log(this.$store.state.subjectNow);
            this.$message({
              message: "数据获取成功",
              type: "success",
            });
          })
          .catch((err) => {
            this.$message({
              message: "数据获取失败",
              type: "error",
            });
            console("获取失败");
          });
      } else {
        this.$message({
          message: "请先进行选择之后在进行查询哦",
        });
      }
      let flag = false;
      this.$emit("listenTomyboy", flag);
      setTimeout(() => {
        let flag = true;
        this.$emit("listenTomyboy", flag);
      }, 1000);
    },
  },
  mounted() {
    this.getGrade();
  },
  watch: {
    gradeId(newVal, oldVal) {
      this.new_url.url_college = this.gradeId;
      this.getCollege(`${this.url_college}/${this.new_url.url_college}`)
        .then((res) => {
          // console.log(res);
          if (this.college_list != []) {
            this.$message({
              message: "学院获取成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "学院获取失败" + err,
            type: "error",
          });
        });
    },
    collegeId(newVal, oldVal) {
      this.new_url.url_class = this.collegeId;
      this.getClass(`${this.url_class}/${this.new_url.url_class}`)
        .then((res) => {
          if (this.class_list != []) {
            this.$message({
              message: "班级获取成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "班级获取失败" + err,
            type: "error",
          });
        });
    },
  },
};
</script>

<style>
@import "../css/selectofClass.css";
</style>
