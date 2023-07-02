<template>
  <div>
    <el-card><img class="img" src="./1.jpg" alt="" height="200" width="200"/>
      <el-descriptions class="margin-top" :column="1" border> 
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-message"></i>
            邮箱Email
          </template>
          {{ email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号码
          </template>
          {{ phonenum }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money"></i>
            账户余额
          </template>
          {{ balance }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
  
<script>
import axios from "axios"
export default {
  data() {
    return {
      userid: '',
      username: '',
      phonenum: '',
      email: '',
      balance: '',
    };
  },
  created() {
    this.GetUser();
  },
  methods: {
    async GetUser() {
      await axios
        .get("http://123.57.3.84/oneUser", { params: { id: this.$store.state.id } })
        .then((res) => {
          console.log(res)
          if (res.data.success == true) {
            this.username = res.data.data.name;
            this.phonenum = res.data.data.phoneNum;
            this.email = res.data.data.email;
            this.balance = res.data.data.balance;
            this.balance=res.data.data.balance;
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

</style>
  