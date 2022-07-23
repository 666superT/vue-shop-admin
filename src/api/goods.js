import request from '../utils/request'

// 获取商品列表
function getGoodsList(params, current) {
  if (params.title && params.category_id) {
    return request({
      url: `/admin/goods/${current}?title=${params.title}&tab=${params.tab}&category_id=${params.category_id}`,
      method: 'GET'
    })
  }
  if (params.title) {
    return request({
      url: `/admin/goods/${current}?title=${params.title}&tab=${params.tab}`,
      method: 'GET'
    })
  }
  if (params.category_id) {
    return request({
      url: `/admin/goods/${current}?tab=${params.tab}&category_id=${params.category_id}`,
      method: 'GET'
    })
  }
  if (!params.title && !params.category_id) {
    return request({
      url: `/admin/goods/${current}?tab=${params.tab}`,
      method: 'GET'
    })
  }
}

// 获取商品分类下拉选项
function getCategoriesList() {
  return request({
    url: '/admin/category',
    method: 'GET'
  })
}

export { getGoodsList, getCategoriesList }
