<template>
  <el-tag :type="props.config.typeCallBack(props.data[props.prop])">{{
    props.config.contCallBack(props.data[props.prop])
  }}</el-tag>
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

<style lang="scss" scoped></style>
