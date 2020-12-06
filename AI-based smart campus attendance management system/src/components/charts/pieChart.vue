<template>
  <div style="width: 100%; height: 45vh; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); background-color: #fff" id="piechart"></div>
</template>

<script>
import { EleResize } from "./esresize";
export default {
  name: "pieChart",

  data() {
    return {
      date: "",
      pieChartData: [
        {
          value: "1",
          name: "1-2节",
        },
        {
          value: "2",
          name: "3-4节",
        },
        {
          value: "1",
          name: "5-6节",
        },
        {
          value: "4",
          name: "7-8节",
        },
      ],
    };
  },

  mounted() {
    this.date = this.$store.state.date;
    // this.setChart();
    setTimeout(() => {
      this.pieChartData[0].value = this.$store.state.pieData["1~2:absent:"];
      this.pieChartData[1].value = this.$store.state.pieData["3~4:absent:"];
      this.pieChartData[2].value = this.$store.state.pieData["5~6:absent:"];
      this.pieChartData[3].value = this.$store.state.pieData["7~8:absent:"];
      // console.log(this.pieChartData[3].value);
      this.setChart();
    }, 3000);
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
        this.pieChartData[0].value = this.$store.state.pieData["1~2:absent:"];
        this.pieChartData[1].value = this.$store.state.pieData["3~4:absent:"];
        this.pieChartData[2].value = this.$store.state.pieData["5~6:absent:"];
        this.pieChartData[3].value = this.$store.state.pieData["7~8:absent:"];
        // console.log(this.pieChartData[3].value);
        this.setChart();
      }, 3000);
    },
  },

  methods: {
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
      let dom = "piechart";
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: this.date + " 缺勤人次",
          top: "30",
          left: "center",
        },
        color: ["#60ACFC", "#D4ED58", "#5BC4A0", "#FF9D68"],
        tooltip: {},
        series: [
          {
            name: "缺勤",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.pieChartData,
          },
        ],
      };
      this.drawLine(dom, option);
    },
  },
};
</script>

<style></style>
