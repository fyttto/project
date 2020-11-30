<template>
  <div>
    <el-row :gutter="24">
      <!--饼状图-->
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <piechart></piechart>
      </el-col>
      <!--柱状图-->
      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
        <bar-chart></bar-chart>
      </el-col>
      <!--日历表-->
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <calendar></calendar>
      </el-col>
    </el-row>

    <!--折线图-->
    <el-row>
      <el-col :span="24">
        <linecharts></linecharts>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import calendar from "@/components/calendar/calendar";
import linecharts from "@/components/charts/lineCharts";
import piechart from "@/components/charts/pieChart";
import barChart from "@/components/charts/barChart";
export default {
  name: "chart",
  components: {
    linecharts,
    piechart,
    calendar,
    barChart,
  },
};
</script>

<style>
.top {
  display: flex;
  justify-content: space-between;
}
</style>
