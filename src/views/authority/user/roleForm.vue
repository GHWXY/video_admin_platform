<template>
  <div class="app-container">
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >全选</el-checkbox>

    <div style="margin: 15px 0;" />
    <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
      <el-checkbox
        v-for="role in roles"
        :key="role.id"
        :label="role.id"
      >
        {{ role.roleName }}
      </el-checkbox>
    </el-checkbox-group>
    <br>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="update">保存</el-button>
  </div>
</template>

<script>

import userApi from '@/api/authority/user'
export default {
  data() {
    return {
      checkAll: false, // 是否选中先
      checkedRoles: [], // 已选中的角色id
      roles: [], // 所有的角色列表
      isIndeterminate: true, // 全选指示器状态
      userId: '', // 用户id
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        /** 获取用户id*/
        this.userId = this.$route.params.id
        /** 查询用户角色*/
        this.getById(this.userId)
      }
    },
    /** 根据用户id获取当前用的角色与所有角色列表*/
    getById(userId) {
      userApi.getAssign(userId).then(response => {
        /** 获取当前用户角色*/
        var jsonObj = response.data.assignRoles

        /** 从json当中获取id 设置角色复选框选中状态*/
        this.checkedRoles = this.getJsonToList(jsonObj, 'id')

        /** 所有角色的集合*/
        this.roles = response.data.allRolesList
        /** 判断全选是否为选中状态 */
        this.checkIsAll(this.checkedRoles)
      })
    },
    /** 把json数据转成string再转成对象，根据Key获取value数据*/
    getJsonToList(json, key) {
      /** 把JSON字符串转成对象*/
      const list = JSON.parse(JSON.stringify(json))
      var strText = []
      /** 遍历这个集合对象，获取key的值*/
      for (var i = 0; i < list.length; i++) {
        strText.push(list[i][key])
      }
      return strText
    },

    /** 全先按钮点击*/
    handleCheckAllChange(val) {
      /** 切换全选的数据*/
      this.checkedRoles = val ? this.getJsonToList(this.roles, 'id') : []
      this.isIndeterminate = false
    },
    /** 复选框切换角色点击*/
    handleCheckedRolesChange(value) {
      /** 判断是否为全选状态 */
      this.checkIsAll(value)
    },
    /** 是否选中所有复选框*/
    checkIsAll(value) {
      /** 当前选中的个数*/
      const checkedCount = value.length
      /** 如果当前选中的个数与总个数相等为全选状态*/
      this.checkAll = checkedCount === this.roles.length
      /** 全选指示器在大于0于小于总个数时显示*/
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length
    },
    /** 更新提交*/
    update() {
      /** 防止表单重复提交*/
      this.saveBtnDisabled = true
      var ids = this.checkedRoles.join(',')
      /** 修改权限*/
      userApi.saveAssign(this.userId, ids).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push({ path: '/authority/user/list' })
        }
      })
    }
  }
}
</script>
