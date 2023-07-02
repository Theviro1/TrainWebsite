<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-with-margin">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车次管理</el-breadcrumb-item>
      <el-breadcrumb-item>经停站列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20"><!-- gutter是指定每个分栏的间隔 -->
        <!-- 分栏一共占24格，给搜索框7格，添加按钮4格 -->
        <el-col :span="20">
          <!-- 搜索与添加区域 -->
          <el-input v-model="input" placeholder="请输入内容" clearable @clear="clear_search">
            <el-button slot="append" icon="el-icon-search" @click="searchplatformList(input)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="AddPlatform">添加经停站</el-button>
          <el-dialog :visible.sync="dialogVisible" title="添加经停站信息" width="30%" @close="addDialogClosed('form')">
            <el-form ref="form" :model="addForm" :rules="addPlatformRules" label-width="100px">
              <el-form-item label="到达顺序" prop="id">
                <el-input v-model="addForm.id" clearable></el-input>
              </el-form-item>
              <el-form-item label="车次" prop="trainId">
                <el-input v-model="this.$store.state.trainid" :disabled="true" clearable></el-input>
              </el-form-item>
              <el-form-item label="站台编号" prop="platformId">
                <el-input v-model="addForm.platformId" clearable></el-input>
              </el-form-item>
              <el-form-item label="到达时间" prop="reachTime">
                <el-date-picker v-model="addForm.reachTime" type="datetime" placeholder="选择日期时间" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="发车时间" prop="leaveTime">
                <el-date-picker v-model="addForm.leaveTime" type="datetime" placeholder="选择日期时间" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelForm">取 消</el-button>
              <el-button type="primary" @click="saveForm">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
      <el-table :data="platformList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" ref="singleTable" border stripe
        :default-sort="{ prop: 'id', order: 'ascending' }" highlight-current-row><!-- 带边框、斑马纹 -->

        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column label="到达顺序" prop="id" sortable width="110"></el-table-column>
        <el-table-column label="车次" prop="trainId" sortable width="80"></el-table-column>
        <el-table-column label="站台编号" prop="platformId" sortable width="110"></el-table-column>
        <el-table-column label="到达时间" prop="reachTime" sortable width="160"></el-table-column>
        <el-table-column label="发车时间" prop="leaveTime" sortable width="160"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.row.platformId)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="platformList.length" background>
      </el-pagination>
    </el-card>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(trainList[1])">选中第一行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
    <el-dialog :visible.sync="editDialogVisible" title="修改经停站信息" width="30%" @close="editDialogClosed('editform')">
      <el-form ref="Edit_Form" :model="editForm" :rules="EditPlatformRules" label-width="100px">
        <el-form-item label="到达顺序" prop="id">
          <el-input v-model="editForm.id" :disabled="true" clearable></el-input>
        </el-form-item>
        <el-form-item label="车次" prop="trainId">
          <el-input v-model="this.$store.state.trainid" :disabled="true" clearable></el-input>
        </el-form-item>
        <el-form-item label="站台编号" prop="platformId">
          <el-input v-model="editForm.platformId" clearable></el-input>
        </el-form-item>
        <el-form-item label="到达时间" prop="reachTime">
          <el-date-picker v-model="editForm.reachTime" type="datetime" placeholder="选择日期时间" style="width: 100%;">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="发车时间" prop="leaveTime">
          <el-date-picker v-model="editForm.leaveTime" type="datetime" placeholder="选择日期时间" style="width: 100%;">
          </el-date-picker>
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
export default {
  data() {
    // var checktrainid = (rule, value, callback) => {
    //   const regtrainid = /^(?:[1-9]\d?|100)$/;
    //   if (regtrainid.test(value)) {
    //     return callback();
    //   }
    //   callback(new Error("请输入合法的车次"));
    // };
    var checkplatformid = (rule, value, callback) => {
      const regstatus = /^(?:[1-9]|1\d|20)$/;
      if (regstatus.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的站台编号"));
    };

    // var checkTime = (rule, value, callback) => {
    //   const departTime = new Date(this.addForm.departtime);
    //   const arriveTime = new Date(this.addForm.arrivetime);
    //   if (departTime < arriveTime) {
    //     return callback();
    //   } else {
    //     callback(new Error("发车时间必须早于到达时间"));
    //   }
    // };
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 添加用户的表单数据
      addForm: {
        id: "",
        trainId: "",
        platformId: "",
        reachTime: "",
        leaveTime: ""
      },
      platformList: [

      ],
      currentRow: null,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      input: "",
      dialogVisible: false,
      editDialogVisible: false,
      editForm: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      addPlatformRules: {
        platformId: [
          { required: true, message: "请输入站台编号", trigger: "blur" },
          { validator: checkplatformid, trigger: "blur" }
        ]
      },
      EditPlatformRules: {
        platformId: [
          { required: true, message: "请输入站台编号", trigger: "blur" },
          { validator: checkplatformid, trigger: "blur" }
        ]
        // departtime: [
        //   { required: true, message: "请选择起始时间", trigger: "change" },
        //   { validator: checkTime, trigger: "change" }
        // ],
        // arrivetime: [
        //   { required: true, message: "请选择结束时间", trigger: "change" },
        //   { validator: checkTime, trigger: "change" }
        // ]
      },
      value2: ""
    };
  },
  created() {
    // this.platformList[0].trainid = this.$store.state.trainid;
    // this.platformList[1].trainid = this.$store.state.trainid;
    // this.platformList[2].trainid = this.$store.state.trainid;
    // this.platformList[3].trainid = this.$store.state.trainid;
    this.addForm.trainId = this.$store.state.trainid;
    console.log(this.$store.state.trainid)
    this.getplatformsList(this.$store.state.trainid);
  },
  methods: {
    async getplatformsList(trainid) {
      await axios
        .get('http://localhost:80/train/schedule', { params: { id: trainid } })
        .then((res) => {
          console.log(1)
          console.log(res)
          const { data } = res.data
          console.log(data)
          this.platformList = data
          this.total = this.platformList.length

        })
    },
    async searchplatformList(query_a) {
      await axios.get('http://localhost:80/schedule/search/id', { params: { trainId: this.$store.state.trainid, id: query_a } }).then((res) => {
        console.log(1)
        console.log(res)
        const { data } = res.data
        console.log(data)
        this.platformList = data
        console.log(this.platformList.length);
        this.total = this.platformList.length;
      })
    },
    clear_search() {
      console.log(this.$store.state.trainid);
      this.getplatformsList(this.$store.state.trainid);
    },
    addDialogClosed: function (form) {
      this.$refs.form.resetFields();
    },
    editDialogClosed: function (editform) {
      this.$refs.Edit_Form.resetFields();
    },
    AddPlatform() {
      this.dialogVisible = true;
    },
    showEditDialog(platformid) {
      // console.log(id)
      // const {data: res} = await this.$http.get('users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      //this.editForm = res.data
      this.resetEditForm();
      const platform = this.platformList.find(
        item => item.platformId === platformid
      );
      this.editForm = { ...platform };
      this.editDialogVisible = true;
    },
    async saveForm() {
      console.log(this.addForm.trainId);
      if (this.compareTime(this.addForm.reachTime, this.addForm.leaveTime)) {
        this.$refs.form.validate(async (valid) => {
          console.log(valid);
          if (!valid) {
            console.log(this.addForm);
            return;
          } else {
            console.log(this.addForm)
            await axios
              .post("http://localhost:80/train/schedule/add", this.addForm)
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
            this.getplatformsList();
          }
        });
      } else {
        // departtime在arrivetime之后，显示错误提示或执行其他操作
        this.$message.error("发车时间不能晚于到达时间");
      }
    },
    compareTime(reachTime, leaveTime) {
      const departTimestamp = new Date(reachTime).getTime();
      const arriveTimestamp = new Date(leaveTime).getTime();
      return departTimestamp < arriveTimestamp;
    },

    cancelForm() {
      this.dialogVisible = false;
      this.$message({
        message: "取消操作",
        type: "info"
      });
    },
    async saveEditForm() {
      if (this.compareTime(this.editForm.reachTime, this.editForm.leaveTime)) {
        this.$refs.Edit_Form.validate(async (valid) => {
          console.log(valid);
          if (!valid) {
            console.log(this.editForm);
            return;
          } else {
            console.log(this.editForm)
            await axios
              .put('http://localhost:80/train/schedule/update', this.editForm)
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
            this.getplatformsList()
          }
        });
      } else {
        // departtime在arrivetime之后，显示错误提示或执行其他操作
        this.$message.error("发车时间不能晚于到达时间");
      }
    },
    cancelEditForm() {
      this.editDialogVisible = false;
      this.$message({
        message: "取消操作",
        type: "info"
      });
    },
    resetEditForm() {
      this.editForm = {
        platformId: "",
        reachTime: "",
        leaveTime: ""
      };
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
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
      this.$confirm("此操作将删除该站台, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

    }
  }
};
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
