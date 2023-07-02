<template>
  <el-container class="home_container">
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
    <!-- 头部区域 -->
    <el-header>
       <!-- <img src="../assets/R2.png" style="height: 60px;width: 220px;margin-left: 20px;"> -->
       
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" style="background-color: white" >
        <!-- 侧边栏菜单区域 -->
        <el-menu :default-openeds="['1','2']" :router="true">
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>个人中心</template>
            <el-menu-item-group>
              <el-menu-item index="/UserMain">个人主页</el-menu-item>
              <el-menu-item index="/UserMessage">信息修改</el-menu-item>
              <el-menu-item index="/Recharge">充值</el-menu-item>
              <el-menu-item index="/Message">消息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>订单信息</template>
            <el-menu-item-group>
              <el-menu-item index="/PayingOrder">未支付订单</el-menu-item>
              <el-menu-item index="/PayedOrder">已支付订单</el-menu-item>
              <el-menu-item index="/InvalidOrder">已失效订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view :userid="userid"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      username: '',
      userid: '',
    }
  },
  // created () {
  //     this.GetUser();
  // },
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
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/UserLogin')
    },
    // 获取所有的菜单数据
    // async GetUser(){
    //   await axios
    //   .get("http://123.57.3.84/users/"+this.$route.query.id)
    //   .then((res) => {
    //     console.log(res)
    //     if (res.data.success == true) {
    //       this.username=res.data.data.name;
    //       this.userid=res.data.data.id;
    //     } else {
    //       this.$message({
    //         message: res.data.message,
    //         type: 'error',
    //       })
    //     }
    //   })
    // },
    // 点击按钮，切换菜单的折叠与展开
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}

.myColor /deep/ .el-breadcrumb__inner {
  color: black;
}
.el-menu-demo .el-menu-item:hover {
  background-color: #ffe68a !important;
}
.el-header {
  background-color: white;
  // 给头部设置一下弹性布局
  display: flex;
  // 让它贴标左右对齐
  justify-content: space-between;
  // 清空图片左侧padding
  padding-left: 0;
  // 按钮居中
  align-items: center;
  // 文本颜色
  color: #fff;
  // 设置文本字体大小
  font-size: 20px;

  // 嵌套
  >div {
    // 弹性布局
    display: flex;
    // 纵向上居中对齐
    align-items: center;

    // 给文本和图片添加间距，使用类选择器
    span {
      margin-left: 15px;
    }
  }
}

// .el-header {
//   background-color: #e5efe2;
//   color: #333;
//   line-height: 60px;
// }

.el-aside {
  background-color: rgb(255, 127, 170);
  color: #333;
}

.router-link-active {
  text-decoration: none;
}

.alink {

  text-decoration: none;
}

.iconfont {
  margin-right: 10px;
}

.el-menu-demo {
  display: flex;
  justify-content: right;
  align-items: right;
}
.toggle-button {
  // 添加背景颜色
  background-color: grey;
  // 设置文本大小
  font-size: 10px;
  // 设置文本行高
  line-height: 24px;
  // 设置文本颜色
  color: #fff;
  // 设置文本居中
  text-align: center;
  // 设置文本间距
  letter-spacing: 0.2em;
  // 设置鼠标悬浮变小手效果
  cursor: pointer;
}</style>