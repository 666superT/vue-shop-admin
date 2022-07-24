<template>
  <div class="">
    <!--    tabs切换栏-->
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index.name"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <!--主体-->
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="queryForm"
        class="demo-form-inline"
        ref="QueryFormRef"
      >
        <el-form-item label="关键词" prop="title">
          <el-input
            v-model="queryForm.title"
            placeholder="商品名称"
            clearable
            @clear="handleClear"
          />
        </el-form-item>
        <el-form-item label="商品分类" prop="category_id" v-show="showCategory">
          <el-select
            v-model="queryForm.category_id"
            placeholder="请选择商品分类"
            clearable
            @clear="handleClear"
          >
            <el-option
              v-for="v in cateGoryList"
              :key="v.category_id"
              :label="v.name"
              :value="v.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearchGoods">搜索</el-button>
          <el-button @click="handleResetForm(QueryFormRef)">重置</el-button>
          <el-button
            v-show="!showCategory"
            icon="ArrowUp"
            text
            type="primary"
            @click="showCategory = !showCategory"
            >展开</el-button
          >
          <el-button
            v-show="showCategory"
            icon="ArrowDown"
            text
            type="primary"
            @click="showCategory = !showCategory"
            >收起</el-button
          >
        </el-form-item>
      </el-form>

      <base-table
        @handleCurrentChange="handleCurrentChange"
        :tableColumn="tableColumn"
        :tableData="goodsList"
        :total="total"
        :leftBtns="leftBtns"
        page
        stripe
        checkbox
      >
        <template v-slot:btn>
          <el-button
            v-for="(v, i) in btnList"
            :key="i"
            type="primary"
            link
            size="small"
            >{{ v.name }}</el-button
          >
        </template>
      </base-table>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BaseTable from '../../components/BaseTable'
import { getCategoriesList, getGoodsList } from '@/api/goods'

// 表格头部左边按钮
const leftBtns = reactive([
  { type: 'primary', name: '新增', method: 'add' },
  { type: 'danger', name: '批量删除', method: 'delAll' },
  { name: '上架', method: 'up' },
  { name: '下架', method: 'down' }
])

const tabList = reactive([
  {
    label: '全部',
    name: 'all'
  },
  {
    label: '审核中',
    name: 'checking'
  },
  {
    label: '出售中',
    name: 'saling'
  },
  {
    label: '已下架',
    name: 'off'
  },
  {
    label: '库存预警',
    name: 'min_stock'
  },
  {
    label: '回收站',
    name: 'delete'
  }
])
let activeName = ref('all')

const btnList = reactive([
  { name: '修改' },
  { name: '商品规格' },
  { name: '设置轮播图' },
  { name: '商品详情' },
  { name: '删除' }
])

const tableColumn = reactive([
  {
    prop: 'cover',
    label: '商品',
    type: 'image',
    width: '300px'
  },
  {
    prop: 'sale_count',
    label: '实际销量',
    type: 'text'
  },
  {
    prop: 'status',
    label: '商品状态',
    type: 'tag',
    contCallBack: (val) => (val === 0 ? '仓库' : '上架'),
    typeCallBack: (val) => (val === 0 ? 'danger' : 'success')
  },
  {
    prop: 'ischeck',
    label: '审核状态',
    type: 'function',
    callback(ischeck) {
      switch (ischeck) {
        case 1:
          return '通过'
        case 2:
          return '拒绝'
        default:
          return '其他'
      }
    }
  },
  {
    prop: 'stock',
    label: '总库存',
    type: 'text'
  },
  {
    type: 'slot',
    label: '操作',
    slotName: 'btn',
    width: '400px'
  }
])

// 搜索框
const queryForm = reactive({
  title: '',
  category_id: ''
})

// 搜索框删除重新请求
function handleClear() {
  handleGoodsList()
}

// 获取商品分类
let cateGoryList = ref('')

async function handleCategory() {
  const res = await getCategoriesList()
  // console.log(res)
  cateGoryList.value = res
}

handleCategory()

// 获取商品列表
let goodsList = ref()
let cateList = ref()
let total = ref()
let current = ref(1)

async function handleGoodsList() {
  const res = await getGoodsList(
    {
      title: queryForm.title,
      category_id: queryForm.category_id,
      tab: activeName.value
    },
    current.value
  )
  console.log(res)
  goodsList.value = res.list
  cateList.value = res.cates
  total.value = res.totalCount
}

handleGoodsList()

// 搜索商品
function handleSearchGoods() {
  current.value = 1
  handleGoodsList()
}

// 换页
function handleCurrentChange(val) {
  current.value = val
  handleGoodsList()
}

// tab栏切换
function handleTabClick(TabsPaneContext) {
  // console.log(TabsPaneContext.props.name)
  // console.log(activeName.value)
  activeName.value = TabsPaneContext.props.name
  handleGoodsList()
}

// 重置表单
const QueryFormRef = ref('')
function handleResetForm() {
  QueryFormRef.value.resetFields()
}

let showCategory = ref(false)
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
}
</style>
