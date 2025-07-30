<template>
  <div class="create-post-container">
    <el-card class="create-post-card">
      <template #header>
        <h2>发布新帖</h2>
      </template>

      <el-form :model="postForm" :rules="rules" ref="postFormRef" label-width="80px" class="post-form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="postForm.title" placeholder="请输入帖子标题" />
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input
            v-model="postForm.content"
            type="textarea"
            rows="10"
            placeholder="请输入帖子内容"
          />
        </el-form-item>

        <el-form-item label="标签" prop="tags">
          <el-select v-model="postForm.tags" multiple placeholder="请选择标签">
            <el-option label="前端开发" value="frontend"></el-option>
            <el-option label="后端开发" value="backend"></el-option>
            <el-option label="移动开发" value="mobile"></el-option>
            <el-option label="人工智能" value="ai"></el-option>
            <el-option label="云计算" value="cloud"></el-option>
            <el-option label="数据库" value="database"></el-option>
            <el-option label="面试经验" value="interview"></el-option>
            <el-option label="职场交流" value="career"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">发布帖子</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '../stores/postStore';
import { ElMessage } from 'element-plus';

const router = useRouter();
const postStore = usePostStore();
const postFormRef = ref(null);

// 表单数据
const postForm = reactive({
  title: '',
  content: '',
  tags: []
});

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '请输入帖子标题', trigger: 'blur' },
    { min: 5, max: 100, message: '标题长度在 5 到 100 个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入帖子内容', trigger: 'blur' },
    { min: 20, message: '内容长度不能少于 20 个字符', trigger: 'blur' }
  ],
  tags: [
    { required: true, message: '请选择至少一个标签', trigger: 'change' }
  ]
};

// 提交表单
const submitForm = async () => {
  await postFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 在实际应用中，这里应该调用API提交表单
        const newPost = {
          id: Date.now(),
          title: postForm.title,
          content: postForm.content,
          tags: postForm.tags,
          author: '当前用户', // 实际应用中应该从登录状态获取
          date: new Date().toLocaleString(),
          comments: 0
        };

        // 调用store保存帖子
        postStore.addPost(newPost);

        ElMessage.success('帖子发布成功！');
        router.push('/forum');
      } catch (error) {
        ElMessage.error('帖子发布失败，请重试');
        console.error('发布失败:', error);
      }
    }
  });
};

// 重置表单
const resetForm = () => {
  postFormRef.value.resetFields();
};

// 返回上一页
const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.create-post-container {
  padding: 20px;
}

.create-post-card {
  max-width: 800px;
  margin: 0 auto;
}

.post-form {
  margin-top: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>