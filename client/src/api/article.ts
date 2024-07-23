import request from '@/utils/request'

export const listArticle = (params: any) => {
  return request({
    url: '/article/list',
    method: 'get',
    params: params
  })
}
export const addArticle = (params: any) => {
  return request({
    url: '/article/add',
    method: 'post',
    data: params
  })
}

export const updateArticle = (params: any) => {
  return request({
    url: '/article/update/' + params.id,
    method: 'Patch',
    data: params
  })
}

export const delArticle = (params: any) => {
  return request({
    url: '/article/delete',
    method: 'delete',
    data: params
  })
}
