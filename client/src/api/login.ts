import request from '@/utils/request'

interface LoginParams {
  username: string
  password: string
}
export const login = (params: LoginParams) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data: params
  })
}
