<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>火车信息</el-breadcrumb-item>
      <el-breadcrumb-item>可选择列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- Table视图 -->
    <el-table :data="trainsList" border stripe height="580" highlight-current-row @row-click="getTrainid">
      <el-table-column type="index" label="序号" width="100px"></el-table-column>
      <el-table-column label="火车序号" prop="id" width="150px"></el-table-column>
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
      <el-table-column label="发车时间" prop="departureTime" width="350px"></el-table-column>
      <el-table-column label="终点时间" prop="arrivalTime" width="350px"></el-table-column>
      <el-table-column label="经停站数" prop="platformNum" width="100px"></el-table-column>
      <el-table-column label="查看车次信息" width="150px">
        <template slot-scope="{}">
          <el-tooltip effect="dark" content="查询" placement="top">
            <el-button type="primary" icon="el-icon-search" size="mini">查看</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  methods: {
    getTrainid(row) {
      this.trainid = row.id;
      this.departureTime = row.departureTime
      this.arrivalTime = row.arrivalTime
      this.platformNum = row.platformNum
      this.arrivalid = row.arrivalPlatformId
      this.departureid = row.departurePlatformId
      this.$store.commit('savetrainid', this.trainid);
      this.$store.commit('savedepartureTime', this.departureTime);
      this.$store.commit('savearrivalTime', this.arrivalTime);
      this.$store.commit('saveplatformNum', this.platformNum);
      //console.log('arrivalid:  '+this.arrivalid)
      this.$store.commit('savedepartureid', this.departureid);
      this.$store.commit('savearrivalid', this.arrivalid);
      this.changeTrainInf();
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
    changeTrainInf() {
      this.$router.push({
        path: 'traininf1',
        query: { id: this.$route.query.id }
        // html取参: $route.query.id script取参: this.$route.query.id
      })
    },
    async getTrainsList() {
      await axios.get('http://localhost:80/orders/availableTrain/'+this.$route.query.id).then((res) => {
        console.log(res);
        const { data } = res.data
        this.trainsList = data;
      })
    },
    
  },
  data() {
    return {
      trainid: '',
      arrivalid: '',
      departureid: '',
      arrivalPlatformId: '',
      departurePlatformId: '',
      departureTime: '',
      arrivalTime: '',
      platformNum: '',
      time: [],
      trainsList: [],

    }
    
  },
  created() {
    this.getTrainsList();
  }
}
</script>

<style scoped>
.el-table {
  margin-left: 70px;
  margin-top: 70px;
  font-size: 14px;
}

.el-card {
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 35px;
}

.breadcrumb {
  margin-top: 30px;
  margin-left: 30px;
}

.query {
  margin-left: 50px;
}

.p1 {
  margin-left: 90px;
}

.p2 {
  margin-left: 20px;
}

.test {
  margin-left: 20px;
  /* background:rgb(183, 229, 219) */
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
</style>