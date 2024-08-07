import request from '@/utils/request'

// interface LoginParams {
//   username: string
//   password: string
// }
export const listCategory = (params: any) => {
  return request({
    url: '/category/list',
    method: 'get',
    params: params
  })
}
export const addCategory = (params: any) => {
  return request({
    url: '/category/add',
    method: 'post',
    data: params
  })
}

export const updateCategory = (params: any) => {
  return request({
    url: '/category/update/' + params.id,
    method: 'Patch',
    data: params
  })
}

export const delCategory = (params: any) => {
  return request({
    url: '/category/deleteBatch',
    method: 'delete',
    data: params
  })
}
