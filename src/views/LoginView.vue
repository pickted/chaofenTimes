<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2 class="login-title">用户登录</h2>
      </template>

      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px" class="login-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="User" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" class="login-button">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>

        <div class="register-link">
          <span>还没有账号？</span>
          <router-link to="/register" class="link">立即注册</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/userStore';

const router = useRouter();
const userStore = useUserStore();
const loginFormRef = ref(null);

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
});

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur' }
  ]
};

// 提交登录表单
const submitForm = async () => {
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 在实际应用中，这里应该调用登录API
        const mockUser = {
          id: 1,
          username: loginForm.username,
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        };

        // 保存用户信息到store
        userStore.login(mockUser);

        ElMessage.success('登录成功！');
        router.push('/forum');
      } catch (error) {
        ElMessage.error('用户名或密码错误');
        console.error('登录失败:', error);
      }
    }
  });
};

// 重置表单
const resetForm = () => {
  loginFormRef.value.resetFields();
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 180px);
  padding: 20px;
}

.login-card {
  width: 400px;
}

.login-title {
  text-align: center;
}

.login-form {
  margin-top: 20px;
}

.login-button {
  width: 100%;
}

.register-link {
  margin-top: 15px;
  text-align: center;
}

.link {
  color: #42b983;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>