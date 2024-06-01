<template>
  <el-card style="width: 100%" shadow="never">
    <h1 style="font-weight: bold; font-size: 20px;">电脑销售系统</h1>
    <p>这是一个关于电脑销售系统的问题，其中包括销售主机、显示器和外设，每个产品有不同的价格和最大销售数量限制。销售员每月至少要销售一台完整的电脑。</p>
  </el-card>
  <el-row :gutter="20">
    <el-col :span="16"><div class="grid-content ep-bg-purple" />
      <el-card style="width: 100%" shadow="never">
        <template #header >
          <div style="font-weight: bold; font-size: 20px;">测试用例</div>
        </template>
        <el-row :gutter="20">
          <el-col :span="16"><div class="grid-content ep-bg-purple" />
            <el-select v-model="choose_value" placeholder="Select" style="width: 240px" @change="handleChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
             />
            </el-select>
          </el-col>
          <el-col :span="8"><div class="grid-content ep-bg-purple" />
            <div class="mb-4">
              <el-button plain @click="startTest">开始测试</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableData" height="250" style="width: 100%">
          <el-table-column prop="ID" label="序号" />
          <el-table-column prop="Host" label="主机"/>
          <el-table-column prop="Monitor" label="显示器" />
          <el-table-column prop="Peripheral" label="外设" />
          <el-table-column prop="Expected Output" label="期望输出" />
          <el-table-column prop="Actual Output" label="实际输出" />
          <el-table-column prop="Result" label="正确性"/>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8"><div class="grid-content ep-bg-purple" />
      <div id="main" style="width: 100%; height: 100%;"></div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
// import { onMounted } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
const choose_value = ref('')
const options = [
  {
    value: '1',
    label: '边界值',
  }
  
]
const tableData = ref([]);
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}

const handleChange = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/ComputerSalesSystem_data', { 
      params: {
        value: choose_value.value
      }})
    tableData.value = response.data.tableData
    // console.log(response.data);
    console.log(tableData.value);

  } catch (error) {
    console.error('Error fetching ComputerSalesSystem_testdata:', error)
  }
}

const startTest = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/ComputerSalesSystem_result', { 
      params: {
        value: choose_value.value
      }})
    tableData.value = response.data.tableData
    // 初始化并显示饼状图
    const myChart = echarts.init(document.getElementById('main'));

    const chartOptions = {
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['Y', 'N']
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          data: response.data.chartData
        }
      ]
    };

    myChart.setOption(chartOptions);

  } catch (error) {
    console.error('Error starting ComputerSalesSystem test:', error)
  }
}

</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>




  