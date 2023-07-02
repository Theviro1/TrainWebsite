<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-with-margin">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车次管理</el-breadcrumb-item>
      <el-breadcrumb-item>车次列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20"><!-- gutter是指定每个分栏的间隔 -->
        <!-- 分栏一共占24格，给搜索框7格，添加按钮4格 -->
        <el-col :span="20">
          <!-- 搜索与添加区域 -->
          <el-input v-model="input" placeholder="请输入内容" clearable @clear="getTrainsList()">
            <el-button slot="append" icon="el-icon-search" @click="searchTrainsList(input)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="AddTrain()" plain icon="el-icon-circle-plus-outline">添加列车</el-button>
          <el-dialog :visible.sync="dialogVisible" title="添加列车信息" width="30%" @close="addDialogClosed('form')">
            <el-form ref="form" :model="addForm" :rules="addTrainRules" label-width="100px">
              <el-form-item label="车次" prop="id">
                <el-input v-model="addForm.id" clearable></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <!-- <el-input v-model="addForm.status" clearable></el-input> -->
                <el-select v-model="addForm.status" clearable>
                  <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="始发站" prop="departurePlatformId">
                <el-input v-model="addForm.departurePlatformId" clearable></el-input>
              </el-form-item>
              <el-form-item label="终到站" prop="arrivalPlatformId">
                <el-input v-model="addForm.arrivalPlatformId" clearable></el-input>
              </el-form-item>
              <el-form-item label="经停站个数" prop="platformNum">
                <el-input v-model="addForm.platformNum" clearable></el-input>
              </el-form-item>
              <el-form-item label="发车时间" prop="departureTime">
                <el-date-picker v-model="addForm.departureTime" type="datetime" placeholder="选择日期时间" style="width: 100%">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="到达时间" prop="arrivalTime">
                <el-date-picker v-model="addForm.arrivalTime" type="datetime" placeholder="选择日期时间" style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelForm()">取 消</el-button>
              <el-button type="primary" @click="saveForm()">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row :gutter="20"><!-- gutter是指定每个分栏的间隔 -->
        <!-- 分栏一共占24格，给搜索框7格，添加按钮4格 -->
        <el-col :span="20">
          <!-- 搜索与添加区域 -->
          <div class="block" style="float: left">
            <span class="demonstration">日期快捷查询</span>
            <el-date-picker v-model="value2" type="daterange" :picker-options="pickerOptions" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" align="right" unlink-panels >
            </el-date-picker>
            <span class="demonstration">状态快捷查询</span>
            <el-select v-model="select_train_status" clearable @clear="getTrainsList()" @change="status_change_query">
              <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-search" @click="time_query()">查询</el-button>
        </el-col>
      </el-row>
      <!-- <div style="select_a">
        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
      </div> -->
      <el-table :data="trainList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" ref="singleTable" border stripe
        :default-sort="{ prop: 'id', order: 'ascending' }" highlight-current-row><!-- 带边框、斑马纹 -->

        <el-table-column type="index"></el-table-column>
        <el-table-column label="车次" prop="id" sortable width="80"></el-table-column>
        <el-table-column label="状态" prop="status" sortable width="110"> <template slot-scope="scope"> <el-button :type="buttonType(scope.row.status)" size="mini" plain>{{ scope.row.status }}</el-button> </template> </el-table-column>
        <el-table-column label="始发站" prop="departurePlatformId" sortable width="90"></el-table-column>
        <el-table-column label="终到站" prop="arrivalPlatformId" sortable width="90"></el-table-column>
        <el-table-column label="经停站个数" prop="platformNum" sortable width="120"></el-table-column>
        <el-table-column label="发车时间" prop="departureTime" sortable width="160"></el-table-column>
        <el-table-column label="到达时间" prop="arrivalTime" sortable width="160"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" title="编辑"
              @click="showEditDialog(scope.row.id, scope.row.platformNum)"
              style="display: inline-block; vertical-align: middle;"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" title="删除"
              @click="handleDelete(scope.row.id)"
              style="display: inline-block; vertical-align: middle; margin-right: 10px;"></el-button>
            <img :src="images[Math.floor(Math.random() * images.length)]" class="train_pic" alt="" height=30% width=65%
            style="display: inline-block; vertical-align: middle;"/>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="trainList.length" background>
      </el-pagination>
    </el-card>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(trainList[1])">选中第一行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
    <el-dialog :visible.sync="editDialogVisible" title="修改列车信息" width="30%" @close="editDialogClosed('editform')">
      <el-form ref="Edit_Form" :model="editForm" :rules="EditTrainRules" label-width="100px">
        <el-form-item label="车次" prop="id">
          <el-input v-model="editForm.id" :disabled="true" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <!-- <el-input v-model="addForm.status" clearable></el-input> -->
          <el-select v-model="editForm.status" clearable>
            <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="始发站" prop="departurePlatformId">
          <el-input v-model="editForm.departurePlatformId" :disabled="true" clearable></el-input>
        </el-form-item>
        <el-form-item label="终到站" prop="arrivalPlatformId">
          <el-input v-model="editForm.arrivalPlatformId" :disabled="true" clearable></el-input>
        </el-form-item>
        <el-form-item label="经停站个数" prop="platformNum">
          <el-input v-model="editForm.platformNum" :disabled="true" clearable></el-input>
        </el-form-item>
        <el-form-item label="发车时间" prop="departureTime">
          <el-date-picker :disabled="true" v-model="editForm.departureTime" type="datetime" placeholder="选择日期时间"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="到达时间" prop="arrivalTime">
          <el-date-picker :disabled="true" v-model="editForm.arrivalTime" type="datetime" placeholder="选择日期时间"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-row label-width="100px">
        <el-col :span="12">
          <el-button type="success" icon="el-icon-suitcase" @click="edit_seat()">编辑座位信息</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" icon="el-icon-s-home" @click="edit_platform()">编辑经停站信息</el-button>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditForm()">取 消</el-button>
        <el-button type="primary" @click="saveEditForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var checktrainid = (rule, value, callback) => {
      const regtrainid = /^.*$/
      if (regtrainid.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的车次'))
    }
    var checkstatus = (rule, value, callback) => {
      // const regstatus = /(CANCEL|ONTIME|DELAY)/;
      // if (regstatus.test(value)) {
      //   return callback();
      // }
      // callback(new Error("请输入合法的列车状态"));
      return callback()
    }
    var checkdeparturePlatformId = (rule, value, callback) => {
      const regdeparturePlatformId = /^(?:[1-9]|1\d|20)$/
      if (regdeparturePlatformId.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的始发站'))
    }
    var checkarrivalPlatformId = (rule, value, callback) => {
      const regarrivalPlatformId = /^(?:[1-9]|1\d|20)$/
      if (regarrivalPlatformId.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的终到站'))
    }
    var checkplatformnum = (rule, value, callback) => {
      const regplatnum = /^(?:[2-9]|10)$/
      if (regplatnum.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的经停站个数'))
    }

    // var checkTime = (rule, value, callback) => {
    //   const departureTime = new Date(this.addForm.departureTime);
    //   const arrivalTime = new Date(this.addForm.arrivalTime);
    //   if (departureTime < arrivalTime) {
    //     return callback();
    //   } else {
    //     callback(new Error("发车时间必须早于到达时间"));
    //   }
    // };
    return {
      images:[
      require("../../assets/R.png"),
      require("../../assets/R2.png"),
      require("../../assets/R3.png"),
      require("../../assets/R4.png"),
      ],
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      // 添加用户的表单数据
      addForm: {
        id: '',
        status: '',
        departurePlatformId: '',
        arrivalPlatformId: '',
        platformNum: '',
        departureTime: '',
        arrivalTime: '',
      },
      status_options: [
        {
          value: 'ONTIME',
          label: 'ONTIME',
        },
        {
          value: 'CANCEL',
          label: 'CANCEL',
        },
        {
          value: 'DELAY',
          label: 'DELAY',
        },
      ],
      trainList: [],
      currentRow: null,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      input: '',
      select_train_status: '',
      dialogVisible: false,
      editDialogVisible: false,
      editForm: {},
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      addTrainRules: {
        id: [
          { required: true, message: '请输入车次', trigger: 'blur' },
          { validator: checktrainid, trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入列车状态', trigger: 'blur' },
          { validator: checkstatus, trigger: 'blur' },
        ],
        departurePlatformId: [
          { required: true, message: '请输入始发站', trigger: 'blur' },
          { validator: checkdeparturePlatformId, trigger: 'blur' },
        ],
        arrivalPlatformId: [
          { required: true, message: '请输入终到站', trigger: 'blur' },
          { validator: checkarrivalPlatformId, trigger: 'blur' },
        ],
        platformNum: [
          { required: true, message: '请输入经停站个数', trigger: 'blur' },
          { validator: checkplatformnum, trigger: 'blur' },
        ],
      },
      EditTrainRules: {
        id: [
          { required: true, message: '请输入车次', trigger: 'blur' },
          { validator: checktrainid, trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入列车状态', trigger: 'blur' },
          { validator: checkstatus, trigger: 'blur' },
        ],
        departurePlatformId: [
          { required: true, message: '请输入始发站', trigger: 'blur' },
          { validator: checkdeparturePlatformId, trigger: 'blur' },
        ],
        arrivalPlatformId: [
          { required: true, message: '请输入终到站', trigger: 'blur' },
          { validator: checkarrivalPlatformId, trigger: 'blur' },
        ],
        platformNum: [
          { required: true, message: '请输入经停站个数', trigger: 'blur' },
          { validator: checkplatformnum, trigger: 'blur' },
        ],
        // departureTime: [
        //   { required: true, message: "请选择起始时间", trigger: "change" },
        //   { validator: checkTime, trigger: "change" }
        // ],
        // arrivalTime: [
        //   { required: true, message: "请选择结束时间", trigger: "change" },
        //   { validator: checkTime, trigger: "change" }
        // ]
      },
      value2: [],
    }
  },
  created() {
    this.getTrainsList()
  },
  methods: {
    buttonType(status) { switch (status) { case 'CANCEL': return 'danger'; case 'DELAY': return 'warning'; case 'ONTIME': return 'success'; default: return 'primary'; } },
    edit_seat() {
      //console.log($store.state.trainid);
      this.$router.push('/manseats')
    },
    edit_platform() {
      this.$router.push('/manplatform')
    },
    async getTrainsList() {
      await axios.get('http://localhost:80/train').then((res) => {
        console.log(1)
        console.log(res)
        const { data } = res.data
        console.log(data)
        this.trainList = data
        console.log(this.trainList.length);
        this.total = this.trainList.length
      })
    },

    async searchTrainsList(query_a) {

      await axios.get('http://localhost:80/searchOneTrain', { params: { id: query_a } }).then((res) => {
        console.log(1)
        console.log(res)
        const { data } = res.data
        console.log(data)
        this.trainList = data
        console.log(this.trainList.length);
        this.total = this.trainList.length;

      })
    },
    async status_change_query(value) {
      await axios.get('http://localhost:80/train/search/status', { params: { status: value } }).then((res) => {
        console.log(1)
        console.log(res)
        const { data } = res.data
        console.log(data)
        this.trainList = data
        console.log(this.trainList.length);
        this.total = this.trainList.length;

      })
    },
    async time_query() {
        var time11 = this.value2.slice();
        var time1 = time11[0];
        var time2 = time11[1];
        var date1 = new Date(time1);
        var date2 = new Date(time2);
        var date1Str = date1.toISOString().slice(0, -5); // 转换并去掉最后5个字符 
        var date2Str = date2.toISOString().slice(0, -5); // 转换并去掉最后5个字符
      console.log(date1Str);
      await axios.get('http://localhost:80/train/search/datescope', { params: { date1: date1Str, date2: date2Str } }).then((res) => {
        console.log(1)
        console.log(res)
        const { data } = res.data
        console.log(data)
        this.trainList = data
        console.log(this.trainList.length);
        this.total = this.trainList.length;

      })
    },

    addDialogClosed: function (form) {
      this.$refs[form].resetFields()
    },
    editDialogClosed: function (editform) {
      this.$ref[Edit_Form].resetFields()
    },
    AddTrain() {
      this.dialogVisible = true
    },
    showEditDialog(id, platformNum) {
      // const {data: res} = await this.$http.get('users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      //this.editForm = res.data
      this.resetEditForm()
      const train = this.trainList.find((item) => item.id === id)
      this.editForm = { ...train }
      this.editDialogVisible = true
      this.$store.commit('savetrainid', id)
      this.$store.commit('saveplatformnum', platformNum)
      console.log(this.$store.state.trainid)
      console.log(this.$store.state.platformnum)
    },
    async saveForm() {
      if (
        this.compareTime(this.addForm.departureTime, this.addForm.arrivalTime)
      ) {
        this.$refs.form.validate(async (valid) => {
          console.log(valid)
          if (!valid) {
            console.log(this.addForm)
            return
          } else {
            console.log(this.addForm)
            await axios
              .post("http://localhost:80/train/add", this.addForm)
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
            this.dialogVisible = false
            console.log(1234);
            this.getTrainsList();
          }
        })
      } else {
        // departureTime在arrivalTime之后，显示错误提示或执行其他操作
        this.$message.error('发车时间不能晚于到达时间')
      }
    },
    compareTime(departureTime, arrivalTime) {
      const departureTimestamp = new Date(departureTime).getTime()
      const arrivalTimestamp = new Date(arrivalTime).getTime()
      return departureTimestamp < arrivalTimestamp
    },

    cancelForm() {
      this.dialogVisible = false
      this.$message({
        message: '取消操作',
        type: 'info',
      })
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
            .put('http://localhost:80/train/update', this.editForm)
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
          this.getTrainsList()
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
    resetEditForm() {
      this.editForm = {
        id: '',
        status: '',
        departurePlatformId: '',
        arrivalPlatformId: '',
        platformNum: '',
        departureTime: '',
        arrivalTime: '',
      }
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
    async handleDelete(id) {
      const confirmResult = await this.$confirm(
        '此操作将删除该列车, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
      if (confirmResult !== 'confirm') {
        return
      }
      await axios
        .delete('http://localhost:80/train/delete', { params: { id: id } })
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
      this.getTrainsList()
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
