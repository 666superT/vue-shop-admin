/* jshint esversion: 6 */

import request from '@/utils/request'

// 登录
function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 获取用户信息
function getUserInfo() {
  return request({ url: '/admin/getinfo', method: 'post' })
}
export { login, getUserInfo }
