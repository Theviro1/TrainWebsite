<template>
  <div class="main">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-with-margin" style="opacity: 0.7;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="opacity: 0.7;">
      <el-row :gutter="20"><!-- gutter是指定每个分栏的间隔 -->
        <!-- 分栏一共占24格，给搜索框7格，添加按钮4格 -->
        <el-col :span="20">
          <!-- 搜索与添加区域 -->
          <el-input v-model="query" placeholder="请输入内容" clearable @clear="getUsersList()">
            <el-button slot="append" icon="el-icon-search" @click="searchUsersList(query)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="AddUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- <div style="select_a">
        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
      </div> -->
      <el-table :data="userList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" ref="singleTable" border stripe
        :default-sort="{ prop: 'name', order: 'descending' }" highlight-current-row ><!-- 带边框、斑马纹 -->

        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name" sortable width="80"></el-table-column>
        <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
        <el-table-column label="电话" prop="phoneNum" width="115"></el-table-column>
        <el-table-column label="身份证号码" prop="id" width="170"></el-table-column>
        <el-table-column label="密码" prop="password" width="155"></el-table-column>
        <el-table-column label="余额" prop="balance" sortable width="85"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange"
        :current-page.sync="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination> -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="userList.length" background>
      </el-pagination>
    </el-card>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(userList[1])">选中第一行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
    <el-dialog :visible.sync="AddDialogVisible" title="添加用户信息" width="30%" @close="addDialogClosed('form')">
      <el-form ref="form" :model="addForm" :rules="addUserRules" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNum">
          <el-input v-model="addForm.phoneNum" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="id">
          <el-input v-model="addForm.id" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model="addForm.balance" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="saveForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="editDialogVisible" title="修改用户信息" width="30%" @close="editDialogClosed('form')">
      <el-form ref="Edit_Form" :model="editForm" :rules="EditUserRules" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNum">
          <el-input v-model="editForm.phoneNum" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="id">
          <el-input v-model="editForm.id" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model="editForm.balance" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditForm">取 消</el-button>
        <el-button type="primary" @click="saveEditForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios"; //引入axios
//import mock from "../mock/mock.js"; //引入mock
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    var checkphoneNum = (rule, value, callback) => {
      const regphoneNum = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (regphoneNum.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };
    var checkPassword = (rule, value, callback) => {
      const regpassword = /^(?=.*[a-zA-Z])(?=.*\d).{8,18}$/;
      if (regpassword.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的密码"));
    };
    var checkusername = (rule, value, callback) => {
      const regusername = /^[\u4e00-\u9fa5]{2,}$/;
      if (regusername.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的姓名"));
    };
    var checkid = (rule, value, callback) => {
      const regid = /^\d{8}$/;
      if (regid.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的身份证号"));
    };
    var checkbalance = (rule, value, callback) => {
      const regbalance = /^(0|[1-9]\d{0,4}|100000)$/;
      if (regbalance.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的余额"));
    };
    return {
      //获取用户列表的参数对象
      queryInfo: {
        //query: "",
        pagenum: 1,
        pagesize: 10
      },
      query: "",
      userList: [],
      addForm: {
        name: "",
        password: "",
        phoneNum: "",
        id: "",
        balance: "",
        email: ""
      },
      addUserRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { validator: checkusername, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phoneNum: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: checkphoneNum, trigger: "blur" }
        ],
        id: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: checkid, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" }
        ],
        balance: [
          { required: true, message: "请输入余额", trigger: "blur" },
          { validator: checkbalance, trigger: "blur" }
        ]
      },
      currentRow: null,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      input: "",
      AddDialogVisible: false,
      editDialogVisible: false,
      editForm: {},
      EditUserRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { validator: checkusername, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phoneNum: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: checkphoneNum, trigger: "blur" }
        ],
        id: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: checkid, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" }
        ],
        balance: [
          { required: true, message: "请输入余额", trigger: "blur" },
          { validator: checkbalance, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUsersList();
  },
  methods: {
    async getUsersList() {
      // const { data: res } = await axios.$http.get('users');
      // if (res.code != 200) {
      //   return this.$message.error("获取用户列表失败！");
      // }
      // console.log(res);
      // this.userList = res.data.users;
      // this.total = res.data.total;
      await axios.get("http://localhost:80/users").then(res => {
        console.log(1);
        console.log(res);
        const { data } = res.data;
        console.log(data);
        this.userList = data;
        console.log(this.userList.length);
        this.total = this.userList.length;
      });

    },

    async searchUsersList(query_a) {
      await axios.get("http://localhost:80/users/fuzzySearch", { params: { condition: query_a } }).then(res => {
        console.log(1);
        console.log(res);
        const { data } = res.data;
        console.log(data);
        this.userList = data;
        console.log(this.userList.length);
        this.total = this.userList.length;
        // this.getUsersList;
      });
    },

    AddUser() {
      this.AddDialogVisible = true;
    },
    async saveForm() {
      this.$refs.form.validate(async valid => {
        console.log(valid);
        if (!valid) {
          return;
        } else {
          console.log(this.addForm);
          await axios.post("http://localhost:80/users/add", this.addForm).then(res => {
            console.log(res);
            if (res.data.success == true) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }

          });
          this.AddDialogVisible = false;
          this.getUsersList();
        }
      });
    },
    cancelForm() {
      this.AddDialogVisible = false;
      this.$message({
        message: "取消操作",
        type: "info"
      });
    },
    addDialogClosed: function (form) {
      this.$refs["form"].resetFields();
    },
    showEditDialog(id) {
      // console.log(id)
      // const {data: res} = await this.$http.get('users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      //this.editForm = res.data
      const user = this.userList.find(item => item.id === id);
      if (user) {
        this.editForm = { ...user };
        console.log(this.editForm);
        this.editDialogVisible = true;
      }
    },
    async saveForm() {
      this.$refs.form.validate(async valid => {
        console.log(valid);
        if (!valid) {
          return;
        } else {
          console.log(this.addForm);
          await axios.post("http://localhost:80/users/add", this.addForm).then(res => {
            console.log(res);
            if (res.data.success == true) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }

          });
          this.AddDialogVisible = false;
          this.getUsersList();
        }
      });
    },
    async saveEditForm() {
      this.$refs.Edit_Form.validate(async valid => {
        console.log(valid);
        if (!valid) {
          console.log(this.editForm);
          return;
        } else {
          console.log(this.editForm);
          await axios.put("http://localhost:80/users/update", this.editForm).then(res => {
            console.log(res);
            if (res.data.success == true) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }

          });
          this.editDialogVisible = false;
          this.getUsersList();
        }
      });
    },
    cancelEditForm() {
      this.editDialogVisible = false;
      this.$message({
        message: "取消操作",
        type: "info"
      });
    },
    editDialogClosed: function (editForm) {
      this.$ref[Edit_Form].resetFields();
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    // handleCurrentChange(val) {
    //   this.currentRow = val;
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    async handleDelete(id) {
      const confirmResult = await this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // .then(() => {
        //   this.$message({
        //     type: "success",
        //     message: "删除成功!"
        //   });
        // })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      if (confirmResult !== 'confirm') {
        return
      }
      await axios.delete("http://localhost:80/users/delete", { params: { id: id } }).then(res => {
        console.log(res);
        if (res.data.success == true) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }

      });
      this.getUsersList();
    }
  }
};
</script>

<style>
.main{
  background-image: url("../../assets/a.png"); 
  background-size: cover;
}
.select_a {
  float: left;
}

.breadcrumb-with-margin {
  margin-bottom: 20px;
  /* 设置底边距的数值，可以根据需要进行调整 */
}
</style>
