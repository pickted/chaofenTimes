import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'forum',
    component: () => import('../views/ForumView.vue')
  },

  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreatePostView.vue')
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../views/PostDetailView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // 懒加载路由组件
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 可以在这里添加权限验证等逻辑
  console.log('路由跳转: 从', from.name, '到', to.name)
  next()
})

export default router
