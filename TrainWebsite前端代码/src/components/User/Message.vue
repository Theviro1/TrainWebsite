<template>
  <div id="building" style="width: 80%;">
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="id" label="序号" min-width="10%">
      </el-table-column>
      <el-table-column prop="message" label="信息" min-width="90%">
      </el-table-column>
    </el-table>
  </el-main></div>
</template>
   
<script>
import axios from "axios"
export default {
  data() {
    return {
      tableData: [],
      userid: ''
    }
  },
  created() {
    this.GetList();
  },
  // props:['userid'],
  // watch: {
  //     userid: function (val) {       
  //      		this.userid=val;   // 接收父组件的值
  //     }
  // },
  methods: {
    goPayMain(id) {
      this.$router.push({
        path: 'PayMain',
        query: { id: id, }
        // html取参: $route.query.id script取参: this.$route.query.id
      })
    },
    async GetList() {
      await axios
        .get("http://localhost:80/users/message/"+this.$store.state.id)
        .then((res) => {
          console.log(res)
          if (res.data.success == true) {
            this.$message({
              message: res.data.message,
              type: 'success',
            });
            this.tableData = [];
            this.tableData = res.data.data;
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          }
        })
    },
    async Cancel(id) {
      await axios
        .put("http://localhost:80/orders/cancel/" + id)
        .then((res) => {
          console.log(1)
          console.log(res)
          if (res.data.success == true) {
            this.$message({
              message: "订单取消成功",
              type: 'success',
            });
            this.tableData=[];
            this.GetList();
          } else {
            this.$message({
              message: "订单取消失败",
              type: 'error',
            })
          }
        })
    }
  }
}
</script>
   
<style lang="less" scoped>
#building {
    background: url("./3.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
</style>