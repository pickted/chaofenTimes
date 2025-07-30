<template>
  <div class="forum-container">
    <div class="forum-header">
      <h1>程序员论坛</h1>
      <el-input
        v-model="searchQuery"
        placeholder="搜索帖子..."
        class="search-input"
        prefix-icon="Search"
      />
    </div>

    <div class="forum-content">
      <el-card class="post-list-card">
        <template #header>
          <div class="card-header">
            <h2>最新帖子</h2>
            <el-button type="primary" @click="goToCreatePost">发布新帖</el-button>
          </div>
        </template>

        <el-table :data="posts" stripe class="post-table">
          <el-table-column prop="title" label="标题" min-width="300">
            <template #default="scope">
              <router-link :to="`/post/${scope.row.id}`" class="post-title-link">{{ scope.row.title }}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="作者" width="120"></el-table-column>
          <el-table-column prop="date" label="发布时间" width="180"></el-table-column>
          <el-table-column prop="comments" label="评论数" width="100" align="center">
            <template #default="scope">
              <el-badge :value="scope.row.comments" class="comment-badge" />
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="totalPosts"
            layout="total, prev, pager, next"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '../stores/postStore';

const router = useRouter();
const postStore = usePostStore();

// 搜索查询
const searchQuery = ref('');
// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const totalPosts = ref(0);
// 帖子列表数据
const posts = ref([]);

// 跳转到发布帖子页面
const goToCreatePost = () => {
  router.push('/create');
};

// 模拟获取帖子数据
const fetchPosts = () => {
  // 在实际应用中，这里应该通过API获取数据
  posts.value = [
    {
      id: 1,
      title: 'Vue3组合式API与选项式API对比分析',
      author: '前端开发',
      date: '2023-11-10 14:30',
      comments: 24
    },
    {
      id: 2,
      title: 'TypeScript高级类型技巧分享',
      author: 'TS专家',
      date: '2023-11-09 09:15',
      comments: 18
    },
    {
      id: 3,
      title: 'React18新特性Suspense实战',
      author: 'React开发者',
      date: '2023-11-08 16:45',
      comments: 32
    },
    {
      id: 4,
      title: 'Node.js后端架构设计最佳实践',
      author: '全栈工程师',
      date: '2023-11-07 11:20',
      comments: 45
    },
    {
      id: 5,
      title: 'Docker容器化部署前端应用指南',
      author: 'DevOps工程师',
      date: '2023-11-06 15:10',
      comments: 29
    }
  ];
  totalPosts.value = posts.value.length;
};

// 初始化获取帖子数据
fetchPosts();
</script>

<style scoped>
.forum-container {
  padding: 20px;
}

.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-table {
  margin-top: 15px;
}

.post-title-link {
  color: #1890ff;
  text-decoration: none;
}

.post-title-link:hover {
  text-decoration: underline;
}

.comment-badge {
  background-color: #42b983;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>