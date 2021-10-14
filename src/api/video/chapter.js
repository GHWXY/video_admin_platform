import request from '@/utils/request'
const apiName = '/services_video/chapter'
export default {
  // 请求章节列表
  getChapterContentVideo(content_id) {
    return request({
      url: `${apiName}/getChapterContentVideo/${content_id}`, // 路由参数拼接
      method: 'get'
    })
  },

  saveChapter(chapter) {
    return request({
      url: `${apiName}/addChapter`, // 路由参数拼接
      method: 'post',
      data: chapter
    })
  },
  getOneChapterWithId(id) {
    return request({
      url: `${apiName}/getChapterById/${id}`, // 路由参数拼接
      method: 'get'
    })
  },
  updateChapter(chapter) {
    return request({
      url: `${apiName}/updateChapter`, // 路由参数拼接
      method: 'post',
      data: chapter
    })
  },
  deleteChapter(id) {
    return request({
      url: `${apiName}/deleteChapterById/${id}`, // 路由参数拼接
      method: 'post'
    })
  }

}
