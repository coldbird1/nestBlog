<template>
  <div class="loginContainer">
    <el-form class="w-300px bg-white pb-4 px-8 b-rd-6px" ref="loginRef" :model="loginForm" :rules="loginRules">
      <h3 class="text-center">登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
          <!-- <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" size="large" auto-complete="off" placeholder="密码"
          @keyup.enter="handleLogin">
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" class="mb-25px">记住密码</el-checkbox>
      <el-form-item>
        <el-button :loading="loading" size="large" type="primary" class="w-full" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/user'
import { login } from '@/api/login';
const userStore = useUserStore()
const router = useRouter()
const loginRef = ref<FormInstance>()

const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: '',
})

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
}

const handleLogin = () => {
  loginRef.value?.validate(async (valid) => {
    if (valid) {
      login({ username: loginForm.username, password: loginForm.password }).then((res) => {
        router.push('/dashboard')
      }
      ).catch(() => {

      })
    }
  })
}

</script>

<style scoped lang="scss">
.loginContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/loginBg.jpg');
  background-size: cover;
}
</style>
