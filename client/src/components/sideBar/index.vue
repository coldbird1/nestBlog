<template>
  <div class=" sidebarBox w-200px  h-full overflow-hidden flex flex-col">
    <div class="titleBox w-full h-50px flex-shrink-0  text-20px font-600  flex justify-center items-center color-white">
      nestBlog</div>
    <ul class="menusBox flex-1 overflow-y-auto">
      <li v-for="(item, index) in menuData" :key="item.path"
        class="menuItem w-full h-60px  text-20px  flex justify-center items-center "
        :class="{ 'active': route.path === item.path }" @click="$router.push(item.path)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()

const menuData = [
  {
    name: '首页',
    path: '/home',
    icon: 'home',
  },
  {
    name: '分类',
    path: '/category',
    icon: 'category',
  },
  {
    name: '文章',
    path: '/article',
    icon: 'article',
  },
  {
    name: '用户',
    path: '/user',
    icon: 'user',
  }]
</script>
<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.titleBox {
  background-color: $topBar-color
}

.sidebarBox {
  box-shadow: rgba(0, 21, 41, 0.35) 2px 0px 6px 0px
}

.menusBox {
  .menuItem {
    cursor: pointer;
  }

  .menuItem:hover {
    background: blue;
    color: white;

  }

  .active {
    background: blue;
    color: white;
  }
}
</style>
