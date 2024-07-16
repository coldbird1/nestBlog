import { login } from '@/api/login'
import { defineStore } from 'pinia'
import { setToken, removeToken } from '@/utils/auth'
const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    id: '',
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  }),
  actions: {
    // 登录
    login(userInfo: { username: string; password: string }) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login({ username, password })
          .then((response) => {
            console.log(response)

            this.token = response.data.access_token
            this.name = response.data.name
            setToken(this.token)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 退出登录
    logout() {
      return new Promise((resolve, reject) => {
        this.token = ''
        this.roles = []
        this.permissions = []
        removeToken()
        resolve(true)
      })
    }
  }
})

export default useUserStore
