<template>
  <div class="tableBlock">
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="className" label="班级" width="180"> </el-table-column>
      <el-table-column prop="collegeName" label="学院" width="180"> </el-table-column>
      <el-table-column prop="gradeName" label="年级"> </el-table-column>
      <el-table-column prop="studentNo" label="学号"> </el-table-column>
      <el-table-column prop="subjectName" label="课程"> </el-table-column>
      <el-table-column prop="userName" label="姓名"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small" class="btn_look">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="打卡信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>课程名称：{{ row.subjectName }}</div>
      <div>学生姓名：{{ row.userName }}</div>
      <div>班级：{{ row.className }}</div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "myTable",
  data() {
    return {
      dialogVisible: false,
      row: { className: "", collegeName: "", gradeName: "", studentNo: "", subjectName: "", userName: "" },
      tableData: [{ className: "", collegeName: "", gradeName: "", studentNo: "", subjectName: "", userName: "" }],
    };
  },
  mounted() {
    // 挂载时候获取数据
    this.tableData = this.$store.state.tableData;
    this.$forceUpdate();
    console.log(this.tableData);
  },
  wacth: {
    // 实时发现数据变化，渲染视图
    "$store.state.tableData"(newVal, oldVal) {
      this.tableData = newVal;
      this.$forceUpdate();
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleClick(row) {
      this.row = row;
      this.dialogVisible = true;
      // console.log(row);
      // var con = `<div style="width:180px;text-align:left!important;margin:0 auto;color:#999;font-size:16px">课程名称：${row.name}<br/>打卡时间：${row.date}</div>`;
      // if (row.name) {
      //   // console.log(con);
      // }
    },
    changeClick(row) {
      console.log("删除");
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.btn_look {
  font-size: 1.1em;
}
</style>
