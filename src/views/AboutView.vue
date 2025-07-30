<template>
  <div class="about">
    <Navbar />
    <main>
      <h1>关于我们</h1>
      <p>Gay2 论坛：</p>
      <!-- <ul>
        <li>Vue 3 最新特性</li>
        <li>Composition API</li>
        <li>Pinia 状态管理</li>
        <li>Vue Router 路由管理</li>
        <li>Axios 网络请求</li>
        <li>ESLint 代码规范</li>
      </ul> -->
      <p>全局计数: {{ counterStore.count }}</p>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
  max-width: 600px;
  margin: 2rem auto;
  text-align: left;
}

li {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
