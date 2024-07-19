<template>
  <div class="topbarBox w-full h-50px flex ">
    <div class="group ml-auto mr-20px relative flex items-center">
      <img class="w-36px h-36px rounded-full" src="@/assets/images/loginBg.jpg" alt="">
      <div class="absolute bg-white text-gray-700 text-sm top-12.5 right-0 w-24 rounded-md ring-1 ring-black ring-opacity-5 
        scale-0 group-hover:scale-100 duration-300 origin-top-right ">
        <a class="block hover:bg-gray-100 hover:cursor-pointer px-4 py-2 text-center" @click="goAccount">个人中心</a>
        <a class="block hover:bg-gray-100 hover:cursor-pointer px-4 py-2 text-center" @click="handleLogout">退出登录</a>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
const handleLogout = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userStore.logout().then(() => {
        router.replace('/login')
      })
    })
    .catch(() => { })
}

const goAccount = () => {
  router.push('/account')
}
</script>
<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.topbarBox {
  background-color: $topBar-color
}
</style>
