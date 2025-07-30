<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <h2 class="register-title">用户注册</h2>
      </template>

      <el-form :model="registerForm" :rules="rules" ref="registerFormRef" label-width="100px" class="register-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" :prefix-icon="User" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" type="email" placeholder="请输入邮箱" :prefix-icon="Message" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请确认密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="agreement">
          <el-checkbox v-model="registerForm.agreement">
            我已阅读并同意<a href="#" class="agreement-link">用户协议</a>和<a href="#" class="agreement-link">隐私政策</a>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" class="register-button">注册</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>

        <div class="login-link">
          <span>已有账号？</span>
          <router-link to="/login" class="link">立即登录</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { User, Message, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/userStore';

const router = useRouter();
const userStore = useUserStore();
const registerFormRef = ref(null);

// 注册表单数据
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false
});






// 确认密码验证
const confirmPasswordValidator = (rule, value, callback) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

// 用户协议验证
const agreementValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请阅读并同意用户协议和隐私政策'));
  } else {
    callback();
  }
};

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]*$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, message: '密码必须包含大小写字母和数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: confirmPasswordValidator, trigger: 'blur' }
  ],
  agreement: [
    { validator: agreementValidator, trigger: 'change' }
  ]
};
// 提交注册表单
const submitForm = async () => {
  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 在实际应用中，这里应该调用注册API
        const newUser = {
          id: Date.now(),
          username: registerForm.username,
          email: registerForm.email,
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        };

        // 注册成功后自动登录
        userStore.login(newUser);

        ElMessage.success('注册成功！');
        router.push('/forum');
      } catch (error) {
        ElMessage.error('注册失败，请重试');
        console.error('注册失败:', error);
      }
    }
  });
};

// 重置表单
const resetForm = () => {
  registerFormRef.value.resetFields();
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  padding: 20px;
}

.register-card {
  width: 500px;
}

.register-title {
  text-align: center;
}

.register-form {
  margin-top: 20px;
}

.register-button {
  width: 100%;
}

.agreement-link {
  color: #42b983;
}

.login-link {
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