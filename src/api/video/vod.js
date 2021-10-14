import request from '@/utils/request'

const api_name = '/services_vod/vod'

export default {

  deleteVodById(id) {
    return request({
      url: `${api_name}/delete-vod/${id}`,
      method: 'post'
    })
  }

}
