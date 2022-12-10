<script setup>
import LoadingVue from './view/Loading.vue';
import { useSystem } from '@/store/system'

const system = useSystem();
</script>

<template>
  <LoadingVue v-show="system.isLoading"></LoadingVue>
  <router-view></router-view>
</template>

<style scoped lang="scss">
div {
  color: var(--theme-color);
}
</style>
