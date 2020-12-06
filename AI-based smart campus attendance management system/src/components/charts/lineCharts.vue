<template>
  <div class="line_chart">
    <div id="lineChart" style="width: 100%; height: 45vh; border-radius: 2px; margin-top: 15px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); background-color: #fff"></div>
  </div>
</template>

<script>
import { EleResize } from "./esresize";
export default {
  name: "lineChart",
  data() {
    return {
      tenfour: [],
      todayDate: this.$store.state.date,
      absent: [],
      last: [],
      normal: [],
      dataSource: {
        source: [
          ["product", "全勤", "迟到", "缺勤"],
          ["1号", 0, 0, 0],
          ["2号", 0, 0, 0],
          ["3号", 0, 0, 0],
          ["4号", 0, 0, 0],
          ["5号", 0, 0, 0],
          ["6号", 0, 0, 0],
          ["7号", 0, 0, 0],
          ["8号", 0, 0, 0],
          ["9号", 0, 0, 0],
          ["10号", 0, 0, 0],
          ["11号", 0, 0, 0],
          ["12号", 0, 0, 0],
          ["13号", 0, 0, 0],
          ["14号", 0, 0, 0],
        ],
      },
    };
  },

  mounted() {
    console.log(this.$store.state.date);
    this.getEveryDay();
    setTimeout(() => {
      console.log(this.$store.state.lineData.absentOfWeek);
      console.log(this.$store.state.lineData.lastOfWeek);
      console.log(this.$store.state.lineData.normalOfWeek);

      this.absent = this.$store.state.lineData.absentOfWeek;
      this.last = this.$store.state.lineData.lastOfWeek;
      this.normal = this.$store.state.lineData.normalOfWeek;

      for (let i = 0; i < 14; i++) {
        this.dataSource.source[i + 1].splice(3, 1, this.absent[i]);
        this.dataSource.source[i + 1].splice(2, 1, this.last[i]);
        this.dataSource.source[i + 1].splice(1, 1, this.normal[i]);
        this.dataSource.source[i + 1].splice(0, 1, this.tenfour[i]);
      }
      // 创建图表
      this.$nextTick(() => {
        this.setChart();
      });
    }, 3000);
  },
  computed: {
    listenStDate() {
      return this.$store.state.date;
    },
  },
  watch: {
    listenStDate(val) {
      console.log(this.$store.state.date);
      this.getEveryDay();
      setTimeout(() => {
        // console.log(this.$store.state.lineData.absentOfWeek);
        this.absent = this.$store.state.lineData.absentOfWeek;
        this.last = this.$store.state.lineData.lastOfWeek;
        this.normal = this.$store.state.lineData.normalOfWeek;

        console.log(this.tenfour);
        for (let i = 0; i < 14; i++) {
          this.dataSource.source[i + 1].splice(3, 1, this.absent[i]);
          this.dataSource.source[i + 1].splice(2, 1, this.last[i]);
          this.dataSource.source[i + 1].splice(1, 1, this.normal[i]);
          this.dataSource.source[i + 1].splice(0, 1, this.tenfour[i]);
        }
        // console.log(this.absent)
        // 创建图表
        this.$nextTick(() => {
          this.setChart();
        });
      }, 3000);
    },
  },
  methods: {
    computeDate(todayDate, day) {
      var dd = new Date(todayDate);
      dd.setDate(dd.getDate() + day);
      var month = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var day = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      var full = month + "-" + day;
      return full;
    },
    getEveryDay() {
      this.tenfour = [];
      for (let i = 0; i > -14; i--) {
        // tenfour.push(1);
        // console.log(this.)
        this.tenfour.unshift(this.computeDate(this.$store.state.date, i));
      }
      return this.tenfour;
    },
    drawLine(dom, option) {
      let myChart = this.$echarts.init(document.getElementById(dom));
      let resizeDiv = document.getElementById(dom);
      //绘制图表
      myChart.setOption(option);
      // console.log(EleResize);
      let listener = function () {
        // console.log('resize');
        myChart.resize();
      };
      EleResize.on(resizeDiv, listener);
    },
    setChart() {
      let dom = "lineChart";
      let options = {
        title: {
          text: "近14天打卡情况",
          top: "10",
          left: "center",
        },

        tooltip: {},
        legend: {
          fontSize: "30",
          top: "5%",
          right: "5%",
          data: [
            {
              name: "正常打卡",
              textStyle: {
                color: "#000",
              },
            },
            {
              name: "迟到打卡",
              textStyle: {
                color: "#000",
              },
            },
            {
              name: "未打卡",

              textStyle: {
                color: "#000",
              },
            },
          ],
        },
        xAxis: {
          type: "category",
        },
        grid: {
          top: "60px",
          left: "2%",
          // right: '9%',
          bottom: "5%",
          containLabel: true,
        },
        yAxis: {},
        color: ["#60ACFC", "#5BC4A0", "#FF9D68"],
        dataset: this.dataSource,
        series: [
          {
            name: "正常打卡",
            type: "line",
            smooth: "true",
          },
          {
            name: "迟到打卡",
            type: "line",
            smooth: "true",
          },
          {
            name: "未打卡",
            type: "line",
            smooth: "true",
          },
        ],
      };

      // 绘图
      this.drawLine(dom, options);
    },
  },
};
</script>

<style></style>
