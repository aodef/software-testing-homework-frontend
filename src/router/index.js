import { createRouter, createWebHistory } from 'vue-router'
import CalenderProblem from '../components/CalenderProblem.vue'
import TriangleProblem from '../components/TriangleProblem.vue'
import TelecomCharges from '../components/TelecomCharges.vue'
import Home from '../components/ProblemHome.vue'

const routes = [
  {
    path: '/',
    component: Home // 这里是根路径对应的组件，可以是你项目中的任何一个组件
  },
  {
    path: '/CalenderProblem',
    name: 'CalenderProblem',
    component: CalenderProblem
  },
  {
    path: '/TriangleProblem',
    name: 'TriangleProblem',
    component: TriangleProblem
  },
  {
    path: '/TelecomCharges',
    name: 'TelecomCharges',
    component: TelecomCharges
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
