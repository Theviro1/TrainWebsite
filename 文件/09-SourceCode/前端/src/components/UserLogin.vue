<template>
  <div :class="['container', { 'sign-up-mode': isLogin }]">
    <div class="form-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">登录</h2>
          <div class="login_main">
            <div class="input-field">
              <i class="fa fa-soild fa-credit-card "></i>
              <input type="text" placeholder="身份证号码" v-model="id_login" />
            </div>
            <div class="input-field" style="width:400px">
              <i class="fa fa-soild fa-lock"></i>
              <input type="password" placeholder="密码" v-model="password_login" />
            </div>
          </div>
          <div>
            <el-radio-group v-model="radio">
              <el-radio :label="3">用户</el-radio>
              <el-radio :label="6">系统管理员</el-radio>
              <el-radio :label="9">铁路系统员</el-radio>
            </el-radio-group>
          </div>
          <input type="input" value="立即登录" class="btn solid" @click="login()" style="text-align:center" />
          <!-- <button class="btn" @click="login()">
            立即登录
          </button> -->
          <p class="social-text">通过其他方式</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fa fa-brands fa-qq"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fa fa-brands fa-weixin"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fa fa-brands fa-weibo"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fa fa-apple"></i>
            </a>
          </div>
        </form>
        <form action="#" class="sign-up-form">
          <h2 class="title">注册</h2>
          <div class="input-field">
            <i class="fa fa-soild fa-credit-card "></i>
            <input type="text" placeholder="身份证号码" v-model="sign_up_form.id" />
          </div>
          <div class="input-field">
            <i class="fa fa-soild fa-user"></i>
            <input type="text" placeholder="用户名" v-model="sign_up_form.name" />
          </div>
          <!-- <div class="input-field">
            <i class="fa fa-soild fa-envelope"></i>
            <input type="email" placeholder="邮箱" />
          </div> -->
          <div class="input-field">
            <i class="fa fa-soild fa-lock"></i>
            <input type="password" placeholder="密码" v-model="sign_up_form.password" />
          </div>
          <div class="input-field">
            <i class="fa fa-soild fa-key"></i>
            <input type="password" placeholder="确认密码" v-model="confirm_signup" />
          </div>
          <!-- <button class="btn" @click="isLogin = !isLogin">
            立即注册
          </button> -->
          <!-- <button class="btn" @click="sign_up()">
            立即注册
          </button> -->
          <input type="input" value="立即注册" class="btn solid" @click="sign_up()" style="text-align:center" />
          <div>
            <el-radio-group v-model="signup_radio">
              <el-radio :label="2">用户</el-radio>
              <el-radio :label="4">系统管理员</el-radio>
              <el-radio :label="8">铁路系统员</el-radio>
            </el-radio-group>
          </div>
          <p class="social-text">通过其他方式</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fa fa-brands fa-qq"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fa fa-brands fa-weixin"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fa fa-brands fa-weibo"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fa fa-apple"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>加入我们</h3>
          <p>加入我们，成为本站的一份子。</p>
          <button class="btn transparent" @click="isLogin = !isLogin">
            去注册
          </button>
        </div>
        <img src="@/assets/signin.svg" class="image" alt="" />
      </div>

      <div class="panel right-panel">
        <div class="content">
          <h3>已有帐号？</h3>
          <p>立即登录已有帐号，使用本站完整功能。</p>
          <button class="btn transparent" @click="isLogin = !isLogin">
            去登录
          </button>
        </div>
        <img src="@/assets/signup.svg" class="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    var checkusername = (rule, value, callback) => {
      const regusername = /^[\u4e00-\u9fa5]{2,}$/;
      if (regusername.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的姓名"));
    };
    return {
      isLogin: false,
      radio: 3,
      signup_radio: 2,
      id_login: "",
      password_login: "",
      id_signup: "",
      name_signup: "",
      password_signup: "",
      confirm_signup: "",
      regusername: /^[\u4e00-\u9fa5]{2,}$/,
      regid: /^\d{8}$/,
      regpassword: /^(?=.*[a-zA-Z])(?=.*\d).{8,18}$/,

      sign_up_form: {
        id: "",
        name: "",
        password: "",
        balance: 0,
        email: "",
        phoneNum: "",
      }
      // name_rule:{
      //   name_signup:[{ required: true, message: '请输入姓名', trigger: 'blur' },
      //     { validator: checkusername, trigger: 'blur' },]
      // }
    };
  },
  created() {
    console.log(this.radio);
    this.$store.commit('saveloginstatus', '');
    console.log(this.$store.state.loginstatus);
  },
  methods: {
    async login() {
      console.log(this.radio);
      if (this.radio === 3) {
        console.log(this.id_login);
        console.log(this.password_login);
        await axios
          .get("http://123.57.3.84/users/login", {
            params: { id: this.id_login, password: this.password_login }
          })
          .then(res => {
            console.log(res);
            if (res.data.success == true) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
              //window.sessionStorage.setItem('token', res.data.token)
              this.$store.commit('saveloginstatus', this.radio);
              console.log(res.data.data);
              this.$store.commit('saveid', res.data.data.id);
              this.$store.commit('savename', res.data.data.name);
              console.log(this.$store.state.loginstatus);
              this.$router.push("/MainPage");
            } else {
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }
          });
      } else if (this.radio == 9) {
        console.log(this.id_login);
        console.log(this.password_login);
        await axios
          .get("http://123.57.3.84/trainAdmin/login", {
            params: { id: this.id_login, password: this.password_login }
          })
          .then(res => {
            console.log(res);
            if (res.data.success == true) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
              this.$store.commit('saveloginstatus', this.radio);
              console.log(this.$store.state.loginstatus);
              this.$router.push("/trains");
            } else {
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }
          });

      } else {
        console.log(this.id_login);
        console.log(this.password_login);
        await axios
          .get("http://123.57.3.84/userAdmin/login", {
            params: { id: this.id_login, password: this.password_login }
          })
          .then(res => {
            console.log(res);
            if (res.data.success == true) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
              this.$store.commit('saveloginstatus', this.radio);
              console.log(this.$store.state.loginstatus);
              this.$router.push("/users");
            } else {
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }
          });

      }
    },

    async sign_up() {
      // console.log(this.)
      if (!this.regid.test(this.sign_up_form.id)) {
        this.$message.error('请输入合法的身份证号码');
      }
      else if (!this.regusername.test(this.sign_up_form.name)) {
        this.$message.error('请输入合法的姓名');
      }
      else if (!this.regpassword.test(this.sign_up_form.password)) {
        this.$message.error('请输入合法的密码');

      }
      else if (this.sign_up_form.password != this.confirm_signup) {
        this.$message.error('两次密码必须一致');
      }
      else {
        if (this.signup_radio === 2) {
          // console.log(this.id_login);
          console.log(this.sign_up_form);
          await axios
            .post("http://123.57.3.84/users/add", this.sign_up_form)
            .then(res => {
              console.log(res);
              if (res.data.success == true) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                //window.sessionStorage.setItem('token', res.data.token)
                // this.$store.commit('saveloginstatus',this.radio);
                // console.log(this.$store.state.loginstatus);
                // this.$router.push("/MainPage");
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              }
            });
        } else if (this.radio == 8) {
          console.log(this.sign_up_form);
          await axios
            .post("http://123.57.3.84/trainAdmin/add", this.sign_up_form)
            .then(res => {
              console.log(res);
              if (res.data.success == true) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                //window.sessionStorage.setItem('token', res.data.token)
                // this.$store.commit('saveloginstatus',this.radio);
                // console.log(this.$store.state.loginstatus);
                // this.$router.push("/MainPage");
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              }
            });

        } else {
          console.log(this.sign_up_form);
          await axios
            .post("http://123.57.3.84/userAdmin/add", this.sign_up_form)
            .then(res => {
              console.log(res);
              if (res.data.success == true) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                //window.sessionStorage.setItem('token', res.data.token)
                // this.$store.commit('saveloginstatus',this.radio);
                // console.log(this.$store.state.loginstatus);
                // this.$router.push("/MainPage");
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              }
            });
        }
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.login_main>.input-field {
  margin-bottom: 20px;
  /* 设置你想要的间距值 */
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }

  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }

  .panel .content {
    padding: 0.5rem 1rem;
  }

  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}
</style>
