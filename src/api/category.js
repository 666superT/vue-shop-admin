import request from '../utils/request'

// 获取分类列表
function getCategoryList() {
  return request({ url: '/admin/category', method: 'get' })
}

// 修改状态
function upStatus(data) {
  return request({
    url: `/admin/category/${data.id}/update_status`,
    method: 'post',
    data: { status: data.status }
  })
}
export { getCategoryList, upStatus }
