<template>
  <div class="base-table">
    <div class="btn-box">
      <div class="btn-left">
        <el-button v-for="(v, i) in leftBtns" :key="i" :type="v.type">{{
          v.name
        }}</el-button>
      </div>
      <div class="btn-right">
        <el-button text circle icon="Refresh"></el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      :stripe="stripe"
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': textAlign }"
    >
      <el-table-column v-if="index" type="index" label="序号" />
      <el-table-column v-if="checkbox" type="selection" />
      <el-table-column
        v-for="(item, index) in tableColumn"
        :key="index"
        v-bind="item"
        :width="item.width"
      >
        <template v-slot="scope">
          <slot
            v-if="item.type === 'slot'"
            :name="item.slotName"
            :data="scope.row"
          ></slot>
          <component
            v-else
            :data="scope.row"
            :config="item"
            :prop="item.prop"
            :is="!item.type ? 'com-text' : `com-${item.type}`"
          ></component>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>
<script>
const modules = {}
const files = require.context('../control', true, /index.vue$/i)
files.keys().forEach((item) => {
  const key = item.split('/')
  const name = key[1]
  modules[`com-${name}`] = files(item).default
})
// console.log(modules)
export default {
  props: {
    index: Boolean,
    checkbox: Boolean,
    stripe: Boolean,
    page: Boolean,
    textAlign: {
      type: String,
      default: 'center'
    },
    tableColumn: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    leftBtns: {
      type: Array,
      default: () => []
    },
    total: Number
  },
  components: { ...modules },
  methods: {
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-box {
  margin: 0 0 20px 0;
  display: flex;
  justify-content: space-between;
}
.pagination {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
}
</style>
