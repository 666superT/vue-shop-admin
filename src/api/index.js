import request from '@/utils/request'

/**
 * 获取首页卡片信息
 */
function getStatistics1() {
  return request({
    url: '/admin/statistics1',
    method: 'GET'
  })
}

function getStatistics2() {
  return request({
    url: '/admin/statistics2',
    method: 'GET'
  })
}

function getStatistics3(params) {
  return request({ url: `/admin/statistics3?type=${params}`, method: 'get' })
}

export { getStatistics1, getStatistics2, getStatistics3 }
