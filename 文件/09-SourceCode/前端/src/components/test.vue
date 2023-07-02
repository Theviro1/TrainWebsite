<!-- <template>
    <div>
        <div class="background"></div>
        
        <div class="head">
            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                background-color="transparent" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </div>

        <div class="zindex1">
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3 class="medium"></h3>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="zindex1">
            <div class="search-box">
                <input type="text" class="search-left" placeholder="请输入要搜索的内容" /><input type="button" class="search-right"
                    value="搜 索" icon="el-icon-search" />
            </div>
        </div>

        <div class="zindex1">
            <div class="box_1">
                <div title="左" style="background-color: rgb(121, 56, 106)"></div>
                <div title="右" style="background-color: rgb(57, 107, 179)"></div>
            </div>
        </div>


        <div class="box_1">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{ "列表内容 " + o }}
                </div>
            </el-card>
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
        }
    }
};
</script>
  
<style lang="less" scoped>
.background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: #faf3ea;
    margin-top: 0px;
}

.head {
    z-index: 1;
    margin: 20px;
}

.zindex1 {
    z-index: 1;
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
}
</style>
   -->