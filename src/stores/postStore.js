import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [
      // 初始化一些示例帖子数据
      {
        id: 1,
        title: 'Vue3组合式API与选项式API对比分析',
        content: 'Vue3引入的组合式API带来了更灵活的代码组织方式...',
        author: '前端开发',
        date: '2023-11-10 14:30',
        comments: 24,
        tags: ['frontend', 'vue']
      },
      {
        id: 2,
        title: 'TypeScript高级类型技巧分享',
        content: '本文将介绍TypeScript中的交叉类型、联合类型等高级用法...',
        author: 'TS专家',
        date: '2023-11-09 09:15',
        comments: 18,
        tags: ['typescript', 'frontend']
      },
      {
        id: 3,
        title: 'React18新特性Suspense实战',
        content: 'React18的Suspense功能让数据加载变得更加优雅...',
        author: 'React开发者',
        date: '2023-11-08 16:45',
        comments: 32,
        tags: ['react', 'frontend']
      },
      {
        id: 4,
        title: 'Node.js后端架构设计最佳实践',
        content: '在大型Node.js应用中，合理的架构设计至关重要...',
        author: '全栈工程师',
        date: '2023-11-07 11:20',
        comments: 45,
        tags: ['nodejs', 'backend']
      },
      {
        id: 5,
        title: 'Docker容器化部署前端应用指南',
        content: '本文将详细介绍如何使用Docker容器化Vue/React应用...',
        author: 'DevOps工程师',
        date: '2023-11-06 15:10',
        comments: 29,
        tags: ['docker', 'devops']
      }
    ]
  }),
  getters: {
    // 获取所有帖子
    getAllPosts: (state) => state.posts,
    // 根据ID获取帖子
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === Number(id));
    },
    // 根据标签筛选帖子
    getPostsByTag: (state) => (tag) => {
      return state.posts.filter(post => post.tags.includes(tag));
    }
  },
  actions: {
    // 添加新帖子
    addPost(post) {
      this.posts.unshift({ ...post, id: Date.now() });
    },
    // 添加评论
    addComment(postId, comment) {
      const post = this.getPostById(postId);
      if (post) {
        if (!post.commentsList) {
          post.commentsList = [];
        }
        post.commentsList.push(comment);
        post.comments++;
      }
    }
  }
});