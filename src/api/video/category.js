import request from '@/utils/request'
export default {
  // 1.获取分类数据
  getCategoryData() {
    return request({
      url: `/services_video/category/getAllCategory`,
      method: 'get'
    })
  }
}
