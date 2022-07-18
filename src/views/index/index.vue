<template>
  <div class="dv" v-for="v in 1000" :key="v">{{ v }}</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.dv {
  &:nth-child(2n + 1) {
    background: red;
  }
}
</style>
