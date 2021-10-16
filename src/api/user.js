import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/services_authority/admin/index/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/services_authority/admin/index/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/services_authority/admin/index/logout',
    method: 'post'
  })
}

// 获取菜单权限数据
export function getMoveRouter() {
  return request({
    url: '/services_authority/admin/index/menu',
    method: 'get'
  })
}
