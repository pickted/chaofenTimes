<template>
  <div class="post-detail-container">
    <el-card v-if="post" class="post-detail-card">
      <div class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-author"><el-icon><User /></el-icon> {{ post.author }}</span>
          <span class="post-date"><el-icon><Calendar /></el-icon> {{ post.date }}</span>
          <span class="post-comments"><el-icon><Message /></el-icon> {{ post.comments }} 评论</span>
          <div class="post-tags">
            <el-tag v-for="tag in post.tags" :key="tag" class="tag-item">{{ formatTag(tag) }}</el-tag>
          </div>
        </div>
      </div>

      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>

      <div class="post-actions">
        <el-button type="text" icon="Thumb" class="action-button">点赞 ({{ post.likes || 0 }})</el-button>
        <el-button type="text" icon="Share" class="action-button">分享</el-button>
        <el-button type="text" icon="Edit" class="action-button">编辑</el-button>
      </div>
    </el-card>

    <el-empty v-else description="帖子不存在或已被删除"></el-empty>

    <!-- 评论区 -->
    <div class="comments-section" v-if="post">
      <h3>评论区</h3>
      <el-divider></el-divider>

      <el-card class="comment-form-card">
        <el-form :model="commentForm" :rules="commentRules" ref="commentFormRef" class="comment-form">
          <el-form-item prop="content">
            <el-input
              v-model="commentForm.content"
              type="textarea"
              rows="3"
              placeholder="写下你的评论..."
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitComment">提交评论</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="comments-list">
        <el-card v-for="(comment, index) in post.commentsList || []" :key="index" class="comment-item-card">
          <div class="comment-header">
            <span class="comment-author">{{ comment.author }}</span>
            <span class="comment-time">{{ comment.time }}</span>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
        </el-card>

        <div v-if="!(post.commentsList && post.commentsList.length)">
          <el-empty description="暂无评论，快来抢沙发！"></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '../stores/postStore';
import { ElMessage } from 'element-plus';
import { User, Calendar, Message, Thumb, Share, Edit } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const post = ref(null);
const commentFormRef = ref(null);

// 评论表单数据
const commentForm = ref({
  content: ''
});

// 评论验证规则
const commentRules = {
  content: [
    { required: true, message: '请输入评论内容', trigger: 'blur' },
    { min: 3, message: '评论内容不能少于3个字符', trigger: 'blur' }
  ]
};

// 格式化标签显示
const formatTag = (tag) => {
  const tagMap = {
    frontend: '前端开发',
    backend: '后端开发',
    mobile: '移动开发',
    ai: '人工智能',
    cloud: '云计算',
    database: '数据库',
    interview: '面试经验',
    career: '职场交流'
  };
  return tagMap[tag] || tag;
};

// 获取帖子详情
const getPostDetail = () => {
  const postId = route.params.id;
  post.value = postStore.getPostById(postId);
  if (!post.value) {
    ElMessage.warning('未找到该帖子');
    router.push('/forum');
  }
};

// 提交评论
const submitComment = async () => {
  await commentFormRef.value.validate(async (valid) => {
    if (valid) {
      const newComment = {
        author: '当前用户', // 实际应用中应从登录状态获取
        content: commentForm.value.content,
        time: new Date().toLocaleString()
      };

      postStore.addComment(route.params.id, newComment);
      commentForm.value.content = '';
      ElMessage.success('评论成功！');
    }
  });
};

onMounted(() => {
  getPostDetail();
});
</script>

<style scoped>
.post-detail-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.post-detail-card {
  margin-bottom: 30px;
}

.post-header {
  margin-bottom: 20px;
}

.post-title {
  margin-bottom: 15px;
  color: #303133;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px 25px;
  color: #606266;
  margin-bottom: 15px;
}

.tag-item {
  margin-right: 5px;
}

.post-content {
  font-size: 16px;
  line-height: 1.8;
  color: #303133;
  padding: 20px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.post-actions {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}

.action-button {
  color: #606266;
}

.comments-section {
  margin-top: 30px;
}

.comment-form-card {
  margin-bottom: 20px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment-item-card {
  width: 100%;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #606266;
}

.comment-content {
  color: #303133;
}
</style>