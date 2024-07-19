<template>
  <div class="h-full w-full flex">
    <SideBar class="flex-shrink-0 w-200px"></SideBar>
    <div class="w-full flex flex-col flex-1">
      <TopBar class="flex-shrink-0"></TopBar>
      <router-view class="flex-1"></router-view>
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import SideBar from '@/components/sideBar/index.vue'
import TopBar from '@/components/topBar/index.vue'
</script>

<style scoped lang="scss"></style>
