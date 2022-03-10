import Mock from 'mockjs'

import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
// import userApi1 from './mockServerData/user1'
import permissionApi from './mockServerData/permission'
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
Mock.mock('/home/getData', homeApi.getStatisticalData)
// Mock.mock('/api/user/getUser', userApi.getUserList)

Mock.mock(/user\/update/, 'post', userApi.updateUser)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)
Mock.mock('/api/user/getUser', 'get', userApi.getUserList)
Mock.mock('/api/user/getUser1',homeApi.getStatisticalData)
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)
// 权限相关
// Mock.mock(/api\/permission\/getMenu/, 'post', permissionApi.getMenu)