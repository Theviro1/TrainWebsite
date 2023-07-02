<template>
  <div>
    
    <el-header>
      <!-- <img src="../assets/R2.png" style="height: 60px;width: 220px;margin-left: 20px;"> -->
    <el-menu mode="horizontal" class="el-menu-demo" style="float: right;">
        <!-- <a>{{ this.$store.state }}</a> -->
        <!-- 首页按钮 -->
        <el-menu-item style="color: rgb(0, 0, 0);font-size: 15px;" @click.native="reloadPage()">
          <i class="el-icon-house"></i>
          <a>首页</a>
        </el-menu-item>
        <!-- 车次选择按钮 -->
        <el-menu-item style="color: rgb(0, 0, 0);font-size: 15px;" @click.native="to_trainlist()">
          <i class="el-icon-view"></i>
          <a>车次选择</a>
        </el-menu-item>
        <!-- 进入个人中心 -->
        <el-menu-item v-if="$store.state.loginstatus != null" style="font-size: 15px;" @click.native="to_person()">
          <i class="el-icon-user"></i>
          <a>您好，{{ this.$store.state.name }}</a>
        </el-menu-item>
        <el-menu-item v-if="$store.state.loginstatus != null" style="font-size: 15px;" @click.native="exit_system()">
          <i class="el-icon-switch-button"></i>
          <a>退出登录</a>
        </el-menu-item>
        <el-menu-item v-if="$store.state.loginstatus == null" style="font-size: 15px;" @click.native="to_login()">
          <a>注册 | 登录</a>
        </el-menu-item>
      </el-menu>
    </el-header>
  
    <el-card>
      <el-steps  :active="active" finish-status="success"  align-center>
        <el-step title="火车列表" icon="el-icon-search" description="请选择您要乘坐的列车" status="process"></el-step>
          <el-step title="选择座位" icon="el-icon-thumb" description="请添加乘客，选择您要购买的座位" status="wait"></el-step>
          <el-step title="订单中心" icon="el-icon-shopping-cart-2" description="支付订单" status="wait"></el-step>
      </el-steps>
    </el-card>
    <!-- 卡片视图 -->
    <el-card>
      <span class="u-tag yellow">出发地</span>
      <el-select class="test" v-model="departureid" clearable placeholder="请选择出发地">
        <el-option v-for="item in departurePlatforms" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span class="u-tag blue">目的地</span>
      <el-select class="test" v-model="arrivalid" clearable placeholder="请选择目的地">
        <el-option v-for="item in arrivalPlatforms" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span class="u-tag green">发车日期</span>
      <el-date-picker class="test" v-model="time" type="daterange" align="right" unlink-panels range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
      {{ data }}
      <el-button type="warning" class="query" icon="el-icon-search" @click="ticketQuery()">查询
      </el-button>
      <el-button type="danger" class="query" icon="el-icon-search" @click="ticketfastQuery()">查询最快列车
      </el-button>
    </el-card>
    <!-- Table视图 -->
    <el-table :data="trainsList" border stripe height="500" highlight-current-row @row-click="getTrainid">
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
    to_login() {
      window.sessionStorage.clear();
      this.$router.push("/UserLogin");
    },
    exit_system() {
      // 清空全局变量
      this.$store.state.name = null;
      this.$store.state.id = null;
      this.$store.state.platformnum = null;
      this.$store.state.loginstatus = null;
      this.$store.state.trainid = null;
      this.$store.state.departurePlatformId = null;
      this.$store.state.arrivalPlatformId = null;
      this.$store.state.departureTime = null;
      this.$store.state.arrivalTime = null;
      this.$store.state.platformNum = null;
      window.sessionStorage.clear();
      location.reload();
    },
    reloadPage() {
      this.$router.push("/MainPage");
    },
    to_trainlist() {
      this.$router.push("/trainlist");
    },
    to_person() {
      this.$router.push("/usermain");
    },
    getTrainid(row) {
      this.trainid = row.id;
      this.departureTime = row.departureTime
      this.arrivalTime = row.arrivalTime
      this.platformNum = row.platformNum
      this.$store.commit('savetrainid', this.trainid);
      this.$store.commit('savedepartureTime', this.departureTime);
      this.$store.commit('savearrivalTime', this.arrivalTime);
      this.$store.commit('saveplatformNum', this.platformNum);
      console.log('arrivalid:  '+this.arrivalid)
      if(this.arrivalid==''){ //没有进行筛选
        this.arrivalid = row.arrivalPlatformId
        this.departureid = row.departurePlatformId
      }
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
      this.$router.push("/traininf");
    },
    async getTrainsList() {
      await axios.get('http://localhost:80/train').then((res) => {
        console.log(res);
        const { data } = res.data
        this.trainsList = data;
      })
    },
    async ticketfastQuery(){
      if(this.time ==''){
        this.$message({
          type: 'error',
          message: '请先查询列车'
        });
        this.getTrainSeat();
      }
      else{
        var time11 = this.time.slice();
        var time1 = time11[0];
        var time2 = time11[1];
        var date1 = new Date(time1);
        var date2 = new Date(time2);
        var date1Str = date1.toISOString().slice(0, -5); // 转换并去掉最后5个字符 
        var date2Str = date2.toISOString().slice(0, -5); // 转换并去掉最后5个字符
        await axios.get('http://localhost:80/train/search/fastest',
        { params: { departurePlatformId: this.departureid, arrivalPlatformId: this.arrivalid, departureDate1: date1Str, departureDate2: date2Str } }).then((res) => {
          const { data } = res.data
          this.trainsList = data
        })
      }
    },
    async ticketQuery() {
      if (!this.time.length) {
        console.log("time为空")
        console.log(this.departureid)
        console.log(this.arrivalid)
        await axios.get('http://localhost:80/train/search1', { params: { departurePlatformId: this.departureid, arrivalPlatformId: this.arrivalid } }).then((res) => {
          console.log(res)
          const { data } = res.data
          this.trainsList = data
        })
      }
      else {
        console.log("time不为空");
        var time11 = this.time.slice();
        var time1 = time11[0];
        var time2 = time11[1];
        var date1 = new Date(time1);
        var date2 = new Date(time2);
        var date1Str = date1.toISOString().slice(0, -5); // 转换并去掉最后5个字符 
        var date2Str = date2.toISOString().slice(0, -5); // 转换并去掉最后5个字符
        await axios.get('http://localhost:80/train/search',
          { params: { departurePlatformId: this.departureid, arrivalPlatformId: this.arrivalid, departureDate1: date1Str, departureDate2: date2Str } }).then((res) => {
            const { data } = res.data
            this.trainsList = data
          })

      }

    }
  },
  data() {
    return {
      active: 0,
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
      arrivalPlatforms: [{
        value: 1,
        label: '北京'
      }, {
        value: 2,
        label: '天津'
      }, {
        value: 3,
        label: '济南'
      }, {
        value: 4,
        label: '南京'
      }, {
        value: 5,
        label: '杭州'
      }, {
        value: 6,
        label: '上海'
      }, {
        value: 7,
        label: '福州'
      }, {
        value: 8,
        label: '厦门'
      }, {
        value: 9,
        label: '海口'
      }, {
        value: 10,
        label: '三亚'
      }],
      departurePlatforms: [{
        value: 1,
        label: '北京'
      }, {
        value: 2,
        label: '天津'
      }, {
        value: 3,
        label: '济南'
      }, {
        value: 4,
        label: '南京'
      }, {
        value: 5,
        label: '杭州'
      }, {
        value: 6,
        label: '上海'
      }, {
        value: 7,
        label: '福州'
      }, {
        value: 8,
        label: '厦门'
      }, {
        value: 9,
        label: '海口'
      }, {
        value: 10,
        label: '三亚'
      }],
      pickerOptions: {
        shortcuts: [
          {
            text: '近三天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 2)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 6)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '近一月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
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
  margin-top: 20px;
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
  margin-left: 30px;
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
.el-menu-demo .el-menu-item:hover {
  background-color: #ffe68a !important;
}
.item {
  padding: 18px 0;
}
.u-tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
}
.blue {
  margin-left:30px;
  color: #0079dd;
  background: #f0f7fd;
}
.green {
  margin-left:30px;
  color: #00dd7a;
  background: #f0f7fd;
}
.yellow {
  margin-left: 40px;
  color: #ff9000;
  background: #fff9f0;
}
</style>