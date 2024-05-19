<template>
  <el-card style="width: 100%" shadow="never">
    <h1 style="font-weight: bold; font-size: 20px;">万年历问题</h1>
    <p>输入年月日，求出这个日期的下一天</p>
  </el-card>
  <el-row :gutter="20">
    <el-col :span="16"><div class="grid-content ep-bg-purple" />
      <el-card style="width: 100%" shadow="never">
        <template #header >
          <div style="font-weight: bold; font-size: 20px;">测试用例</div>
        </template>
        <el-row :gutter="20">
          <el-col :span="16"><div class="grid-content ep-bg-purple" />
            <el-select v-model="value" placeholder="Select" style="width: 240px">
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
              <el-button plain>开始测试</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableData" height="250" style="width: 100%">
          <el-table-column prop="number" label="序号" />
          <el-table-column prop="year" label="年"/>
          <el-table-column prop="month" label="月" />
          <el-table-column prop="day" label="日" />
          <el-table-column prop="eoutput" label="预期输出" />
          <el-table-column prop="aoutput" label="实际输出" />
          <el-table-column prop="correctness" label="正确性"/>
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
import { onMounted } from 'vue'
import * as echarts from 'echarts'
const value = ref('')
const options = [
  {
    value: '1',
    label: '边界值',
  },
  {
    value: '2',
    label: '等价类',
  },
  
]

const tableData = [
  {
    number: '1',
    year: '2024',
    month: '4',
    day: '9',
    eoutput:'2024-4-10',
    aoutput:'-',
    correctness:'Y'

  },
  {
    number: '1',
    year: '2024',
    month: '4',
    day: '9',
    eoutput:'2024-4-10',
    aoutput:'-',
    correctness:'Y'

  },
  {
    number: '1',
    year: '2024',
    month: '4',
    day: '9',
    eoutput:'2024-4-10',
    aoutput:'-',
    correctness:'Y'

  },
  {
    number: '1',
    year: '2024',
    month: '4',
    day: '9',
    eoutput:'2024-4-10',
    aoutput:'-',
    correctness:'Y'

  },
]

onMounted(() => {
  const myChart = echarts.init(document.getElementById('main'));

  const chartOptions = {
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['A', 'B', 'C', 'D', 'E']
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
        data: [
          { value: 335, name: 'A' },
          { value: 310, name: 'B' },
          { value: 234, name: 'C' },
          { value: 135, name: 'D' },
          { value: 1548, name: 'E' }
        ]
      }
    ]
  };

  myChart.setOption(chartOptions);
});

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




  