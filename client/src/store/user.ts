import { login } from '@/api/login'
import { defineStore } from 'pinia'

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
            this.token = response.data.token
            this.name = response.data.name
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})

export default useUserStore
