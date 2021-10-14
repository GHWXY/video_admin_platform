<template>

  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="分类">
        <el-select
          v-model="searchObj.categoryParentId"
          placeholder="请选择"
          @change="oneCategoryChanged"
        >
          <el-option
            v-for="category in oneCategoryList"
            :key="category.id"
            :label="category.title"
            :value="category.id"
          />
        </el-select>
        &nbsp;
        <!-- 二级分类 -->
        <el-select v-model="searchObj.categoryId" placeholder="请选择">
          <el-option
            v-for="twoCategory in twoCategoryList"
            :key="twoCategory.id"
            :label="twoCategory.title"
            :value="twoCategory.id"
          />
        </el-select>

      </el-form-item>

      <!-- 标题 -->
      <el-form-item>
        <el-input v-model="searchObj.title" placeholder="作品标题" />
      </el-form-item>
      <!-- 作者 -->
      <el-form-item>
        <el-select
          v-model="searchObj.authorId"
          placeholder="请选择作者"
        >
          <el-option
            v-for="author in authorList"
            :key="author.id"
            :label="author.name"
            :value="author.id"
          />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-row :gutter="20">
      <el-col v-for="item in list" :span="5">
        <div class="grid-content bg-purple">
          <img :src="item.cover" alt="scope.row.title" width="100%" height="150px">
          <a href="#" style="font-size: 14px; color: #333">{{ item.title }}</a>
          <p style="margin-top: 0">
            <router-link :to="'/content/info/'+item.id">
              <el-button type="text" size="mini" icon="el-icon-edit">编辑作品信息</el-button>
            </router-link>

            <el-button
              style="margin-left: 100px"
              type="text"
              size="mini"
              icon="el-icon-delete"
              @click="deleteContentById(item.id)"
            >删除</el-button>
          </p>
          <p style="font-size: 14px; color: red; margin-top: -15px;">
            价格: {{ Number(item.price) === 0 ? '免费' : '¥' + item.price.toFixed(2) }}
          </p>
        </div>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getData"
    />

  </div>

</template>

<script>
import content from '@/api/video/content'
import category from '@/api/video/category'
export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {
        categoryParentId: '',
        categoryId: '',
        title: '',
        authorId: ''
      }, // 查询条件
      authorList: [], // 讲师列表
      oneCategoryList: [], // 一级分类列表
      twoCategoryList: [] // 二级分类列表,
    }
  },
  created() {
    // 当页面加载时获取数据
    this.getData()
    // 初始化分类列表
    this.getCategoryList()
    // 获取作者列表
    this.getAuthorList()
  },
  methods: {
    getData(page = 1) { // 调用api层获取数据库中的数据
      // 当点击分页组件的切换按钮的时候，会传输一个当前页码的参数page
      // 解决分页无效问题
      this.page = page
      this.listLoading = true
      content.getContentPageList(this.page, this.limit, this.searchObj).then(response => {
        // debugger 设置断点调试
        if (response.success === true) {
          this.list = response.data.rows
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },

    deleteContentById(id) {
      this.$confirm('真的要删除该作品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return content.deleteContentById(id)
      }).then(() => {
        this.getData()
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

    getAuthorList() {
      content.getAuthorList().then(res => {
        this.authorList = res.data.list
      })
    },

    // 加载所有的分类
    getCategoryList() {
      // 1.获取一级分类
      category.getCategoryData().then(res => {
        this.oneCategoryList = res.data.list
      })
    },
    // 当一级分类改变时调用的 方法  参数:当前一级分类选择的id
    oneCategoryChanged(value) {
      for (var i = 0; i < this.oneCategoryList.length; i++) {
        var category = this.oneCategoryList[i]
        if (value === category.id) {
          this.twoCategoryList = category.children
          // 清空已经选择的二级分类
          this.searchObj.categoryId = ''
        }
      }
    },
    resetData() {
      this.searchObj = {}
      this.twoCategoryList = [] // 二级分类列表
      this.getData()
    }
  }
}

</script>

<style scoped>
.app-container{
  width: 1260px;
}
.el-col {
  margin-top: 10px;
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 250px;

}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

</style>
