import router from '@/router'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import useUserStore from '@/store/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  console.log(NProgress)

  NProgress.start()
  if (getToken()) {
    // if (to.path === '/login') {
    //   next({ path: '/' })
    // } else {
    next()
    // }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
