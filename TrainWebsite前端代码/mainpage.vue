<template>
  <div class="background">
    <!-- <div class="background"></div> -->
    <div class="head">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="transparent" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="0">
          <i class="00el-icon-user-solid"></i>
        </el-menu-item>
        <el-menu-item index="1" @click="reloadPage()"><a @click="reloadPage()">首页</a></el-menu-item>
        <el-menu-item index="2"><a href="#section_search">车次选择</a></el-menu-item>
        <el-menu-item index="3"><a href="#section_hot">热门车次</a></el-menu-item>
        <el-menu-item index="4"><a href="#about_us">关于我们</a></el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-user-solid" @click="to_person()"></i>
          <a @click="to_person()">您好，{{ this.$store.state.name }}</a>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-switch-button" @click="exit_system()"></i>
          <a @click="exit_system()">退出登录</a>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="box_1">
      <div style="background-color: #C4DFF9"></div>
      <div style="background-color: ##C4DFF9"></div>
    </div>
    <div>
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in 5" :key="item">
          <h3 class="medium"></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="box_1">
      <div style="background-color: #C4DFF9"></div>
      <div style="background-color: #C4DFF9"></div>
    </div>

    <div class="search-box" id="section_search">
      <input type="text" class="search-left" placeholder="请输入要搜索的内容" /><input type="button" class="search-right"
        value="搜 索" icon="el-icon-search" @click="to_trainlist()" />
    </div>

    <div class="box_1">
      <div style="background-color: #C4DFF9"></div>
      <div style="background-color: #C4DFF9"></div>
    </div>

    <div class="cards-container" id="section_hot">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="card_1">月度精选</span>
          <el-button style="float: right; padding: 3px 0"><i class="el-icon-s-marketing"
              style="font-size: 35px;border: none;"></i></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="card_2">当日车次</span>
          <el-button style="float: right; padding: 3px 0"><i class="el-icon-suitcase"
              style="font-size: 35px;border: none;"></i></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="card_3">通知公告</span>
          <el-button style="float: right; padding: 3px 0"><i class="el-icon-chat-line-round"
              style="font-size: 35px;border: none;"></i></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </div>

    <div class="box_1">
      <div style="background-color: #C4DFF9"></div>
      <div style="background-color: #C4DFF9"></div>
    </div>

    <div class="about_us_box" id="about_us">
      <el-card class="box-card-about">
        <div slot="header" class="clearfix">
          <span class="card_3">通知公告</span>
          <el-button style="float: right; padding: 3px 0"><i class="el-icon-chat-line-round"
              style="font-size: 35px;border: none;"></i></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card-about">
        <div slot="header" class="clearfix">
          <span class="card_3">通知公告</span>
          <el-button style="float: right; padding: 3px 0"><i class="el-icon-chat-line-round"
              style="font-size: 35px;border: none;"></i></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card-about">
        <div slot="header" class="clearfix">
          <span class="card_3">通知公告</span>
          <el-button style="float: right; padding: 3px 0"><i class="el-icon-chat-line-round"
              style="font-size: 35px;border: none;"></i></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card-about">
        <div slot="header" class="clearfix">
          <span class="card_3">通知公告</span>
          <el-button style="float: right; padding: 3px 0"><i class="el-icon-chat-line-round"
              style="font-size: 35px;border: none;"></i></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card-about">
        <div slot="header" class="clearfix">
          <span class="card_3">通知公告</span>
          <el-button style="float: right; padding: 3px 0"><i class="el-icon-chat-line-round"
              style="font-size: 35px;border: none;"></i></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </div>

    <div class="box_1">
      <div style="background-color: #C4DFF9"></div>
      <div style="background-color: #C4DFF9"></div>
    </div>

    <div>
      <el-footer>Footer</el-footer>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    reloadPage() {
      this.$router.push("/MainPage");
    },
    to_person() {
      this.$router.push("/usermain");
    },
    exit_system() {
      this.$router.push("/UserLogin");
    },
    to_trainlist() {
      this.$router.push("/trainlist");
    }
  }
};
</script>
  
<style lang="less" scoped>
.background {
  //   position: absolute;
  width: auto;
  height: auto;
  z-index: 0;
  background-color: #c4dff9;
  margin-top: 0px;
}

.head {
  z-index: 1;
  //margin: 20px;
  justify-content: center;
  align-items: center;
}

.el-menu-demo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-menu-demo .el-menu-item:hover {
  background-color: #9d1df6 !important;
}

.el-menu-demo .el-menu-item a {
  text-decoration: none;
  color: #f8e8e8;
  font-size: 16px;
  /* 设置菜单项文本字体大小 */
  font-weight: bold;
  /* 设置菜单项文本字体加粗 */
  text-transform: uppercase;
  /* 设置菜单项文本转换为大写 */
}

.el-menu-demo .el-menu-item:last-child {
  margin-left: auto;
  /* 将最后一个菜单项向右对齐 */
}

.el-menu-demo .el-menu-item:nth-last-child(2) {
  margin-left: auto;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.box {
  text-align: center;
  //  font-size: 0;
}

.search-box {
  margin: 0 auto;
  width: 750px;
  position: relative;
}

.search-left {
  text-indent: 20px;
  width: 80%;
  height: 50px;
  border: rgb(137, 233, 217) 1px solid;
  // float:left;
  margin-top: 20px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  outline: none;
  // text-align:20px ;
}

.search-right {
  width: 19%;
  height: 50px;
  background: rgb(137, 233, 217);
  color: #fff;
  border: none;
  margin-top: 20px;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  outline: none;
}

.box_1 {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
}

.box_1>div {
  //   height: 100%;
  flex: 1;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  flex: 1;
  margin: 0 10px;
  border-radius: 10px;
}

.box-card-about {
  width: 20%;
  flex: 1;
  margin: 0 10px;
  margin-top: 10px;
  border-radius: 10px;
}

.cards-container {
  display: flex;
  margin: 0 -10px;
}

.card_1 {
  color: #2d4df2;
  font-size: 30px;
  /* 设置菜单项文本字体大小 */
  font-weight: bold;
  /* 设置菜单项文本字体加粗 */
  text-transform: uppercase;
  /* 设置菜单项文本转换为大写 */
}

.card_2 {
  color: #018ce1;
  font-size: 30px;
  /* 设置菜单项文本字体大小 */
  font-weight: bold;
  /* 设置菜单项文本字体加粗 */
  text-transform: uppercase;
  /* 设置菜单项文本转换为大写 */
}

.card_3 {
  color: #da33bf;
  font-size: 30px;
  /* 设置菜单项文本字体大小 */
  font-weight: bold;
  /* 设置菜单项文本字体加粗 */
  text-transform: uppercase;
  /* 设置菜单项文本转换为大写 */
}

.about_us_box {
  width: 80%;
  height: 300px;
  background-color: #fff;
  border-radius: 3px; //圆角效果
  position: relative;
  left: 10%;
  right: 10%;
  top: 50%;
  display: flex;
  // transform: translate(-50%, -50%);
}
</style>
  