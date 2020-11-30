<template>
  <div>
    <div style="margin-left: 1vw; margin-right: 1vh">
      <el-row>
        <el-col :span="4" v-for="item in subjectNow" :key="item.subjectName" :offset="1" @click.native="clickCard(item)">
          <div style="margin-top: 10px; margin-bottom: 15px">
            <el-card :body-style="{ padding: '10px' }" shadow="hover">
              <img src="@/assets/img/class.jpeg" class="image img_class" />
              <div class="text_span">
                <div>课程名称: {{ item.subjectName }}</div>
                <div>课程时间: {{ item.schoolTime }}节</div>
                <div>课程教室: {{ item.classroom }}</div>
                <div>课程时间: {{ item.weekday }}</div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <div class="dialog_block">
        <el-dialog title="上课详情" :visible.sync="dialogTableVisible">
          <el-image :src="url" :fit="fit" class="img_code" ref="img_form"></el-image>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { picJudged, picStateClass } from "../../api/index";
// import { post3 } from "../../network/request";
export default {
  name: "showhavingClass",
  data() {
    return {
      wangzhaoSurl: "http://222.24.63.62:10040/receiveImg",
      dialogTableVisible: false,
      formLabelWidth: "120px",
      subjectNow: [],
      chooseClass: "",
      schoolTime: "",
      classroom: "",
      classTime: "",
      url: "",
      fit: "fill",
      stream: "stream",
      img_list: [],
      data: "",
      formMess: {
        formImg: "",
      },
      window: window,
    };
  },

  mounted() {
    this.subjectNow = this.$store.state.subjectNow;
  },
  methods: {
    getData() {},
    clickItem() {
      this.getData();
    },

    // 正常代码
    clickCard(item) {
      this.chooseClass = item;
      this.schoolTime = item.schoolTime;
      this.classroom = item.classroom;
      this.$store.commit("GET_CHOOSECLASS", this.chooseClass);
      console.log("数据请求");
      this.getClassImg();
      this.dialogTableVisible = true;
    },
    // 刷新组件
    reload() {
      // 移除组件
      this.update = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true;
      });
    },
    // 获取后台图片
    getClassImg() {
      this.url_pic = `http://192.168.1.217:8080/camera/image/${this.classroom}:${this.schoolTime}`;
      console.log(this.url_pic);
      var that = this;
      this.$axios
        .get(this.url_pic, {
          responseType: "arraybuffer",
          headers: {
            validtoken: this.$store.state.token,
          },
        })
        .then((response) => {
          // console.log(response);
          return "data:image/png;base64," + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
        })
        .then((data) => {
          this.url = data; //赋值给img标签的src属性
        });
    },

    clickOnload(e) {
      console.log(e.target);
    },
    //访问王哥接口
    // imgJudge() {},

    // dataclick() {},
    // 点击图片发送请求
    // getChagePic() {
    //   this.imgJudge();
    // },

    // beforeAvatarUpload(file) {
    //   // 创建form对象
    //   let param = new FormData();
    //   param.append("image", file, file.name);
    //   console.log(param);
    //   let config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       authorization: sessionStorage.token,
    //     },
    //   };
    //   this.$axios
    //     .post("http://222.24.63.62:10040/receiveImg", param, config)
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  watch: {
    "$store.state.subjecctNow"(newVal, oldVal) {
      this.subjectNow = newVal;
      console.log("数据改变成功");
      this.$forceUpdate();
      // this.reload();
    },
  },
};
</script>

<style>
.img_class {
  width: 100%;
  height: 100%;
}
.text_span {
  font-size: 1em;
}
</style>
