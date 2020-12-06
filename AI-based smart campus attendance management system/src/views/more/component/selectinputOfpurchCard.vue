<template>
  <div class="selectTop">
    <el-row :gutter="24">
      <el-col :offset="2" :span="3">
        <el-select v-model="gradeId" filterable placeholder="请选择年级">
          <el-option v-for="item in grade_list" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="collegeId" filterable placeholder="请选择院系">
          <el-option v-for="item in college_list" :key="item.collegeId" :label="item.collegeName" :value="item.collegeId"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="classId" filterable placeholder="请选择班级">
          <el-option v-for="item in class_list" :key="item.classId" :label="item.className" :value="item.classId"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-date-picker v-model="day" type="date" placeholder="选择日期"> </el-date-picker>
      </el-col>

      <el-col :span="3">
        <el-button type="success" plain icon="el-icon-search" @click="searchInf">迟到打卡查询</el-button>
      </el-col>

      <el-col :span="3">
        <el-button type="success" plain icon="el-icon-search" @click="searchNormal">正常打卡查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { havingClass, college, class_name, grade, Class, purchCardClass } from "../../../api/index";
// import { }
export default {
  name: "selectinputOfpurchCrad",
  data() {
    return {
      day: "2020-11-02",
      age: "",
      gradeId: "0",
      classId: "0",
      collegeId: "0",
      schoolTime: "",
      classNum: "",
      grade_list: [],
      college_list: [],
      class_list: [],
      url_college: "/college/colleges",
      url_class: "/class/classes",
      getdaypurchCard: "admin/day/records",
      classNum_list: [],
      new_url: {
        url_college: "",
        url_class: "",
      },
      url_find: "",
      form_class: {
        date: "",
        gradeId: "",
        collegeId: "",
        classId: "",
      },
    };
  },

  methods: {
    searchInf() {
      this.dateChage(this.day);
      this.form_class.date = this.day;
      this.form_class.gradeId = this.gradeId;
      this.form_class.collegeId = this.collegeId;
      this.form_class.classId = this.classId;
      console.log(this.form_class);
      purchCardClass(this.getdaypurchCard, this.form_class)
        .then((res) => {
          //   console.log(res.data.extend.normal);
          this.$store.commit("GET_PURCHDATA", res.data.extend.last);
          // console.log(res);
          // if (res == "4000") {
          //   // this.$message({
          //   //   message: res.extend.error,
          //   // });
          // }
          // 请求获取数据;
          this.$router.push("/more/showTable");
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    searchNormal() {
      this.dateChage(this.day);
      this.form_class.date = this.day;
      this.form_class.gradeId = this.gradeId;
      this.form_class.collegeId = this.collegeId;
      this.form_class.classId = this.classId;
      console.log(this.form_class);
      purchCardClass(this.getdaypurchCard, this.form_class)
        .then((res) => {
          console.log(res.data.extend.normal);
          this.$store.commit("GET_NORMALDATA", res.data.extend.normal);
          // console.log(res);
          // if (res == "4000") {
          //   // this.$message({
          //   //   message: res.extend.error,
          //   // });
          // }
          // 请求获取数据;
          this.$router.push("/more/normalPurchCard");
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    getGrade() {
      grade().then((res) => {
        this.grade_list = res.extend.grades;
        console.log("年级获取成功");
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
    dateChage(date) {
      var d = new Date(date);
      this.day = d.toJSON().split("").splice(0, 10).join("");
    },
  },
  watch: {
    gradeId(newVal, oldVal) {
      this.new_url.url_college = this.gradeId;
      this.getCollege(`${this.url_college}/${this.new_url.url_college}`)
        .then((res) => {
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
  mounted() {
    this.getGrade();
  },
};
</script>

<style>
@import "../css/selectInputOfpurchCard.css";
</style>
