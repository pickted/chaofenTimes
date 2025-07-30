import { defineStore } from 'pinia';
import { ref } from 'vue';

// 从本地存储加载用户信息
const loadUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Failed to load user from storage:', error);
    return null;
  }
};

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: loadUserFromStorage(),
    isAuthenticated: !!loadUserFromStorage()
  }),
  getters: {
    // 获取当前用户信息
    getUserInfo: (state) => state.currentUser,
    // 检查用户是否已登录
    checkAuth: (state) => state.isAuthenticated
  },
  actions: {
    // 用户登录
    login(userInfo) {
      this.currentUser = userInfo;
      this.isAuthenticated = true;
      // 保存用户信息到本地存储
      localStorage.setItem('user', JSON.stringify(userInfo));
    },
    // 用户登出
    logout() {
      this.currentUser = null;
      this.isAuthenticated = false;
      // 清除本地存储
      localStorage.removeItem('user');
    },
    // 更新用户信息
    updateUserInfo(newInfo) {
      if (this.currentUser) {
        this.currentUser = { ...this.currentUser, ...newInfo };
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      }
    }
  }
});