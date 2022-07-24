<template>
  <el-card class="box-card">
    <base-table
      :tableColumn="categoryTableColumn"
      :tableData="categoryList"
      :leftBtns="leftBtns"
      :textAlign="'left'"
    >
      <template v-slot:btn="data">
        <span style="float: right">
          <el-button type="primary" link size="small">推荐商品</el-button>
          <el-switch
            v-model="data.data.status"
            :active-value="active"
            :inactive-value="inactive"
            @change="handleChangeSwitch(data.data.id, data.data.status)"
          />
          <el-button type="primary" link size="small">修改</el-button>
          <el-button type="primary" link size="small">删除</el-button>
        </span>
      </template>
    </base-table>
  </el-card>
</template>

<script setup>
import BaseTable from '../../components/BaseTable'
import { reactive, ref } from 'vue'
import { getCategoryList, upStatus } from '../../api/category'

const leftBtns = reactive([{ type: 'primary', name: '新增', method: 'add' }])

let inactive = ref(0)
let active = ref(1)

// 获取分类列表
let categoryList = reactive([])
async function handleGetCategoryList() {
  const res = await getCategoryList()
  // console.log(res)
  categoryList.push(...res)
}
handleGetCategoryList()

// 分类表格配置
const categoryTableColumn = reactive([
  {
    type: 'text',
    prop: 'name'
  },
  {
    type: 'slot',
    slotName: 'btn'
  }
])

// 修改状态
async function handleChangeSwitch(id, status) {
  const res = await upStatus({ id, status })
  console.log(res)
}
</script>

<style lang="scss" scoped>
/* el-table表格去掉横线 */
::v-deep .el-table__row > td {
  border: none;
}
::v-deep .el-table::before {
  height: 0px;
}
::v-deep .el-table__cell {
  border-bottom: none !important;
}
::v-deep .el-table__inner-wrapper::before {
  display: none !important;
}
</style>
