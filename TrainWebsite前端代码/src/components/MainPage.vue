<template>
  <el-container>
    <el-header>
      <img
        src="../assets/logo.png"
        style="height: 60px;width: 160px;margin-left: 20px;"
      />
      <el-menu mode="horizontal" class="el-menu-demo" style="float: right;">
        <!-- <a>{{ this.$store.state }}</a> -->
        <!-- 首页按钮 -->
        <el-menu-item
          style="color: rgb(0, 0, 0);font-size: 15px;"
          @click.native="reloadPage()"
        >
          <i class="el-icon-house"></i>
          <a>首页</a>
        </el-menu-item>
        <!-- 车次选择按钮 -->
        <el-menu-item
          style="color: rgb(0, 0, 0);font-size: 15px;"
          @click.native="to_trainlist()"
        >
          <i class="el-icon-view"></i>
          <a>车次选择</a>
        </el-menu-item>
        <!-- 进入个人中心 -->
        <el-menu-item
          v-if="$store.state.loginstatus != null"
          style="font-size: 15px;"
          @click.native="to_person()"
        >
          <i class="el-icon-user"></i>
          <a>您好，{{ this.$store.state.name }} | 个人中心</a>
        </el-menu-item>
        <el-menu-item
          v-if="$store.state.loginstatus != null"
          style="font-size: 15px;"
          @click.native="exit_system()"
        >
          <i class="el-icon-switch-button"></i>
          <a>退出登录</a>
        </el-menu-item>
        <el-menu-item
          v-if="$store.state.loginstatus == null"
          style="font-size: 15px;"
          @click.native="to_login()"
        >
          <a>注册 | 登录</a>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main style="background-color: rgb(244, 247, 249);height: auto;">
      <!-- <div class="box_1">
        <div style="background-color: #C4DFF9"></div>
        <div style="background-color: ##C4DFF9"></div>
      </div> -->

      <div class="search_background">
        <el-card>
          <span class="u-tag yellow">出发地</span>
          <el-select
            class="test"
            v-model="departureid"
            clearable
            placeholder="请选择出发地"
          >
            <el-option
              v-for="item in departurePlatforms"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="u-tag blue">目的地</span>
          <el-select
            class="test"
            v-model="arrivalid"
            clearable
            placeholder="请选择目的地"
          >
            <el-option
              v-for="item in arrivalPlatforms"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="u-tag green">发车日期</span>
          <el-date-picker
            class="test"
            v-model="time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          {{ data }}
          <el-button
            type="warning"
            class="query"
            icon="el-icon-search"
            @click="ticketQuery()"
            >查询
          </el-button>
        </el-card>
      </div>
      <div class="box_2">
        <div style="background-color: rgb(244, 247, 249)"></div>
      </div>
      <div>
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
            <img
              :src="item"
              alt="Carousel Item"
              style="width: 100%;height: 100%;"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- <div class="box_1">
        <div style="background-color: #fff"></div>
        <div style="background-color: #fff"></div>
      </div> -->

      <!-- <div class="search-box" id="section_search">
        <input
          type="text"
          class="search-left"
          placeholder="请输入要搜索的内容"
        /><input
          type="button"
          class="search-right"
          value="搜 索"
          icon="el-icon-search"
          @click="to_trainlist()"
        />
      </div> -->

      <div class="cards-container" id="section_hot">
        <el-card class="box-card ">
          <div slot="header" class="clearfix">
            <span class="card_1 ">月度精选</span>
            <el-button style="float: right; padding: 3px 0"
              ><i
                class="el-icon-s-marketing"
                style="font-size: 35px;border: none;"
              ></i
            ></el-button>
          </div>
          <!-- <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div> -->
          <el-card class="small-card" style="background-color: #C4DFF9;">
            <div>
              <img
                src="@/assets/pages/train_1.jpg"
                class="train_pic"
                alt=""
                height="100px"
                width="160px"
                style="display: inline-block; vertical-align: top;"
              />
              <div style="display: inline-block; vertical-align: top;">
                <span class="image-text_1"> 和谐号动车组 </span>
                <br />
                <span class="u-tag blue">北京 —> 广州</span>
                <br />
                <div>
                  <span class="image-text_3"> 推荐指数 </span>
                  <el-rate
                    v-model="train_value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="3.7"
                  >
                  </el-rate>
                </div>
              </div>
            </div>
          </el-card>
          <br />
          <el-card class="small-card" style="background-color: #C4DFF9;">
            <div>
              <img
                src="@/assets/pages/train_2.jpg"
                class="train_pic"
                alt=""
                height="100px"
                width="160px"
                style="display: inline-block; vertical-align: top;"
              />
              <div style="display: inline-block; vertical-align: top;">
                <span class="image-text_1"> 复兴号动车组 </span>
                <br />
                <span class="u-tag blue">上海 —> 长沙</span>
                <br />
                <span class="image-text_3"> 推荐指数 </span>
                <el-rate
                  v-model="train_value_2"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="4.5"
                >
                </el-rate>
              </div>
            </div>
          </el-card>
          <br />
          <el-card class="small-card" style="background-color: #C4DFF9;">
            <div>
              <img
                src="@/assets/pages/train_3.jpg"
                class="train_pic"
                alt=""
                height="100px"
                width="160px"
                style="display: inline-block; vertical-align: top;"
              />
              <div style="display: inline-block; vertical-align: top;">
                <span class="image-text_1"> 复兴号智能动车组 </span>
                <br />
                <span class="u-tag blue">福州 —> 北京</span>
                <br />
                <span class="image-text_3"> 推荐指数 </span>
                <el-rate
                  v-model="train_value_3"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="5.0"
                >
                </el-rate>
              </div>
            </div>
          </el-card>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_2">优选餐食</span>
            <el-button style="float: right; padding: 3px 0"
              ><i
                class="el-icon-knife-fork"
                style="font-size: 35px;border: none;"
              ></i
            ></el-button>
          </div>
          <el-card class="small-card" style="background-color: #7cf0bb;">
            <div>
              <img
                src="@/assets/pages/food_1.jpg"
                class="train_pic"
                alt=""
                height="100px"
                width="160px"
                style="display: inline-block; vertical-align: top;"
              />
              <div style="display: inline-block; vertical-align: top;">
                <i
                  class="el-icon-dish-1"
                  style="font-size: 35px;border: none;"
                ></i>
                <br />
                <br />

                <span class="image-text_2"> 甄选双人套餐 10%OFF </span>
              </div>
            </div>
          </el-card>
          <br />
          <el-card class="small-card" style="background-color: #7cf0bb;">
            <div>
              <img
                src="@/assets/pages/food_2.jpg"
                class="train_pic"
                alt=""
                height="100px"
                width="160px"
                style="display: inline-block; vertical-align: top;"
              />
              <div style="display: inline-block; vertical-align: top;">
                <i
                  class="el-icon-burger"
                  style="font-size: 35px;border: none;"
                ></i>
                <br />
                <br />

                <span class="image-text_2"> 单人巨无霸套餐 15%OFF </span>
              </div>
            </div>
          </el-card>
          <br />
          <el-card class="small-card" style="background-color: #7cf0bb;">
            <div>
              <img
                src="@/assets/pages/food_3.jpg"
                class="train_pic"
                alt=""
                height="100px"
                width="160px"
                style="display: inline-block; vertical-align: top;"
              />
              <div style="display: inline-block; vertical-align: top;">
                <i
                  class="el-icon-food"
                  style="font-size: 35px;border: none;"
                ></i>
                <br />
                <br />

                <span class="image-text_2"> 三人欢聚套餐 10%OFF </span>
              </div>
            </div>
          </el-card>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_3">通知公告</span>
            <el-button style="float: right; padding: 3px 0"
              ><i
                class="el-icon-chat-line-round"
                style="font-size: 35px;border: none;"
              ></i
            ></el-button>
          </div>
          <el-card
            class="small-card"
            style="background-color: #cdf07c; height: 466px;"
          >
            <div>
              <img
                src="@/assets/pages/message_1.jpg"
                class="train_pic"
                alt=""
                height="100px"
                width="160px"
                style="display: inline-block; vertical-align: top;"
              />
              <div
                class="scrollable-div"
                style="display: inline-block; vertical-align: top;"
              >
                <div class="scrollable-content">
                  <span>第一行文字</span><br />
                  <span>第二行文字</span><br />
                  <span>第三行文字</span><br />
                  <span>第四行文字</span><br />
                  <span>第五行文字</span><br />
                </div>
              </div>
            </div>
          </el-card>
        </el-card>
      </div>

      <div class="box_1">
        <div style="background-color: rgb(244, 247, 249)"></div>
        <div style="background-color: rgb(244, 247, 249)"></div>
      </div>

      <div class="box_1">
        <div style="background-color: rgb(244, 247, 249)"></div>
        <div style="background-color: rgb(244, 247, 249)"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      train_value: 3.7,
      train_value_2: 4.5,
      train_value_3: 5.0,
      carouselItems: [
        require("@/assets/pages/3.jpg"),
        require("@/assets/pages/pic_1.jpg"),
        require("@/assets/pages/pic_2.png"),
        require("@/assets/pages/R.png"),
        require("@/assets/pages/pic_1.jpg")
      ]
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
    to_login() {
      // 清空全局变量
      // this.$store.state.name = null;
      // this.$store.state.id = null;
      // this.$store.state.platformnum = null;
      // this.$store.state.loginstatus = null;
      // this.$store.state.trainid = null;
      // this.$store.state.departurePlatformId = null;
      // this.$store.state.arrivalPlatformId = null;
      // this.$store.state.departureTime = null;
      // this.$store.state.arrivalTime = null;
      // this.$store.state.platformNum = null;
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
      // this.$router.push("/MainPage");
    },
    to_trainlist() {
      this.$router.push("/trainlist");
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes scrollUp {
  0% {
    top: 0;
  }
  20% {
    top: 0;
  }
  25% {
    top: -20px; /* 每次滚动的距离，根据文本行高和数量进行调整 */
  }
  100% {
    top: -80px; /* 滚动的总距离，根据文本行高和数量进行调整 */
  }
}
.scrollable-div {
  height: 80px; /* 设置滚动区域的高度 */
  overflow: hidden; /* 隐藏溢出内容 */
  position: relative;
}

.scrollable-content {
  position: absolute;
  animation: scrollUp 10s infinite linear; /* 定义滚动动画 */
}

.image-text_1 {
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}
.image-text_2 {
  color: rgb(69, 77, 77);
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}
.small-card {
}
.search_background {
  background-image: url("~@/assets/pages/search_background.png");
  background-size: cover;
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

.yellow {
  color: #ff9000;
  background: #fff9f0;
}
.blue {
  color: #0079dd;
  background: #f0f7fd;
}
.green {
  color: #00dd7a;
  background: #f0f7fd;
}
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
  background-color: #ffe68a !important;
}

.el-menu-demo .el-menu-item a {
  text-decoration: none;
  color: #000000;
  font-size: 16px;
  /* 设置菜单项文本字体大小 */
  // font-weight: bold;
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

.box_1 > div {
  //   height: 100%;
  flex: 1;
}

.box_2 {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
}

.box_2 > div {
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
