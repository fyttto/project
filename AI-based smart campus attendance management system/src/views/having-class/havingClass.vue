<template>
  <div class="bac_block">
    <!--数据筛选框-->
    <div class="showInputData">
      <select-class @listenTomyboy="listenTomyboy" />
    </div>
    <!--数据展示框-->
    <div class="showclassingData">
      <showhaving-class v-if="update" />
    </div>
  </div>
</template>

<script>
import { havingdefaultClass, havingClass } from "../../api/index";
import showhavingClass from "../../components/showHavingClass/showhavingClass";
import selectClass from "./component/selectofClass";
export default {
  name: "havingClass",
  data() {
    return {
      subjectNow: [],
      subjectFutrue: [],
      update: true,
    };
  },
  components: {
    selectClass,
    showhavingClass,
  },
  mounted() {
    this.getdefaultSubjectNow();
    setTimeout(() => {
      this.reload();
    }, 1000);
  },
  methods: {
    listenTomyboy(val) {
      this.update = val;
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
    }, //获取默认展示的上课班级
    getdefaultSubjectNow() {
      havingdefaultClass("/subject/now/0/0/0")
        .then((res) => {
          if ((res.status = "2000")) {
            this.subjectNow = res.extend.subjectNow;
            this.$store.commit("GET_SUBJECTNOW", this.subjectNow);
            this.$message({
              message: "数据更新成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
@import "./css/havingClass.css";
</style>
