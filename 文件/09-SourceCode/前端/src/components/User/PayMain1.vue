<template>
    <el-container class="home_container">
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }" class="myColor">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/payall' }" class="myColor">我的订单</el-breadcrumb-item>
                <el-breadcrumb-item class="myColor">支付订单</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-card>
            <div class="pay-info">
                <span class="icon iconfont icon-queren2"></span>
                <div class="tip">
                    <p>订单提交成功！请尽快完成支付。</p>
                    <br>
                    <div style="font-size: 14px;color: #666;">剩余支付时间（超时自动关闭）</div>
                    <br>
                    <div class="time"><i class="el-icon-time"></i>{{ day }}天 {{ hr }}小时 {{ min }}分钟 {{ sec }}秒 </div>

                </div>
                <div class="amount">
                    <span>应付总额：</span>
                    <span>¥{{ $route.query.id }}</span>
                </div>
            </div>
            <div class="pay-type">
                <div class="item">
                    <h3>进行支付</h3>
                    <a class="btn wx" href="javascript:;" @click="Pay"></a>
                </div>
            </div>
        </el-card>
    </el-container>
</template>
  
<script>
import axios from "axios"
export default {
    name: "XtxPayPage",
    data() {
        return {
            min: 0,
            sec: 0,
            hr: 0,
            day: 0,
            price: ''
        }
    },
    created() {
        // this.countdown()
    },
    // mounted() {
    //   this.countdown()
    // },
    methods: {
        async Pay() {
            this.$message({
                type: 'success',
                message: '差价支付成功！'
            });
            this.$router.push({
                path: '/PayedOrder'
                // html取参: $route.query.id script取参: this.$route.query.id
            });
        },
        //倒计时
        countdown() {
            const end = Date.parse(new Date('2023-06-30 13:40:00'))
            const now = Date.parse(new Date())
            const msec = end - now

            console.log(msec)
            if (msec < 0) return;

            let day = parseInt(msec / 1000 / 60 / 60 / 24)
            let hr = parseInt(msec / 1000 / 60 / 60 % 24)
            let min = parseInt(msec / 1000 / 60 % 60)
            let sec = parseInt(msec / 1000 % 60)
            this.day = day
            this.hr = hr > 9 ? hr : '0' + hr
            this.min = min > 9 ? min : '0' + min
            this.sec = sec > 9 ? sec : '0' + sec
            const that = this
            if (min >= 0 && sec >= 0 && day >= 0 && hr >= 0) {
                //倒计时结束关闭订单
                if (min == 0 && sec == 0 && day == 0 && hr == 0) {

                    return
                }
                setTimeout(function () {
                    that.countdown()
                }, 1000)
            }
        }

    }

}

</script>
<style scoped lang="less">
.container {
    margin-top: 0dp;
}

.pay-info {
    background: #f3f1f1;
    display: flex;
    align-items: center;
    height: 240px;
    padding: 0 80px;

    .icon {
        font-size: 80px;
        color: #1dc779;
    }

    .tip {
        padding-left: 10px;
        flex: 1;

        p {
            &:first-child {
                font-size: 20px;
                margin-bottom: 5px;
            }

            &:last-child {
                color: #999;
                font-size: 16px;
            }
        }
    }

    .amount {
        span {
            &:first-child {
                font-size: 16px;
                color: #999;
            }

            &:last-child {
                color: #1dc779;
                font-size: 20px;
            }
        }
    }
}

.pay-type {
    margin-top: 20px;
    background-color: #fff;
    padding-bottom: 70px;

    p {
        line-height: 70px;
        height: 70px;
        padding-left: 30px;
        font-size: 16px;

        &.head {
            border-bottom: 1px solid #f5f5f5;
        }
    }

    .btn {
        width: 150px;
        height: 50px;
        border: 1px solid #e4e4e4;
        text-align: center;
        line-height: 48px;
        margin-left: 30px;
        color: #666666;
        display: inline-block;

        &.active,
        &:hover {
            border-color: #1ec294;
        }

        &.alipay {
            background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
        }

        &.wx {
            background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
        }
    }

    .home_container {
        height: 100%;
    }

    .myColor /deep/ .el-breadcrumb__inner {
        color: black;
    }
}

.home_container {
    height: 100%;
}

.myColor /deep/ .el-breadcrumb__inner {
    color: black;
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

.el-header {
    background-color: #e5efe2;
    color: #333;
    line-height: 60px;
}

.el-aside {
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
  