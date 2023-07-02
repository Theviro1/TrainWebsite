<template>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="trainId" label="车次" width="120">
      </el-table-column>
      <el-table-column prop="seatId" label="座位" width="120">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="120">
      </el-table-column>
      <el-table-column label="起始站" width="150px">
        <template #default="scope">
          <div>{{ IdChange(scope.row.departurePlatformId) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="终点站" width="150px">
        <template #default="scope">
          <div>{{ IdChange(scope.row.arrivalPlatformId) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="cancel(scope.row.id)">取消订单</el-button>
          <el-button size="mini" type="warning" @click="ticketChange(scope.row.id)">订单改签</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
   
<script>
import axios from "axios"
export default {
  data() {
    return {
      tableData: []
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
    async GetList() {
      await axios
        .get("http://localhost:80/orders", { params: { createrId: this.$store.state.id } })
        .then((res) => {
          console.log(res)
          if (res.data.success == true) {
            this.$message({
              message: res.data.message,
              type: 'success',
            });
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].state == "PAID") {
                this.tableData.push(arr[i]);
              }
            }
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          }
        })
    },
    IdChange(id) {
      if (id == 1)
        return '北京'
      if (id == 2)
        return '天津'
      if (id == 3)
        return '济南'
      if (id == 4)
        return '南京'
      if (id == 5)
        return '杭州'
      if (id == 6)
        return '上海'
      if (id == 7)
        return '福州'
      if (id == 8)
        return '厦门'
      if (id == 9)
        return '海口'
      if (id == 10)
        return '三亚'
    },
    async cancel(id) {
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
            this.tableData = [];
            this.GetList();
          } else {
            this.$message({
              message: "订单取消失败",
              type: 'error',
            })
          }
        })
    },
    async ticketChange(id) {
      this.$router.push({
        path: 'trainlist1',
        query: { id: id, }
        // html取参: $route.query.id script取参: this.$route.query.id
      })
    }
  }
}
</script>
   
<style lang="less" scoped></style>