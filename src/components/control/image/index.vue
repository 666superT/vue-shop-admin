<template>
  <div class="shop">
    <!-- <el-image
      style="width: 50px; height: 50px; border-radius: 5px"
      :src="props.data[props.prop]"
    /> -->
    <div class="left">
      <el-avatar shape="square" :size="50" :src="props.data[props.prop]" />
    </div>

    <div class="right">
      <div class="title">{{ props.data.desc }}</div>
      <div class="price">
        <span>￥{{ props.data.min_oprice }}</span>
        <span>|</span>
        <span>￥{{ props.data.min_price }}</span>
      </div>
      <!-- <div>分类：{{ props.data.category.name }}</div> -->
      <div class="create_time">创建时间：{{ props.data.update_time }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  config: {
    type: Object,
    default: () => {}
  },
  prop: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.shop {
  display: flex;
  align-items: center;
  .left {
    flex-shrink: 0;
  }
  .right {
    margin-left: 10px;
  }
}
</style>
