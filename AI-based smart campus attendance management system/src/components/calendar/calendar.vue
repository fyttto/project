<template>
  <div style="width: 100%; height: 45vh; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); background-color: #fff">
    <a-calendar :value="value" :fullscreen="false" @select="onSelect" @panelChange="onPanelChange" />
  </div>
</template>

<script>
import { dateFind } from "@/api/index";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "calendar",
  data() {
    return {
      value: moment(new Date()),
      selectedValue: moment(new Date()),
      month: "",
      year: "",
      day: "",
      time: "",
      date: "",
      form: {
        time: "",
      },
    };
  },

  created() {
    let reg = /\//g;
    this.time = new Date().toLocaleDateString();
    this.form.time = this.time.replace(reg, "-");
    this.save_date(this.form.time);
    dateFind(this.form)
      .then((res) => {
        if (res.status == "2000") {
          this.$message({
            message: "数据获取成功",
            type: "success",
          });
          console.log(res);
          this.save_lineData(res.extend.records.lineGraph);
          this.save_barData(res.extend.records.barGraph);
          this.save_pieData(res.extend.records.fanGraph);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    ...mapMutations({
      save_date: "save_date",
      save_lineData: "save_lineData",
      save_barData: "save_barData",
      save_pieData: "save_pieData",
    }),
    onSelect(value) {
      this.value = value;
      this.selectedValue = value;
      switch (this.selectedValue._d.toString(",").split(" ")[1]) {
        case "Jan":
          this.month = 1;
          break;

        case "Feb":
          this.month = 2;
          break;
        case "Mar":
          this.month = 3;
          break;
        case "Apr":
          this.month = 4;
          break;
        case "May":
          this.month = 5;
          break;
        case "Jun":
          this.month = 6;
          break;
        case "Jul":
          this.month = 7;
          break;
        case "Aug":
          this.month = 8;
          break;
        case "Sep":
          this.month = 9;
          break;
        case "Oct":
          this.month = 10;
          break;
        case "Nov":
          this.month = 11;
          break;
        case "Dec":
          this.month = 12;
          break;
      }
      this.year = this.selectedValue._d.toString(",").split(" ")[3];
      this.day = this.selectedValue._d.toString(",").split(" ")[2];
      this.time = this.year + "-" + this.month + "-" + this.day;
      this.form.time = this.time;
      this.save_date(this.time);

      dateFind(this.form)
        .then((res) => {
          if (res.status == "2000") {
            this.$message({
              message: "数据获取成功",
              type: "success",
            });
            this.save_lineData(res.extend.records.lineGraph);
            this.save_barData(res.extend.records.barGraph);
            this.save_pieData(res.extend.records.fanGraph);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onPanelChange(value) {
      this.value = value;
    },
  },
};
</script>

<style></style>
