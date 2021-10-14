<template>
  <div class="app-container">
    <el-form label-width="120px">
      <!--下载excel模板-->
      <el-form-item label="描述信息">
        <el-tag type="info">excel模板说明</el-tag>
        &nbsp;
        <el-tag>
          <i class="el-icon-download" />
          <a href="./excelMoudle/视频分类.xlsx" download="视频分类.xlsx">点击下载模板</a>
        </el-tag>
      </el-form-item>
      <!--上传excel-->
      <el-form-item label="上传信息">
        <el-upload
          ref="upload"
          :action="BASE_API+'/services_video/category/addCategory'"
          :auto-upload="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          accept=".xls, .xlsx"
          :limit="1"
          :disabled="btnDisabled"
          name="file"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'Save',
  data() {
    return {
      btnDisabled: false,
      loading: false,
      BASE_API: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
      this.btnDisabled = true
      this.loading = true
    },
    uploadSuccess(response) {
      this.loading = false
      this.$message({
        type: 'success',
        message: '添加作品分类成功'
      })
      /* 跳转到列表页*/
      this.$router.push({ path: '/category/list' })
    },
    uploadError() {
      alert('error')
    }
  }

}
</script>

<style scoped>

</style>
