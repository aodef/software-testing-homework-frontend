<template>
  <el-card style="width: 100%;border-radius: 10px;box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5)" shadow="never">
    <h1 style="font-weight: bold; font-size: 20px;color: #677CAB">三角形三边判断</h1>
    <p>输入三角形的三边，判断是否合法</p>
  </el-card>
  <el-row :gutter="20">
    <el-col :span="16"><div class="grid-content ep-bg-purple" />
      <el-card style="width: 100%;border-radius: 10px;box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5)" shadow="never">
        <template #header >
          <div style="font-weight: bold; font-size: 20px;color: #677CAB">测试用例</div>
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
              <el-button plain @click="startTest" style="background-color:#677CAB; color:white;width:150px">开始测试</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableData" height="250" style="width: 100%">
          <el-table-column prop="ID" label="序号" />
          <el-table-column prop="A" label="A"/>
          <el-table-column prop="B" label="B" />
          <el-table-column prop="C" label="C" />
          <el-table-column prop="Expect Output" label="预期输出" />
          <el-table-column prop="Actual Output" label="实际输出" />
          <el-table-column prop="Result" label="正确性"/>
          <el-table-column prop="Analysis Strategy" label="测试类型"/>
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
  },
  {
    value: '2',
    label: '等价类',
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
    const response = await axios.get('http://127.0.0.1:5000/api/Triangle_data', { 
      params: {
        value: choose_value.value
      }})
    tableData.value = response.data.tableData
    // console.log(response.data);
    // console.log(tableData.value);

  } catch (error) {
    console.error('Error fetching Triangle_testdata:', error)
  }
}

const startTest = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/Triangle_result', { 
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
    console.error('Error starting Triangle test:', error)
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

