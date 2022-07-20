<template>
  <el-row :gutter="20">
    <el-col v-for="(item, index) in panels" :key="index" :span="6">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
            <el-tag :type="item.unitColor" class="mx-1" effect="plain">
              {{ item.unit }}
            </el-tag>
          </div>
        </template>
        <div class="content">
          <span class="value">{{ item.value }}</span>
          <span class="border"></span>
          <div class="sub-title">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="sub-el-row">
    <el-col v-for="(item, index) in smallMenus" :key="index" :span="3">
      <router-link :to="item.path">
        <el-card shadow="hover">
          <div class="small-menu">
            <div :style="{ color: item.color }">
              <svg-icon :icon="item.icon"></svg-icon>
            </div>
            <span class="title">{{ item.title }}</span>
          </div>
        </el-card>
      </router-link>
    </el-col>
  </el-row>

  <!--  可视化-->
  <el-row :gutter="20" class="sub-el-row">
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>订单统计</span>
            <div class="card-button-box">
              <el-check-tag
                v-for="(v, i) in checkTagList"
                :key="i"
                :checked="v.status"
                @change="handleDateChange(v.method, i)"
                >{{ v.title }}</el-check-tag
              >
            </div>
          </div>
        </template>
        <div ref="main" id="main" v-loading="loading"></div>
      </el-card>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>店铺及商品提示</span>
            <el-tag type="danger" class="mx-1" effect="plain">
              店铺及商品提示
            </el-tag>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(v, i) in goods" :key="i">
            <div class="goods-box">
              <span>{{ v.value }}</span>
              <span>{{ v.label }}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" style="margin-top: 20px">
        <template #header>
          <div class="card-header">
            <span>交易提示</span>
            <el-tag type="danger" class="mx-1" effect="plain">
              需要立即处理的交易订单
            </el-tag>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(v, i) in order" :key="i">
            <div class="goods-box">
              <span>{{ v.value }}</span>
              <span>{{ v.label }}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { getStatistics1, getStatistics2, getStatistics3 } from '@/api/index'
import { ref, reactive } from 'vue'
import * as echarts from 'echarts'

const smallMenus = reactive([
  {
    path: '/user/list',
    icon: 'user',
    title: '用户',
    color: '#65c5f0'
  },

  {
    path: '/goods/list',
    icon: 'eye',
    title: '商品',
    color: '#a17cf7'
  },

  {
    path: '/order/list',
    icon: 'menu',
    title: '订单',
    color: '#e47bf3'
  },

  {
    path: '/comment/list',
    icon: 'password',
    title: '评价',
    color: '#18b9a7'
  },

  {
    path: '/image/list',
    icon: 'link',
    title: '图库',
    color: '#fabd0b'
  },

  {
    path: '/notice/list',
    icon: 'role',
    title: '公告',
    color: '#f44a67'
  },

  {
    path: '/setting/list',
    icon: 'article',
    title: '配置',
    color: '#696a6b'
  },

  {
    path: '/coupon/list',
    icon: 'close',
    title: '优惠券',
    color: '#f8b74a'
  }
])

/**
 * 请求头部卡片信息
 * @returns {Promise<void>}
 */
let panels = ref()
async function getHeaderStatistics() {
  try {
    const response = await getStatistics1()
    // console.log(response)
    panels.value = response.panels
  } catch (e) {
    console.log(e)
  }
}

getHeaderStatistics()

const goods = ref([])
const order = ref([])
async function getFootStatistics2() {
  const res = await getStatistics2()
  // console.log(res)
  goods.value = res.goods
  order.value = res.order
}
getFootStatistics2()

// 获取可视化图表数据

// 初始请求
let loading = ref(false)
let myChart = ref()
async function getEatchsData(method) {
  loading.value = true
  try {
    const res = await getStatistics3(method)
    console.log(res)
    let chartDom = document.getElementById('main')
    myChart.value = echarts.init(chartDom)
    let option
    option = {
      xAxis: {
        type: 'category',
        data: res.x
      },
      yAxis: {
        type: 'value',
        data: res.y
      },
      series: [
        {
          data: res.y,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }

    option && myChart.value.setOption(option)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
getEatchsData('week')

const checkTagList = reactive([
  { title: '近1个月', status: false, method: 'month' },
  { title: '近1周', status: true, method: 'week' },
  { title: '近24小时', status: false, method: 'hour' }
])
// 点击切换
function handleDateChange(method, i) {
  if (
    myChart.value !== null &&
    myChart.value !== '' &&
    myChart.value !== undefined
  ) {
    myChart.value.dispose()
  }
  checkTagList.forEach((v) => {
    v.status = false
  })
  checkTagList[i].status = true
  getEatchsData(method)
}
</script>

<style lang="scss" scoped>
#main {
  width: 556px;
  height: 300px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.content {
  .value {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: #6b7280;
  }

  .border {
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
    border-top: 1px solid #dcdfe6;
  }

  .sub-title {
    color: #6b7280;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.sub-el-row {
  margin-top: 20px;
}

.small-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .title {
    margin-top: 10px;
  }
}

.goods-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #f6f6f6;
  padding: 20px 0;
  border-radius: 3px;
  span {
    &:nth-child(1) {
      font-size: 1.25rem;
      margin-bottom: 10px;
    }
    &:nth-child(2) {
      font-size: 0.75rem;
    }
  }
}

.el-check-tag {
  margin-left: 10px;
}
</style>
