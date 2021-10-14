import request from '@/utils/request'

const api_name = '/services_video/content-video'

export default {

  saveVideoInfo(videoInfo) {
    return request({
      url: `${api_name}/addContentVideo`,
      method: 'post',
      data: videoInfo
    })
  },

  getVideoInfoById(id) {
    return request({
      url: `${api_name}/getVideoInfoById/${id}`,
      method: 'get'
    })
  },

  updateVideoInfo(videoInfo) {
    return request({
      url: `${api_name}/updateContentVideo`,
      method: 'post',
      data: videoInfo
    })
  },

  deleteVideoById(id) {
    return request({
      url: `${api_name}/deleteContentVideoInfoById/${id}`,
      method: 'post'
    })
  }
}
