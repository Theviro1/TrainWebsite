<template>
    <el-container>
        <el-header>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>火车信息</el-breadcrumb-item>
                <el-breadcrumb-item>可选择列表</el-breadcrumb-item>
                <el-breadcrumb-item>车次信息</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-container>

            <el-main>
                <el-dialog :visible.sync="logDialogVisible">
                    <span>您确定改签为本火车的{{ nowseat.seattype }},座位号为{{ nowseat.seatid
                    }},价格为{{ nowseat.seatprice }}元吗?</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="logDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="logDialogVisible = false; createOrder();">确 定</el-button>
                    </span>
                </el-dialog>

                <el-card>
                    <el-descriptions title="车次信息" border :column="2">
                        <el-descriptions-item label="火车序号">{{ trains.trainid }}</el-descriptions-item>
                        <el-descriptions-item label="经停站数">{{ trains.platformNum }}</el-descriptions-item>
                        <el-descriptions-item label="起始站">{{ idChange(trains.departurePlatformId) }}</el-descriptions-item>
                        <el-descriptions-item label="终点站">{{ idChange(trains.arrivalPlatformId) }}</el-descriptions-item>
                        <el-descriptions-item label="发车时间">{{ trains.departureTime }}</el-descriptions-item>
                        <el-descriptions-item label="终点时间">{{ trains.arrivalTime }}</el-descriptions-item>
                        <el-descriptions-item label="经济票余量">{{ trains.economyNum }}</el-descriptions-item>
                        <el-descriptions-item label="经济票价格">{{ trains.economyPrice }}</el-descriptions-item>
                        <el-descriptions-item label="商务票余量">{{ trains.businessNum }}</el-descriptions-item>
                        <el-descriptions-item label="商务票价格">{{ trains.businessPrice }}</el-descriptions-item>
                        <el-descriptions-item label="头等票余量">{{ trains.firstNum }}</el-descriptions-item>
                        <el-descriptions-item label="头等票价格">{{ trains.firstPrice }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>

                <el-row :gutter="10">

                    <el-col :span="14">
                        <span>经济座</span>
                        <el-card>
                            <div id="group">
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(21)"
                                        :disabled="isDisabled(21)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(22)"
                                        :disabled="isDisabled(22)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(23)"
                                        :disabled="isDisabled(23)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(24)"
                                        :disabled="isDisabled(24)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(25)"
                                        :disabled="isDisabled(25)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(26)"
                                        :disabled="isDisabled(26)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(27)"
                                        :disabled="isDisabled(27)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(28)"
                                        :disabled="isDisabled(28)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(29)"
                                        :disabled="isDisabled(29)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(30)"
                                        :disabled="isDisabled(30)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(31)"
                                        :disabled="isDisabled(31)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(32)"
                                        :disabled="isDisabled(32)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(33)"
                                        :disabled="isDisabled(33)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(34)"
                                        :disabled="isDisabled(34)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(35)"
                                        :disabled="isDisabled(35)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                            </div>
                            <div id="group">
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(36)"
                                        :disabled="isDisabled(36)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(37)"
                                        :disabled="isDisabled(37)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(38)"
                                        :disabled="isDisabled(38)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(39)"
                                        :disabled="isDisabled(39)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(40)"
                                        :disabled="isDisabled(40)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(41)"
                                        :disabled="isDisabled(41)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(42)"
                                        :disabled="isDisabled(42)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(43)"
                                        :disabled="isDisabled(43)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(44)"
                                        :disabled="isDisabled(44)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(45)"
                                        :disabled="isDisabled(45)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(46)"
                                        :disabled="isDisabled(46)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(47)"
                                        :disabled="isDisabled(47)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(48)"
                                        :disabled="isDisabled(48)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(49)"
                                        :disabled="isDisabled(49)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(50)"
                                        :disabled="isDisabled(50)" class="seat_1" style="width:40px" type="success"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="4">
                        <span>商务座</span>
                        <el-card style="width:340px">
                            <div id="group">
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(11)"
                                        :disabled="isDisabled(11)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(12)"
                                        :disabled="isDisabled(12)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(13)"
                                        :disabled="isDisabled(13)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(14)"
                                        :disabled="isDisabled(14)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(15)"
                                        :disabled="isDisabled(15)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                            </div>
                            <div id="group">
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(16)"
                                        :disabled="isDisabled(16)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(17)"
                                        :disabled="isDisabled(17)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(18)"
                                        :disabled="isDisabled(18)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(19)"
                                        :disabled="isDisabled(19)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button class="seat_1" @click="logDialogVisible = choosePassengerFirst(20)"
                                        :disabled="isDisabled(20)" style="width:40px" type="warning" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                            </div>

                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <span style="margin-left:160px">头等座</span>
                        <el-card class="p1" style="margin-left:70px;width:340px">
                            <div id="group">
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(1)" :disabled="isDisabled(1)"
                                        class="seat_1" style="width:40px" type="danger" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(2)" :disabled="isDisabled(2)"
                                        class="seat_1" style="width:40px" type="danger" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(3)" :disabled="isDisabled(3)"
                                        class="seat_1" style="width:40px" type="danger" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(4)" :disabled="isDisabled(4)"
                                        class="seat_1" style="width:40px" type="danger" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(5)" :disabled="isDisabled(5)"
                                        class="seat_1" style="width:40px" type="danger" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                            </div>
                            <div id="group">
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(6)" :disabled="isDisabled(6)"
                                        class="seat_1" style="width:40px" type="danger" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(7)" :disabled="isDisabled(7)"
                                        class="seat_1" style="width:40px" type="danger" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(8)" :disabled="isDisabled(8)"
                                        class="seat_1" style="width:40px" type="danger" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(9)" :disabled="isDisabled(9)"
                                        class="seat_1" style="width:40px" type="danger" icon="el-icon-s-shop"
                                        size="mini"></el-button>
                                </div>
                                <div>
                                    <el-button @click="logDialogVisible = choosePassengerFirst(10)"
                                        :disabled="isDisabled(10)" class="seat_1" style="width:40px" type="danger"
                                        icon="el-icon-s-shop" size="mini"></el-button>
                                </div>
                            </div>

                        </el-card>
                    </el-col>
                </el-row>

            </el-main>
        </el-container>
    </el-container>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            dialogVisible: false,
            dialogFormVisible: false,
            logDialogVisible: false,
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                identity: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { min: 8, max: 8, message: '请输入合法身份证', trigger: 'blur' }
                ]
            },
            formLabelWidth: '120px',
            form: {
                name: '',
                identity: '',
            },
            trains: { trainid: '', arrivalPlatformId: '', departurePlatformId: '', departureTime: '', arrivalTime: '', platformNum: '', economyPrice: 200, economyNum: '', businessPrice: 300, businessNum: '', firstPrice: 500, firstNum: '', },
            passenger_options: [],
            nowseat: {
                seatid: '',
                seattype: '',
                seatprice: '',
            },
            createrid: '',
            creatername: '',
            passenger: '',
            trainseat: [],
            selectedPassenger: []
        }
    },
    // 方法函数
    methods: {
        // 待添加乘客是否合法
        isDisabledPassenger(id) {
            for (let i = 0; i < this.selectedPassenger.length; i++) {
                if (this.selectedPassenger[i] == id) {
                    return true;
                }
            }
            return false;
        },
        // 选座
        choosePassengerFirst(type) {
            if (type >= 1 && type <= 10) {
                this.nowseat.seatprice = 500;
                this.nowseat.seattype = '头等票';
            }
            if (type >= 11 && type <= 20) {
                this.nowseat.seatprice = 300;
                this.nowseat.seattype = '商务票';
            }
            if (type >= 21 && type <= 50) {
                this.nowseat.seatprice = 200;
                this.nowseat.seattype = '经济票';
            }
            this.nowseat.seatid = type;
            return true;
        },
        // 创建订单
        createOrder() {
            // 向数据库发送创建订单请求
            this.postCreateSeat();
            this.selectedPassenger.push(this.passenger);
        },
        setFormInf() {
            this.form.name = null;
            this.form.identity = null;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({
                        type: 'success',
                        message: '添加乘客成功!'
                    });
                    this.passenger_options.push({ passengerid: this.form.identity, passengername: this.form.name, disabled: true });
                    this.setFormInf();
                    this.dialogFormVisible = false;
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getSeatNum() {
            let cnt1 = 0, cnt2 = 0, cnt3 = 0;
            this.trainseat.forEach(item => {
                if (item.id >= 1 && item.id <= 10) cnt1++;
                if (item.id >= 11 && item.id <= 20) cnt2++;
                if (item.id >= 21 && item.id <= 50) cnt3++;
            });
            this.trains.economyNum = cnt3;
            this.trains.businessNum = cnt2;
            this.trains.firstNum = cnt1;
        },
        isDisabled(id) {
            let vaild = true;
            this.trainseat.forEach(item => {
                if (item.id == id)
                    vaild = false;
            });
            return vaild;
        },
        idChange(id) {
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
        async getTrainSeat() {
            console.log("尝试调取合法座位")
            await axios.get('http://localhost:80/seat',
                {
                    params: {
                        trainId: this.trains.trainid,
                        departurePlatformId: this.trains.departurePlatformId,
                        arrivalPlatformId: this.trains.arrivalPlatformId
                    }
                })
                .then((res) => {
                    console.log("成功获取合法座位：")
                    console.log(res);
                    const { data } = res.data
                    this.trainseat = [];
                    this.trainseat = data;
                    this.getSeatNum();
                })

        },
        async postCreateSeat() {
            await axios.put('http://localhost:80/orders/availableTrain2/' + this.$route.query.id + '/' + this.trains.trainid + '/' + this.nowseat.seatid)
                .then((res) => {
                    console.log(res);
                    console.log(res.data.success);
                    if (res.data.success == true) {
                        if (res.data.data) {
                            this.$message({
                                type: 'success',
                                message: res.data.message + '' + res.data.data + '元'
                            });
                            this.$router.push({
                                path: 'PayMain1',
                                query: { id: res.data.data }
                            })
                        }
                        else {
                            this.$message({
                                type: 'success',
                                message: res.data.message
                            });
                            this.$router.push({
                                path: 'PayedOrder'
                            })
                        }

                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                })
        },
    },
    created() {
        this.trains.trainid = this.$store.state.trainid;
        this.trains.departurePlatformId = this.$store.state.departureid;
        this.trains.arrivalPlatformId = this.$store.state.arrivalid;
        this.trains.departureTime = this.$store.state.departureTime;
        this.trains.arrivalTime = this.$store.state.arrivalTime;
        this.trains.platformNum = this.$store.state.platformNum;
        this.createrid = this.$store.state.id;
        this.creatername = this.$store.state.name;
        this.passenger_options.push({ passengerid: this.createrid, passengername: this.creatername, disabled: true });
        this.getTrainSeat();
    }
}
</script>
<style scoped>
#group {
    display: flex;
    justify-content: space-between;
}

.p3 {
    background-color: #1d3a57;
}

.el-breadcrumb {
    position: fixed;
    margin-top: 15px;
}

.el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
}


.el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 80px;
}

body>.el-container {
    margin-bottom: 40px;
}
</style>