<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">Gay2 论坛</router-link>
    </div>
    <ul class="nav-links">
      <li><router-link to="/">论坛</router-link></li>
      <li><router-link to="/create">发布帖子</router-link></li>
      <li><router-link to="/login">登录</router-link></li>
      <li><router-link to="/register">注册</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #35495e;
  color: white;
}

.logo a {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #42b983;
}

.nav-links a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
</style>
