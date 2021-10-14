<template>
  <div class="app-container">
    <h1>最终发布</h1>

    <el-steps :active="3" finish-status="success">
      <el-step title="填写作品基本信息" />
      <el-step title="添加章节视频" />
      <el-step title="完成" />
    </el-steps>

    <div class="contentInfo">
      <img :src="contentSendObj.cover">
      <div class="main">
        <h2>{{ contentSendObj.title }}</h2>
        <p class="gray"><span>共{{ contentSendObj.contentNum }}总数</span></p>
        <p><span>所属分类：{{ contentSendObj.oneCategory }} — {{ contentSendObj.twoCategory }}</span></p>
        <p>作者：{{ contentSendObj.author }}</p>
        <h3 class="red">￥{{ contentSendObj.price }}</h3>
      </div>
    </div>

    <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="send">发布</el-button>
  </div>

</template>

<script>
import content from '@/api/video/content'
export default {
  data() {
    return {
      active: 0,
      contentId: '',
      contentSendObj: {}
    }
  },
  created() {
    // 获取路由当中的id
    if (this.$route.params && this.$route.params.id) {
      this.contentId = this.$route.params.id
      // 获取信息
      this.getPreviewInfo()
    }
  },
  methods: {
    getPreviewInfo() {
      content.getContentPreview(this.contentId).then(res => {
        this.contentSendObj = res.data.item
      })
    },
    send() {
      content.sendContent(this.contentId).then(res => {
        // 发布成功,跳转到列表页
        this.$router.push({ path: '/content/list' })
      })
    },
    pre() {
      this.$router.push({ path: '/content/chapter/' + this.contentId })
    }
  }
}
</script>

<style scoped>
.contentInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #DDD;
  margin-bottom: 40px;
  position: relative;
}
.contentInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.contentInfo .main {
  margin-left: 520px;
}

.contentInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.contentInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}

.contentInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.contentInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
