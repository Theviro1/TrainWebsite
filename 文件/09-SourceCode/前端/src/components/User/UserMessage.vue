<template>
    <div id="building" style="width: 80%;">
        <br><br>
        <el-form ref="form" :model="addForm" label-width="100px" :rules="Rules">
            <el-form-item prop="name" >
                <span slot="label">
                    <span style="color: black;font-weight: bold;">姓名</span>
                </span>
                <el-col :span="8">
                    <el-input v-model="addForm.name" clearable id="name"></el-input></el-col>
            </el-form-item>
            <el-form-item prop="password">
                <span slot="label">
                    <span style="color: black;font-weight: bold;">密码</span>
                </span>
                <el-col :span="8">
                    <el-input v-model="addForm.password" clearable id="password"></el-input></el-col>
            </el-form-item>
            <el-form-item prop="email">
                <span slot="label">
                    <span style="color: black;font-weight: bold;">Email</span>
                </span>
                <el-col :span="8">
                    <el-input v-model="addForm.email" clearable id="email"></el-input></el-col>
            </el-form-item>
            <el-form-item prop="phonenum">
                <span slot="label">
                    <span style="color: black;font-weight: bold;">手机号</span>
                </span>
                <el-col :span="8">
                    <el-input v-model="addForm.phonenum" clearable id="phonenum"></el-input></el-col>
            </el-form-item>
            <el-button type="primary" plain round style="font-size:10px;" @click="update">修 改</el-button>
        </el-form>
    </div>
</template>
    
<script>
import axios from "axios"
export default {
    created() {
        this.GetUser();
    },
    data() {
        var checkName = (rule, value, callback) => {
            const regusername = /^[\u4e00-\u9fa5]{2,}$/;
            if (regusername.test(value)) {
                return callback();
            }
            callback(new Error("请输入合法的姓名"));
        }
        var checkPassword = (rule, value, callback) => {
            const regpassword = /^(?=.*[a-zA-Z])(?=.*\d).{8,18}$/;
            if (regpassword.test(value)) {
                return callback();
            }
            callback(new Error("请输入合法的密码"));
        }
        var checkEmail = (rule, value, callback) => {
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (regEmail.test(value)) {
                return callback();
            }
            callback(new Error("请输入合法的邮箱"));
        }
        var checkPhonenum = (rule, value, callback) => {
            const regMobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if (regMobile.test(value)) {
                return callback();
            }
            callback(new Error("请输入合法的手机号"));
        }
        return {
            userid: '',
            username: '',
            phonenum: '',
            email: '',
            balance: '',
            addForm: {
                id: '',
                name: '',
                password: '',
                banlance: '',
                email: '',
                phoneNum: '',
            },
            Rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { validator: checkName, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: checkPassword, trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入新的邮箱号', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' },
                ],
                phonenum: [
                    { required: true, message: '请输入新的手机号', trigger: 'blur' },
                    { validator: checkPhonenum, trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        async update() {
            console.log(1);
            this.$confirm('确定修改吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                this.addForm.name = document.getElementById('name').value;
                this.addForm.password = document.getElementById('password').value;
                this.addForm.email = document.getElementById('email').value;
                this.addForm.phoneNum = document.getElementById('phonenum').value;
                await axios
                    .put("http://123.57.3.84/users/update", this.addForm)
                    .then((res) => {
                        console.log(res)
                        if (res.data.success == true) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                            });
                            this.GetUser();
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
                    message: '修改失败'
                });
            });

        },
        async GetUser() {
            await axios
                .get("http://123.57.3.84/oneUser", { params: { id: this.$store.state.id } })
                .then((res) => {
                    console.log(res)
                    if (res.data.success == true) {
                        this.userid = res.data.data.id;
                        this.username = res.data.data.name;
                        this.phonenum = res.data.data.phonenum;
                        this.email = res.data.data.email;
                        this.balance = res.data.data.balance;
                        this.addForm.balance = res.data.data.balance;
                        this.addForm.id=res.data.data.id;
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'error',
                        })
                    }
                })
        },
    },
};
</script>
    
<style scoped>
.me-video-player {
    background-color: transparent;
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    position: fixed;
    left: 0;
    z-index: 0;
    top: 0;
}

.PersonTop {
    width: 1000px;
    height: 140px;
    padding-top: 20px;
    background-color: white;
    margin-top: 30px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    border-radius: 5px;
}

.PersonTop_img {
    width: 150px;
    height: 120px;
    background-color: #8c939d;
    margin-right: 24px;
    margin-left: 20px;
    overflow: hidden;
    border-radius: 20px;
}

.PersonTop_img img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
}

.PersonTop_text {
    height: 120px;
    width: 880px;
    display: flex;
}

.user_text {
    width: 60%;
    height: 100%;
    line-height: 45px;
}

.user_name {
    font-size: 35px;
    font-weight: bold;
}

.user-v {
    margin-bottom: -10px;
}

.user-v-font {
    font-size: 15px;
    color: #00c3ff;
}

.user_qianming {
    font-size: 20px;
    color: #999;
}

.user_num {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
}

.user_num>div {
    text-align: center;
    box-sizing: border-box;
    width: 80px;
    height: 40px;
    line-height: 20px;
}

.num_text {
    color: #999;
}

.num_number {
    font-size: 20px;
    color: #333;
}

.el-menu-item>span {
    font-size: 16px;
    color: #999;
}

/*下面部分样式*/
.person_body {
    width: 1000px;
    margin-top: 210px;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
}

.person_body_left {
    width: 100%;
    height: 600px;
    border-radius: 5px;
    margin-right: 3%;
    text-align: center;
}

.person_body_list {
    width: 100%;
    height: 50px;
    margin-top: 25px;
    font-size: 22px;
    border-bottom: 1px solid #f0f0f0;
}

.el-menu-item {
    margin-top: 22px;
}

.el-button {
    display: block;
    margin: 0 auto;
}

.person_body_right {
    width: 70%;
    /* height: 500px; */
    border-radius: 5px;
    background-color: white;
}

.box-card {
    height: 500px;
}

/*ui样式*/
.el-button {
    width: 84px;
}

#building {
    background: url("./2.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
</style>
    