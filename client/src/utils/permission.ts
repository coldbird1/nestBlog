import router from '@/router'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import useUserStore from '@/store/user'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
