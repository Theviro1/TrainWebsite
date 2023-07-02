<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-with-margin">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>座位管理</el-breadcrumb-item>
      <el-breadcrumb-item>座位列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20"><!-- gutter是指定每个分栏的间隔 -->
        <!-- 分栏一共占24格，给搜索框7格，添加按钮4格 -->
        <el-col :span="20">
          <!-- 搜索与添加区域 -->
          <el-input v-model="input" placeholder="请输入内容" clearable @clear="clear_search">
            <el-button slot="append" icon="el-icon-search" @click="searchSeatsList(input)"></el-button>
          </el-input>
        </el-col>
        <!-- <el-col :span="4">
          <el-button type="primary" @click="AddSeat">添加座位</el-button>
        </el-col> -->
      </el-row>
      <el-row :gutter="20"><!-- gutter是指定每个分栏的间隔 -->
        <!-- 分栏一共占24格，给搜索框7格，添加按钮4格 -->
        <el-col :span="20">
          <span class="demonstration">类型快捷查询</span>
          <el-select v-model="select_seat_type" clearable @clear="clear_search" @change="type_change_query">
            <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <!-- <el-col :span="4">
          <el-button type="primary" @click="AddSeat">添加座位</el-button>
        </el-col> -->
      </el-row>
      <el-table :data="seatList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" ref="singleTable" border stripe
        :default-sort="{ prop: 'id', order: 'ascending' }" highlight-current-row><!-- 带边框、斑马纹 -->

        <el-table-column type="index"></el-table-column>
        <el-table-column label="车次" prop="trainId" width="80"></el-table-column>
        <el-table-column label="座位号" prop="id" sortable width="90"></el-table-column>
        <el-table-column label="座位类型" prop="type" sortable width="115"> <template slot-scope="scope"> <el-button :type="buttonType(scope.row.type)" size="mini" >{{ scope.row.type }}</el-button> </template> </el-table-column>
        <el-table-column label="价格" prop="price" sortable width="170"></el-table-column>
        <el-table-column label="状态" prop="state" width="155"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="seatList.length" background>
      </el-pagination>
    </el-card>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(userList[1])">选中第一行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
    <el-dialog :visible.sync="AddDialogVisible" title="添加座位信息" width="30%" @close="addDialogClosed('form')">
      <el-form ref="form" :model="addForm" :rules="addSeatRules" label-width="100px">
        <el-form-item label="车次" prop="trainId">
          <el-input placeholder="请输入内容" :value="this.addForm.trainId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="座位号" prop="id">
          <el-input v-model="addForm.id" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="座位类型" prop="type">
          <el-select v-model="addForm.type" clearable>
            <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="addForm.state" clearable :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="saveForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="editDialogVisible" title="修改座位信息" width="30%" @close="editDialogClosed('form')">
      <el-form ref="Edit_Form" :model="editForm" :rules="EditSeatRules" label-width="100px">
        <el-form-item label="车次" prop="trainId">
          <el-input placeholder="请输入内容" :value="this.$store.state.trainid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="座位号" prop="id">
          <el-input v-model="editForm.id" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="座位类型" prop="type">
          <el-select v-model="editForm.type" clearable>
            <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editForm.price" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="editForm.state" clearable :disabled="true"></el-input>
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
import axios from "axios";
import { mapState } from 'vuex'
import { faTachographDigital } from "../../../node_modules/@fortawesome/free-solid-svg-icons/index";
export default {
  computed: {
    ...mapState({
      trainId: 'trainid',
    }),
  },

  data() {
    var checkseatid = (rule, value, callback) => {
      const regseatid = /\b[1-9][0-9]?\b|100/
      if (regseatid.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的座位号'))
    }
    var checktype = (rule, value, callback) => {
      // const regtype = /(FIRST|BUSINESS|ECONOMY)/;
      // if (regtype.test(value)) {
      //   return callback();
      // }
      // callback(new Error("请输入合法的座位类型"));
      return callback()
    }
    var checkprice = (rule, value, callback) => {
      const regprice = /^(?:[1-9]\d{0,3}|10000)$/
      if (regprice.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的价格'))
    }
    var checkstatus = (rule, value, callback) => {
      const regstatus = /^[01]+$/
      if (regstatus.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的座位状态'))
    }
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },

      seatList: [

      ],
      status_options: [
        {
          value: 'ECONOMY',
          label: 'ECONOMY',
        },
        {
          value: 'FIRST',
          label: 'FIRST',
        },
        {
          value: 'BUSINESS',
          label: 'BUSINESS',
        },
      ],
      addForm: {
        trainId: '',
        id: '',
        type: '',
        price: '',
        state: '',
      },
      addSeatRules: {
        id: [
          { required: true, message: '请输入座位号', trigger: 'blur' },
          { validator: checkseatid, trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' },
          { validator: checktype, trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: checkprice, trigger: 'blur' },
        ],
        state: [
          { required: true, message: '请输入状态', trigger: 'blur' },
          { validator: checkstatus, trigger: 'blur' },
        ],
      },
      currentRow: null,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      input: '',
      AddDialogVisible: false,
      editDialogVisible: false,
      editForm: {},
      EditSeatRules: {
        id: [
          { required: true, message: '请输入座位号', trigger: 'blur' },
          { validator: checkseatid, trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' },
          { validator: checktype, trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: checkprice, trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入状态', trigger: 'blur' },
          { validator: checkstatus, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    console.log(this.$store.state.trainid)
    this.getSeatsList(this.$store.state.trainid)
  },
  methods: {
    buttonType(status) { switch (status) { case 'ECONOMY': return 'info'; case 'FIRST': return 'success'; case 'BUSINESS': return 'primary';} },

    async getSeatsList(trainid) {
      await axios
        .get('http://localhost:80/train/seat', { params: { id: trainid } })
        .then((res) => {
          console.log(1)
          console.log(res)
          const { data } = res.data
          console.log(data)
          this.seatList = data
          this.total = this.seatList.length
        })
    },
    async searchSeatsList(query_a) {
      await axios.get('http://localhost:80/seat/search/id', { params: { trainId: this.$store.state.trainid, seatId: query_a } }).then((res) => {
        console.log(1)
        console.log(res)
        const { data } = res.data
        console.log(data)
        this.seatList = data
        console.log(this.seatList.length);
        this.total = this.seatList.length;
      })
    },
    async type_change_query(value) {
      await axios.get('http://localhost:80/seat/search/type', { params: { trainId: this.$store.state.trainid, type: value } }).then((res) => {
        console.log(1)
        console.log(res)
        const { data } = res.data
        console.log(data)
        this.seatList = data
        console.log(this.seatList.length);
        this.total = this.seatList.length;

      })
    },
    clear_search() {
      console.log(this.$store.state.trainid);
      this.getSeatsList(this.$store.state.trainid);
    },
    AddSeat() {
      this.AddDialogVisible = true
    },
    saveForm: function (form) {
      console.log(this.seatList)
      this.AddDialogVisible = false
      this.$message({
        message: '添加座位成功！',
        type: 'success',
      })
    },
    cancelForm() {
      this.AddDialogVisible = false
      this.$message({
        message: '取消操作',
        type: 'info',
      })
    },
    addDialogClosed: function (form) {
      this.$refs[form].resetFields()
    },
    showEditDialog(seatid) {
      // console.log(id)
      // const {data: res} = await this.$http.get('users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      //this.editForm = res.data
      const seat = this.seatList.find((item) => item.id === seatid)
      if (seat) {
        this.editForm = { ...seat }
        this.editDialogVisible = true
      }
    },
    async saveEditForm() {
      this.$refs.Edit_Form.validate(async (valid) => {
        console.log(valid)
        if (!valid) {
          console.log(this.editForm)
          return
        } else {
          console.log(this.editForm)
          await axios
            .put("http://localhost:80/train/seat/update", this.editForm)
            .then((res) => {
              console.log(res)
              if (res.data.success == true) {
                this.$message({
                  message: res.data.message,
                  type: 'success',
                })
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error',
                })
              }
            })
          this.editDialogVisible = false
          this.getSeatsList(this.$store.state.trainid)
        }
      })
    },
    cancelEditForm() {
      this.editDialogVisible = false
      this.$message({
        message: '取消操作',
        type: 'info',
      })
    },
    editDialogClosed: function (editForm) {
      this.$refs.Edit_Form.resetFields()
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该座位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>

<style>
.select_a {
  float: left;
}

.breadcrumb-with-margin {
  margin-bottom: 20px;
  /* 设置底边距的数值，可以根据需要进行调整 */
}
</style>
