<template>
  <div class=" sidebarBox w-200px  h-full">
    <div class="titleBox w-full h-50px  text-20px font-600  flex justify-center items-center color-white">nestBlog</div>
    <ul class="menusBox">
      <li v-for="(item, index) in menuData" :key="item.path"
        class="menuItem w-full h-50px  text-20px  flex justify-center items-center ">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const menuData = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '分类',
    path: '/category',
    icon: 'category',
  },
  {
    name: '标签',
    path: '/tag',
    icon: 'tag',
  },
  {
    name: '关于',
    path: '/about',
    icon: 'about',
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
</style>
