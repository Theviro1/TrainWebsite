<template>
  <div>
    <el-container>
      <el-container>
        <el-header>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-with-margin">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>购买车票</el-breadcrumb-item>
            <el-breadcrumb-item>选择座位</el-breadcrumb-item>
          </el-breadcrumb></el-header>
        <!-- <el-main> -->
        <div class="border_a">
          <el-row gutter="20"><!-- gutter是指定每个分栏的间隔 -->
            <!-- 分栏一共占24格，给搜索框7格，添加按钮4格 -->
            <el-col :span="20">
              <!-- 搜索与添加区域 -->
              <el-input v-model="input1" placeholder="请输入身份证号码">
                <el-button slot="append"></el-button>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary">添加联系人</el-button>
            </el-col>
          </el-row>
          <el-row gutter="20"><!-- gutter是指定每个分栏的间隔 -->
            <!-- 分栏一共占24格，给搜索框7格，添加按钮4格 -->
            <el-col :span="20">
              <!-- 搜索与添加区域 -->
              <el-input v-model="input2" placeholder="请输入身份证号码">
                <el-button slot="append"></el-button>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary">添加乘客</el-button>
            </el-col>
          </el-row>
          <div class="text_1">选择座位</div>
          <el-select v-model="value" placeholder="请选择" position:relative margin:20px>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div class="border_b">
            <div>
              <el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
              <el-checkbox v-model="checked2" label="备选项2" border></el-checkbox>
            </div>
            <div style="margin-top: 20px">
              <el-checkbox v-model="checked3" label="备选项1" border size="medium"></el-checkbox>
              <el-checkbox v-model="checked4" label="备选项2" border size="medium"></el-checkbox>
            </div>
            <div style="margin-top: 20px">
              <el-checkbox-group v-model="checkboxGroup1" size="small">
                <el-checkbox label="备选项1" border></el-checkbox>
                <el-checkbox label="备选项2" border disabled></el-checkbox>
              </el-checkbox-group>
            </div>
            <div style="margin-top: 20px">
              <el-checkbox-group v-model="checkboxGroup2" size="mini" disabled>
                <el-checkbox label="备选项1" border></el-checkbox>
                <el-checkbox label="备选项2" border></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="border_c">
          <div>已选座乘客列表</div>
          <div class="table-container">
            <el-table :data="tableData" stripe style="width: 300px">
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="id" label="身份证号" width="300">
              </el-table-column>
              <el-table-column prop="seat_id" label="车厢号-座位号">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- </el-main> -->
      </el-container>
      <el-aside width="200px">Aside</el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "1车"
        },
        {
          value: "选项2",
          label: "2车"
        },
        {
          value: "选项3",
          label: "3车"
        },
        {
          value: "选项4",
          label: "4车"
        },
        {
          value: "选项5",
          label: "5车"
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          id: "123",
          seat_id: 1
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          id: "123",
          seat_id: 1
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          id: "123",
          seat_id: 1
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          id: "123",
          seat_id: 1
        }
      ],
      value: "",
      input1: "",
      input2: "",
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: true,
      checkboxGroup1: [],
      checkboxGroup2: []
    };
  }
};
</script>

<style>
.text_1 {
  position: relative;
  margin: 20px;
  margin-left: 0px;
}

.table-container {
  width: 500px;
  overflow: auto;
}

.border_a {
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
}

.border_b {
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
}

.border_c {
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
}

.breadcrumb-with-margin {
  margin-bottom: 20px;
  /* 设置底边距的数值，可以根据需要进行调整 */
  margin-top: 15px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.el-header {
  background-color: rgb(116, 171, 216);
  width: 100vw;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  margin-top: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
