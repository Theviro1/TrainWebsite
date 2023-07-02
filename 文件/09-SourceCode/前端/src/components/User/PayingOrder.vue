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
          <el-button size="mini" @click="goPayMain(scope.row.id)">支付订单</el-button>
          <el-button size="mini" type="danger" @click="Cancel(scope.row.id)">取消订单</el-button>
        </template>
      </el-table-column>
      <!-- 进行调试 -->
      <!-- <el-table-column prop="id" label="前往支付" width="120">
        <template slot-scope="scope">
          <div>
            <a href="javascript:;" @click="goPayMain(scope.row.id)">支付订单</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="取消订单" width="120">
        <template slot-scope="scope">
          <div>
            <a href="javascript:;" @click="Cancel(scope.row.id)">取消订单</a>
          </div>
        </template>
      </el-table-column> -->
      <!-- 进行调试 -->
    </el-table>
  </el-main>
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
    async GetList() {
      await axios
        .get("http://123.57.3.84/orders", { params: { createrId: this.$store.state.id } })
        .then((res) => {
          console.log(res)
          if (res.data.success == true) {
            this.$message({
              message: res.data.message,
              type: 'success',
            });
            this.tableData = [];
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].state == "UNPAID") {
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
    async Cancel(id) {
      await axios
        .put("http://123.57.3.84/orders/cancel/" + id)
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
    }
  }
}
</script>
   
<style lang="less" scoped></style>