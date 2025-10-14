<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useCartStore } from './stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(() => {
  // Initialize stores from localStorage
  authStore.initAuth()
  cartStore.initCart()
})
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  background-color: #fffdf0;
}

body {
  margin: 0;
  padding: 0;
  background-color: #fffdf0;
}
</style>
