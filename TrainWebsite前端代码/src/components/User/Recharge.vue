<template>
    <div id="building" style="width: 80%;">
            <ul class="msg-box">
                <h2>我要充值</h2>
                <li>
                    <h3 style="margin-bottom: 15px;">请选择金额</h3>
                    <br>
                    <el-radio-group v-model="money" @change="amountChange">
                        <el-radio border :label="'' + 100">充值100</el-radio>
                        <el-radio border :label="'' + 500">充值500</el-radio>
                        <el-radio border :label="'' + 1000">充值1000</el-radio>
                        <el-radio border :label="'' + 2000">充值2000</el-radio>
                        <el-radio border :label="'' + 5000">充值5000</el-radio>
                    </el-radio-group>
                </li>
            </ul>
            <div style="text-align: center; margin-top: 30px;">
                <el-button type="primary" @click="recharge">确认支付</el-button>
            </div>
    </div>
</template>
    
<script>
import axios from "axios"
export default {
    data() {
        return {
            userid: '',
            money: '',
        };
    },
    methods: {
        amountChange(val) {
            this.money = val;
        },
        async recharge() {
            console.log(this.money)
            this.$confirm('确认充值吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(async () => {
                await axios
                    .put("http://localhost:80/users/recharge", { userId: this.$store.state.id, payNum: this.money })
                    .then((res) => {
                        console.log(res)
                        console.log(res.data.success == true)
                        if (res.data.success == true) {
                            this.$message({
                                message: "充值成功",
                                type: 'success',
                            })
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'error',
                            })
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '充值失败'
                });
            });

        }
    },
};
</script>
    
<style scoped>
/* 信息列表样式 */
.msg-box>li {
    list-style: none;
    border-bottom: 1px solid #c5c5c5;
    padding: 20px 10px;
}

#building {
    background: url("./3.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
</style>