import axios from './axios'

// export const getMenu = (param) => {
//   return axios.request({
//     url: 'menu',
//     method: 'get'
//   })
// }

export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}

export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}
export const getUser1 = () => {
  return axios.request({
    url: '/user/getUser1',
    method: 'get',
  })
}


export const getMenu = (params) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: params
  })
}