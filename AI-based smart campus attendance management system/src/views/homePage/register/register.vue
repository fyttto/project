<template>
  <div class="stu_reg">
    <toLogin />
    <div class="reg_box">
      <el-row class="form_reg">
        <el-form ref="form" :model="form" status-icon label-width="80px" :span="10" :rules="rules">
          <el-form-item label="姓名" prop="userName">
            <el-col :span="8">
              <el-input v-model="form.userName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-col :span="8">
              <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-col :span="8">
              <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="电话" prop="telephone">
            <el-col :span="8">
              <el-input v-model="form.telephone"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="E-mail">
            <el-col :span="8">
              <el-input v-model="form.email"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="inline_box">
            <div>
              <el-form-item label="年龄" prop="age">
                <el-col :span="19">
                  <el-select v-model="form.age" placeholder="请选择年龄" class="age_box">
                    <el-option v-for="item in age_list" :key="item.value" :label="item.label" :value="item.label"> </el-option>
                  </el-select>
                </el-col>
              </el-form-item>

              <el-form-item label="年级" prop="gradeId">
                <el-col :span="19">
                  <el-select v-model="form.gradeId" placeholder="请选择年级" class="grade_box">
                    <el-option v-for="item in grade_list" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"> </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="班级" prop="classId" class="class_box">
                <el-col :span="19">
                  <el-select v-model="form.classId" placeholder="请选择班级">
                    <el-option v-for="item in class_list" :key="item.classId" :label="item.className" :value="item.classId"> </el-option>
                  </el-select>
                </el-col>
              </el-form-item>

              <el-form-item label="院系" prop="collegeId" class="college_box">
                <el-col :span="19">
                  <el-select v-model="form.collegeId" placeholder="请选择学院">
                    <el-option v-for="item in college_list" :key="item.coloegeId" :label="item.collegeName" :value="item.collegeId"> </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="学号" prop="studentNo">
            <el-col :span="8">
              <el-input v-model="form.studentNo"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-col :span="8">
              <el-input v-model="form.code"></el-input>
            </el-col>
          </el-form-item>
          <el-image :src="url" :fit="fit" class="img_code" @click="getVerityImg"></el-image>

          <el-form-item>
            <el-button class="reg_btn" type="primary" @click="onSubmit('form')">立即注册</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import toLogin from "../register/component/toLogin";
import { register, college, class_name, grade } from "@/api/index";
export default {
  name: "register",
  components: {
    toLogin,
  },
  data() {
    var validatePass = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      form: {
        userName: "",
        password: "",
        checkPass: "",
        telephone: "",
        email: "",
        sex: "",
        age: "",
        gradeId: "",
        classId: "",
        collegeId: "",
        studentNo: "",
        code: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入你的真实姓名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在3-5个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        telephone: [
          {
            required: true,
            message: "请输入你的电话",
            trigger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "请输入正确格式的电话",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "请选择你的年龄",
            trigger: "blur",
          },
        ],
        classId: [
          {
            required: true,
            message: "请选择你的班级",
            trigger: "blur",
          },
        ],
        gradeId: [
          {
            required: true,
            message: "请选择你的年级",
            trigger: "blur",
          },
        ],
        collegeId: [
          {
            required: true,
            message: "请选择你的学院",
            trigger: "blur",
          },
        ],
        studentNo: [
          {
            required: true,
            message: "请输入你的学号",
            trigger: "blur",
          },
          {
            min: 8,
            max: 8,
            message: "长度为8个字符",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
          {
            min: 4,
            max: 6,
            message: "长度为8个字符",
            trigger: "blur",
          },
        ],
      },
      age_list: [
        {
          value: "1",
          label: "17",
        },
        {
          value: "2",
          label: "18",
        },
        {
          value: "3",
          label: "19",
        },
        {
          value: "4",
          label: "20",
        },
        {
          value: "5",
          label: "21",
        },
        {
          value: "6",
          label: "22",
        },
      ],
      grade_list: [],
      class_list: [],
      college_list: [],
      url: "",
      fit: "fill",
      stream: "stream",
      old_url: {
        url_college: "/college/colleges",
        url_class: "/class/classes",
      },
      new_url: {
        url_college: "",
        url_class: "",
      },
      couter1: 0,
      couter2: 0,
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message.error("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // console.log(this.form);
      if (this.form.sex == "男") {
        this.form.sex = 1;
      } else if (this.form.sex == "女") {
        this.form.sex = 0;
      }

      register(this.form);
    },

    //验证码获取模块
    getVerityImg() {
      var that = this;
      this.$axios
        .get("http://192.168.1.217:8080/capthca", {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.tokenHead + " " + token.token,
          },
        })
        .then((response) => {
          console.log(response);
          return "data:image/png;base64," + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
        })
        .then((data) => {
          this.url = data; //赋值给img标签的src属性
        });
    },
    // 年级获取
    getGrade() {
      grade().then((res) => {
        this.grade_list = res.extend.grades;
        console.log(this.grade_list);
      });
    },
    // 获取学院
    getCollege(url) {
      college(url).then((res) => {
        this.college_list = res.extend.colleges;
      });
    },

    // 获取班级
    getClass(url) {
      class_name(url).then((res) => {
        this.class_list = res.extend.classes;
      });
    },
  },
  mounted() {
    var that = this;
    this.$axios
      .get("http://192.168.1.217:8080/capthca", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        return "data:image/png;base64," + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
      })
      .then((data) => {
        this.url = data; //赋值给img标签的src属性
      });
    // 获取学院的请求
    this.getGrade();
  },
  watch: {
    //选择年级后获取可选择的院系
    "form.gradeId"(newValue, oldValue) {
      // this.new_url.url_college = this.grade_list.find(item => item.gradeName === newValue).gradeId
      // if (this.couter1 == 0) {
      this.new_url.url_college = this.form.gradeId;
      this.getCollege(`${this.old_url.url_college}/${this.new_url.url_college}`);
      // this.couter1++;
      // } else if (this.couter1 > 0) {
      //   this.college_list = []
      //   this.getCollege(`${this.old_url.url_college}/${this.new_url.url_college}`);

      // }
    },
    //选择院系后获取可选择的班级
    "form.collegeId"(newValue, oldValue) {
      // this.new_url.url_class = this.college_list.find(item => item.collegeName === newValue).collegeId
      this.new_url.url_class = this.form.collegeId;
      this.getClass(`${this.old_url.url_class}/${this.new_url.url_class}`);
    },
  },
};
</script>

<style>
@import "../../../assets/css/style.css";
</style>
