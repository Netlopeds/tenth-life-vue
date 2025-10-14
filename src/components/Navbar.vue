<template>
  <nav class="navbar navbar-expand-lg bg-transparent px-4 pt-3 position-relative">
    <div class="container-fluid">
      <router-link to="/welcome" class="navbar-brand d-flex align-items-center">
        <img src="/Images/Logo.webp" width="40" height="40" class="me-2" alt="Logo" />
        <span style="font-size: 1.5rem; font-weight: bold">Tenth Life</span>
      </router-link>

      <button 
        class="navbar-toggler" 
        type="button" 
        @click="toggleMenu"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="{ show: menuOpen }">
        <div class="position-absolute top-50 start-50 translate-middle">
          <ul class="navbar-nav">
            <li class="nav-item mx-3">
              <router-link to="/welcome" class="nav-link" active-class="active-link">Welcome</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link to="/shop" class="nav-link" active-class="active-link">Shop</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link to="/about" class="nav-link" active-class="active-link">About Us</router-link>
            </li>
          </ul>
        </div>

        <div class="ms-auto d-flex align-items-center gap-3">
          <!-- Check-Out Button -->
          <button 
            class="btn btn-outline-dark" 
            style="border-radius: 25px; padding: 8px 24px"
            @click="goToCheckout"
          >
            Check-Out
          </button>

          <!-- Cart Dropdown -->
          <div class="dropdown">
            <button 
              class="btn btn-light p-0 border-0 bg-transparent" 
              type="button" 
              @click="toggleCart"
            >
              <img src="/Images/shopcart.png" alt="Cart" width="30" height="30" />
              <span v-if="cartStore.totalItems > 0" class="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                {{ cartStore.totalItems }}
              </span>
            </button>
            
            <div 
              class="dropdown-menu dropdown-menu-end" 
              :class="{ show: cartOpen }" 
              style="min-width: 300px"
            >
              <h6 class="dropdown-header">Your Cart</h6>
              
              <div v-if="cartStore.cartItems.length === 0" class="dropdown-item-text text-muted">
                Cart is empty
              </div>

              <div v-else>
                <div style="max-height: 320px; overflow-y: auto">
                  <div 
                    v-for="(item, index) in cartStore.cartItems" 
                    :key="index" 
                    class="dropdown-item-text d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center">
                      <img 
                        :src="item.image" 
                        width="40" 
                        height="40" 
                        class="me-2" 
                        style="object-fit: cover; border-radius: 5px"
                        alt="Product"
                      />
                      <div>
                        <div style="font-weight: bold">{{ item.name }}</div>
                        <small>Qty: {{ item.quantity }} | ${{ (item.price * item.quantity).toFixed(2) }}</small>
                      </div>
                    </div>
                    <div class="d-flex gap-2">
                      <button class="btn btn-primary btn-sm" @click="cartStore.increaseQuantity(item.name)">+</button>
                      <button class="btn btn-secondary btn-sm" @click="cartStore.decreaseQuantity(item.name)">-</button>
                      <button class="btn btn-danger btn-sm" @click="cartStore.removeFromCart(item.name)">✕</button>
                    </div>
                  </div>
                </div>

                <div class="dropdown-divider"></div>
                <div class="dropdown-item-text fw-bold d-flex justify-content-between">
                  <span>Total:</span>
                  <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>
                <div class="dropdown-item text-center">
                  <button class="btn btn-dark btn-sm" @click="goToCheckout">
                    Go to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div class="dropdown">
            <button 
              class="btn btn-light p-0 border-0 bg-transparent" 
              type="button" 
              @click="toggleProfile"
            >
              <img src="/Images/profile.png" alt="Profile" width="30" height="30" />
            </button>
            
            <div class="dropdown-menu dropdown-menu-end" :class="{ show: profileOpen }">
              <h6 class="dropdown-header">{{ authStore.getUsername || 'Guest' }}</h6>
              <button class="dropdown-item" @click="handleLogout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const menuOpen = ref(false)
const cartOpen = ref(false)
const profileOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const toggleCart = () => {
  cartOpen.value = !cartOpen.value
  profileOpen.value = false
}

const toggleProfile = () => {
  profileOpen.value = !profileOpen.value
  cartOpen.value = false
}

const goToCheckout = () => {
  cartOpen.value = false
  router.push('/checkout')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.nav-link {
  position: relative;
  font-family: 'Garet Normal', sans-serif;
  font-weight: 500;
  color: #333;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: black;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active-link::after {
  transform: scaleX(1);
}
</style>
