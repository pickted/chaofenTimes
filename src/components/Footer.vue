<template>
  <footer class="footer">
    <p>&copy; {{ year }} Gay2 论坛. 保留所有权利.</p>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const year = ref(new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #35495e;
  color: white;
  padding: 1rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
}
</style>
