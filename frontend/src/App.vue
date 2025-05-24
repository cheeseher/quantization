<template>
  <div class="app">
    <div class="page-content pb-16">
      <router-view />
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from './components/BottomNav.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  -webkit-tap-highlight-color: transparent;
}

.app {
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
}

.page-content {
  min-height: 100vh;
}
</style> 