<template>
  <div class="common-layout" >
    <el-container>
      <el-aside width="200px" style="height: 100vh; display: flex; flex-direction: column;background-color:#677CAB;color:white">
      <h1 class="mb-2" style="flex-shrink: 0">&nbsp;&nbsp;&nbsp;&nbsp;题目列表</h1>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
        style="flex-grow: 1; overflow: auto;background-color:#677CAB;color:white"
      >
        <el-menu-item index="/TriangleProblem">
          <el-icon><EditPen /></el-icon>
          <span>三角形三边</span>
        </el-menu-item>
        <el-menu-item index="/CalenderProblem">
          <el-icon><Calendar /></el-icon>
          <span>万年历</span>
        </el-menu-item>
        <el-menu-item index="/ComputerSalesSystem">
          <el-icon><setting /></el-icon>
          <span>电脑销售系统</span>
        </el-menu-item>
        <el-menu-item index="/TelecomCharges" >
          <el-icon><Document /></el-icon>
          <span>电信收费</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-container>
        <el-header style="display: flex; align-items: center;
      color: #677CAB; /* 设置字体颜色 */">
          <div style="font-weight: bold; font-size: 28px;">软件测试工具</div>
        </el-header>
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {
  Document,
  Calendar,
  EditPen,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>
.common-layout {
  background-color: #F3F6FB; /* 设置背景颜色，这里以浅灰色为例 */
} 
</style>