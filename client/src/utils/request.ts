import axios from 'axios'
import { setToken, removeToken, getToken } from '@/utils/auth'
import { ElMessageBox, ElMessage } from 'element-plus'
import useUserStore from '@/store/user'
import router from '@/router'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

//patch请求中需要删除的字段
const patchDelKey = ['createdAt', 'updatedAt', 'id', 'createdBy', 'updatedBy']

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000
})

//请求拦截器
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // 如果是PATCH请求，且请求体存在，删除请求体中的createdAt字段
    if (config.method === 'patch' && config.data) {
      // 注意：此处假设config.data是一个可被修改的对象，实际使用中需根据请求库的具体行为调整
      if (typeof config.data === 'object') {
        for (const key in config.data) {
          if (patchDelKey.includes(key)) {
            delete config.data[key]
          }
        }
      }
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = res.data.msg

    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }

    if (code === 401) {
      ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          useUserStore()
            .logout()
            .then(() => {
              router.replace('/login')
            })
        })
        .catch(() => {})
    } else if (code > 300) {
      ElMessage({ message: msg, type: 'error' })
      return Promise.reject(new Error(msg))
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    const { message, code } = error?.response?.data || error
    if (code === 401) {
      ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        useUserStore()
          .logout()
          .then(() => {
            router.replace('/login')
          })
      })
    } else {
      ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
      return Promise.reject(error)
    }
  }
)

export default service
