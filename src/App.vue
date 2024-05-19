<template>
  <div class="common-layout" >
    <el-container>
      <el-aside width="200px" style="height: 100vh;">
      <h1 class="mb-2">&nbsp;&nbsp;&nbsp;&nbsp;题目列表</h1>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="/TriangleProblem">
          <el-icon><EditPen /></el-icon>
          <span>三角形三边</span>
        </el-menu-item>
        <el-menu-item index="/CalenderProblem">
          <el-icon><Calendar /></el-icon>
          <span>万年历</span>
        </el-menu-item>
        <el-menu-item index="3" >
          <el-icon><Document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-container>
        <el-header style="display: flex; align-items: center; /* 子元素垂直居中 */">
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
  background-size: cover; /* 背景图片填充整个容器 */
  background-position: center; /* 背景图片居中 */
  background-image: url("./photos/cool-background.png");
}
</style>