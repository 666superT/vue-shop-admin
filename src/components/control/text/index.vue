<template>
  <div class="">{{ props.data[props.prop] }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  prop: {
    type: String,
    default: ''
  },
  config: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped></style>
