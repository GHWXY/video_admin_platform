<template>
  <div class="app-container">
    <h1>章节信息</h1>

    <el-steps :active="2" finish-status="success">
      <el-step title="填写作品基本信息" />
      <el-step title="添加章节视频" />
      <el-step title="完成" />
    </el-steps>

    <el-button type="text" @click="showDialog()">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chapterList">
      <!--遍历章节-->
      <li v-for="chapter in chapterList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="dialogVideoFormVisible=true;chapterId = chapter.id;contentVideo={}">添加小节</el-button>
            <el-button style="" type="text" @click="editorChapter(chapter.id)">编辑</el-button>
            <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chapterListList sectionList">
          <li v-for="section in chapter.children" :key="section.id">
            <p>
              {{ section.title }}
              <span class="acts">
                <el-button type="text" @click="editorContentVideo(section.id)">编辑</el-button>
                <el-button type="text" @click="deleteContentVideo(section.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加小节的对话框-->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加小节">
      <el-form :model="contentVideo" label-width="120px">
        <el-form-item label="小节标题">
          <el-input v-model="contentVideo.title" />
        </el-form-item>
        <el-form-item label="视频排序">
          <el-input-number v-model="contentVideo.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="contentVideo.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- 上传视频 -->
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/services_vod/vod/upload'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

    <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>

  </div>
</template>
<script>
import chapter from '@/api/video/chapter'
import video from '@/api/video/content-video'
import vod from '@/api/video/vod'
export default {
  data() {
    return {
      active: 0,
      contentId: '', // 作品的id
      chapterList: [], // 章节与小节的列表
      chapter: {
        title: '',
        sort: 0
      },
      dialogChapterVisible: false,
      chapterId: '', // 当前小节所在的章节
      dialogVideoFormVisible: false,
      contentVideo: {
        title: '', // 小节标题
        sort: 0, // 小节排序
        isFree: 0, // 小节是否免费试看
        videoSourceId: '', // 小节视频地址
        videoOriginalName: ''// 小节视频标题
      },
      fileList: [], // 上传文件列表
      BASE_API: process.env.VUE_APP_BASE_API_VOD
    }
  },
  created() {
    // 获取路由当中的id
    if (this.$route.params && this.$route.params.id) {
      this.contentId = this.$route.params.id
      this.getChapterContentVideo()
    }
  },
  methods: {
    // 弹出章节对象框
    showDialog() {
      this.dialogChapterVisible = true
    },
    // 章节对话框保存按钮点击
    saveOrUpdate() {
      if (!this.chapter.id) {
        // 保存章节
        this.saveChapter()
      } else {
        // 更新章节
        this.updateChapter()
      }
    },
    /* 章节信息回显*/
    editorChapter(id) {
      this.dialogChapterVisible = true
      // 加载当前的数据回显
      chapter.getOneChapterWithId(id).then(res => {
        this.chapter = res.data.item
      })
    },
    // 更新章节
    updateChapter() {
      chapter.updateChapter(this.chapter).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.helpSaveChapter()
      })
    },
    /* 添加章节*/
    saveChapter() {
      this.chapter.contentId = this.contentId
      chapter.saveChapter(this.chapter).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        // 关闭弹窗
        // 重新加载数据
        this.helpSaveChapter()
      }).catch(res => {
        this.$message({
          type: 'error',
          message: res.message
        })
      })
    },
    /* 章节信息刷新*/
    helpSaveChapter() {
      this.dialogChapterVisible = false// 关闭对话框
      this.getChapterContentVideo()// 刷新列表
      this.chapter.title = ''// 重置章节标题
      this.chapter.sort = 0// 重置章节标题
    },
    /* 删除章节*/
    deleteChapter(id) {
      // 提示
      this.$confirm('真的发删除嘛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 发送删除的请求
        return chapter.deleteChapter(id)
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // 重新加载数据
        this.getChapterContentVideo()
      }).catch(res => {
        // 取消
        if (res === 'cancel') {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    // 加载列表数据
    getChapterContentVideo() {
      chapter.getChapterContentVideo(this.contentId).then(res => {
        // 章节列表信息
        this.chapterList = res.data.items
      })
    },
    // 保存小节
    saveOrUpdateVideo() {
      if (!this.contentVideo.id) {
        // 添加
        this.addContentVideo()
      } else {
        // 更新小节
        this.updateContentVideo()
      }
    },
    // 添加作品
    addContentVideo() {
      // 作品的id
      this.contentVideo.contentId = this.contentId
      // 章节id
      this.contentVideo.chapterId = this.chapterId
      // 发送添加请示
      video.saveVideoInfo(this.contentVideo).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.refreshData()
      })
    },

    // 小节的编辑回显
    editorContentVideo(id) {
      this.dialogVideoFormVisible = true
      video.getVideoInfoById(id).then(res => {
        this.contentVideo = res.data.item
        // 如果有视频, 显示视频标题
        if (this.contentVideo.videoOriginalName != '') {
          this.fileList = [{ 'name': this.contentVideo.videoOriginalName }]
        }
      })
    },
    // 添加作品
    updateContentVideo() {
      video.updateVideoInfo(this.contentVideo).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        // 重新加载数据
        this.refreshData()
      })
    },
    // 小节的删除
    deleteContentVideo(id) {
      this.$confirm('永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return video.deleteVideoById(id)
      }).then(() => {
        this.getChapterContentVideo()// 刷新列表
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    // 生新加载小节的数据
    refreshData() {
      this.dialogVideoFormVisible = false
      this.getChapterContentVideo()
      this.contentVideo.title = ''
      this.contentVideo.sort = 0
      this.contentVideo.isFree = 0
      this.contentVideo.videoSourceId = ''
      this.fileList = []
    },
    // 删除之前提示信息
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定删除 ${file.name}？`)
    },
    // 删除小节视频
    handleVodRemove(file, fileList) {
      vod.deleteVodById(this.contentVideo.videoSourceId).then(response => {
        // 清空当前小节视频id
        this.contentVideo.videoSourceId = ''

        this.$message({
          type: 'success',
          message: response.message
        })
        // 清空当前小节视频标题
        this.contentVideo.videoOriginalName = ''
        this.fileList = []
      })
    },

    // 自动上传成功回调
    handleVodUploadSuccess(response, file, fileList) {
      // 获取当前上传视频ID
      this.contentVideo.videoSourceId = response.data.videoId
      // 获取当前上传视频标题
      this.contentVideo.videoOriginalName = file.name
      this.fileList = [{ 'name': this.contentVideo.videoOriginalName }]
    },
    // 已经超过了指定数量时, 调用此方法
    handleUploadExceed(files, fileList) {
      this.$message.warning('请先删除已上传的视频')
    },
    // 上一步
    pre() {
      this.$router.push({ path: '/content/info/' + this.contentId })
    },
    // 下一步
    next() {
      this.$router.push({ path: '/content/send/' + this.contentId })
    }
  }
}
</script>
<style scoped>
ul{
  list-style: none;
}
.chapterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapterList li{
  position: relative;
}
.chapterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chapterList .acts {
  float: right;
  font-size: 14px;
}
.sectionList{
  padding-left: 50px;
}
.sectionList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dashed #DDD;
}
</style>
