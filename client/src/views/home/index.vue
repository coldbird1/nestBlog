<template>
  <div class="mainContainer  h-full w-full overflow-y-auto">
    <div class="item">真</div>
    <div class="item">的</div>
    <div class="item">好</div>
    <div class="item">烦</div>
    <div class="item">啊</div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>

  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import SideBar from '@/components/sideBar/index.vue'
import TopBar from '@/components/topBar/index.vue'
</script>

<style scoped lang="scss">
.mainContainer {
  // height: calc(100vh - 50px);
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  // grid-template-rows: 200px;
  /* 最小高度200px，内容可扩展 */
  gap: 1rem
}

.item {
  background-color: pink;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 200px;
}
</style>
