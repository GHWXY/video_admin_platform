import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
  // {
  //   path: '/author',
  //   component: Layout,
  //   // redirect: '/author/table',
  //   name: '创作者管理',
  //   meta: { title: '创作者管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: '作者列表',
  //       component: () => import('@/views/video/author/list'),
  //       meta: { title: '作者列表', icon: 'table' }
  //     },
  //     {
  //       path: 'save',
  //       name: '添加作者',
  //       component: () => import('@/views/video/author/save'),
  //       meta: { title: '添加作者', icon: 'tree' }
  //     },
  //     {
  //       path: 'edit/:id',
  //       name: '编辑',
  //       component: () => import('@/views/video/author/save'),
  //       meta: { title: '编辑', icon: 'tree' },
  //       hidden: true
  //     }
  //   ]
  // },

  // region 没有整合security之前
  /*
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/author',
    component: Layout,
    redirect: '/author/table',
    name: '创作者管理',
    meta: { title: '创作者管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '作者列表',
        component: () => import('@/views/video/author/list'),
        meta: { title: '作者列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加作者',
        component: () => import('@/views/video/author/save'),
        meta: { title: '添加作者', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑',
        component: () => import('@/views/video/author/save'),
        meta: { title: '编辑', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    name: '视频分类管理',
    meta: { title: '视频分类管理', icon: 'el-icon-s-help' },
    children: [y
      {
        path: 'list',
        name: '视频分类列表',
        component: () => import('@/views/video/category/list'),
        meta: { title: '分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '上传视频分类',
        component: () => import('@/views/video/category/save'),
        meta: { title: '上传分类', icon: 'tree' }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/list',
    name: '作品管理',
    meta: { title: '作品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '作品列表',
        component: () => import('@/views/video/content/list'),
        meta: { title: '作品列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '添加作品',
        component: () => import('@/views/video/content/info'),
        meta: { title: '添加作品', icon: 'tree' },
        hidden: false
      },
      {
        path: 'info/:id',
        name: '添加作品',
        component: () => import('@/views/video/content/info'),
        meta: { title: '添加作品', icon: 'tree' },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: '章节信息',
        component: () => import('@/views/video/content/chapter'),
        meta: { title: '章节信息', icon: 'tree' },
        hidden: true
      },
      {
        path: 'send/:id',
        name: '最终发布',
        component: () => import('@/views/video/content/send'),
        meta: { title: '最终发布', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/authority',
    component: Layout,
    redirect: '/authority/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/authority/user/list'),
        meta: { title: '用户管理', icon: 'table' },
        hidden: false
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/authority/user/form'),
        meta: { title: '用户添加', icon: 'tree' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/authority/user/form'),
        meta: { title: '用户修改', icon: 'tree' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/authority/user/roleForm'),
        meta: { title: '用户角色', icon: 'tree' },
        hidden: true
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/authority/role/list'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'role/add',
        name: '角色添加',
        component: () => import('@/views/authority/role/form'),
        meta: { title: '角色添加', icon: 'tree' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/authority/role/form'),
        meta: { title: '角色修改', icon: 'tree' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/authority/role/menuForm'),
        meta: { title: '角色权限', icon: 'tree' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/authority/menu/list'),
        meta: { title: '菜单管理', icon: 'table' }
      }

    ]
  },*/
  // endregion 没有整合security之前
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
