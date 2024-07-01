<template>
  <div class="h-full w-full flex">
    <SideBar></SideBar>
    <div class="w-full">
      <TopBar></TopBar>
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import SideBar from '@/components/sideBar/index.vue'
import TopBar from '@/components/topBar/index.vue'
</script>

<style scoped lang="scss"></style>
