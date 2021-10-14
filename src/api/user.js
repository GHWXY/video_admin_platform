import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/services_video/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/services_video/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
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
