<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面未找到</p>
    <router-link to="/" class="link">返回首页</router-link>
  </div>
</template>

<style scoped>
.not-found {
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 6rem;
  margin: 2rem 0;
  color: #e74c3c;
}

p {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.link {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.link:hover {
  background-color: #359e75;
}
</style>
