<template>
  <el-menu
    default-active="2"
    :collapse="$store.getters.isCollapse"
    :style="{ width: !$store.getters.isCollapse ? '250px' : '64px' }"
    :collapse-transition="false"
    :class="$store.getters.isCollapse ? 'cl' : 'op'"
    active-text-color="#409eff"
    text-color="#303133"
    unique-opened
    router
  >
    <Item v-for="v in menu" :key="v.name" :item="v"></Item>
  </el-menu>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Item from './Item'

const store = useStore()

const menu = computed(() => {
  return store.getters.menuList
})
// console.log('888', menu)
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.op {
  animation-name: op;
  animation-duration: 0.4s;
}
.cl {
  animation-name: cl;
  animation-duration: 0.4s;
}
@keyframes op {
  0% {
    width: 64px;
  }
  100% {
    width: 250px;
  }
}
@keyframes cl {
  0% {
    width: 250px;
  }
  100% {
    width: 64px;
  }
}
</style>
