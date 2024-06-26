import request from '@/utils/request'

interface LoginParams {
  username: string
  password: string
}
export const login = (params: LoginParams) => {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}
