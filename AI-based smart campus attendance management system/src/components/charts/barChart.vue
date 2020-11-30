<template>
  <div style="width: 100%; height: 45vh; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); background-color: #fff" id="main"></div>
</template>

<script>
import { EleResize } from "./esresize";

export default {
  name: "barChart",
  data() {
    return {
      date: "",
      barChartData: {
        source: [
          ["product", "正常打卡", "迟到打卡", "未打卡"],
          ["1-2节", 0, 0, 7],
          ["3-4节", 5, 2, 7],
          ["5-6节", 1, 0, 6],
          ["7-8节", 7, 0, 0],
        ],
      },
    };
  },
  mounted() {
    // this.setChart();

    // setTimeout(() => {
    //   console.log(this.$store.state.barData);
    // }, 4000);
    this.setChart();
    setTimeout(() => {
      this.newData();
      //1-2节
      this.barChartData.source[1].push(this.$store.state.barData["1~2:normal:"].toString());
      this.barChartData.source[1].push(this.$store.state.barData["1~2:last:"].toString());
      this.barChartData.source[1].push(this.$store.state.barData["1~2:absent:"].toString());
      //3-4节
      this.barChartData.source[2].push(this.$store.state.barData["3~4:normal:"].toString());
      this.barChartData.source[2].push(this.$store.state.barData["3~4:last:"].toString());
      this.barChartData.source[2].push(this.$store.state.barData["3~4:absent:"].toString());
      //5-6节
      this.barChartData.source[3].push(this.$store.state.barData["5~6:normal:"].toString());
      this.barChartData.source[3].push(this.$store.state.barData["5~6:last:"].toString());
      this.barChartData.source[3].push(this.$store.state.barData["5~6:absent:"].toString());
      //7-8节
      this.barChartData.source[4].push(this.$store.state.barData["7~8:normal:"].toString());
      this.barChartData.source[4].push(this.$store.state.barData["7~8:last:"].toString());
      this.barChartData.source[4].push(this.$store.state.barData["7~8:absent:"].toString());
      this.$nextTick(() => {
        this.setChart();
      });
    }, 4000);
  },
  computed: {
    listenStDate() {
      return this.$store.state.date;
    },
  },
  watch: {
    listenStDate(val) {
      this.date = val;
      setTimeout(() => {
        this.newData();
        //1-2节
        this.barChartData.source[1].push(this.$store.state.barData["1~2:normal:"].toString());
        this.barChartData.source[1].push(this.$store.state.barData["1~2:last:"].toString());
        this.barChartData.source[1].push(this.$store.state.barData["1~2:absent:"].toString());
        //3-4节
        this.barChartData.source[2].push(this.$store.state.barData["3~4:normal:"].toString());
        this.barChartData.source[2].push(this.$store.state.barData["3~4:last:"].toString());
        this.barChartData.source[2].push(this.$store.state.barData["3~4:absent:"].toString());
        //5-6节
        this.barChartData.source[3].push(this.$store.state.barData["5~6:normal:"].toString());
        this.barChartData.source[3].push(this.$store.state.barData["5~6:last:"].toString());
        this.barChartData.source[3].push(this.$store.state.barData["5~6:absent:"].toString());
        //7-8节
        this.barChartData.source[4].push(this.$store.state.barData["7~8:normal:"].toString());
        this.barChartData.source[4].push(this.$store.state.barData["7~8:last:"].toString());
        this.barChartData.source[4].push(this.$store.state.barData["7~8:absent:"].toString());
        // 创建图表
        this.$nextTick(() => {
          this.setChart();
        });
      }, 3000);
    },
  },
  methods: {
    newData() {
      this.barChartData = {
        source: [["product", "正常打卡", "迟到打卡", "未打卡"], ["1-2节"], ["3-4节"], ["5-6节"], ["7-8节"]],
      };
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
      // 基于准备好的dom，初始化echarts实例
      let dom = "main";
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: this.date + "打卡情况",
          top: "0",
          left: "0",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        color: ["#5BC4A0", "yellow", "#FF9D68"],
        legend: {
          right: "10",
          top: "30",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {},
        dataset: {
          source: this.barChartData.source,
        },
        series: [
          {
            type: "bar",
          },
          {
            type: "bar",
          },
          {
            type: "bar",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.drawLine(dom, option);
    },
  },
};
</script>

<style></style>
