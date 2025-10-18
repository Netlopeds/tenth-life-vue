<template>
  <nav class="navbar navbar-expand-lg bg-transparent px-3 px-md-4 pt-3 position-relative">
    <div class="container-fluid">
      <router-link to="/welcome" class="navbar-brand d-flex align-items-center">
        <img src="/Images/Logo.webp" width="40" height="40" class="me-2" alt="Logo" />
        <span class="navbar-title">Tenth Life</span>
      </router-link>

      <!-- Mobile right side icons -->
      <div class="d-flex d-lg-none align-items-center gap-2 order-3">
        <!-- Cart Button (Mobile) -->
        <button 
          class="btn btn-light p-0 border-0 bg-transparent position-relative" 
          type="button" 
          @click="toggleCart"
        >
          <img src="/Images/shopcart.png" alt="Cart" width="28" height="28" />
          <span v-if="cartStore.totalItems > 0" class="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill" style="font-size: 0.65rem">
            {{ cartStore.totalItems }}
          </span>
        </button>

        <!-- Profile Button (Mobile) -->
        <button 
          class="btn btn-light p-0 border-0 bg-transparent" 
          type="button" 
          @click="toggleProfile"
        >
          <img src="/Images/profile.png" alt="Profile" width="28" height="28" />
        </button>

        <!-- Hamburger Menu -->
        <button 
          class="navbar-toggler ms-2" 
          type="button" 
          @click="toggleMenu"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" :class="{ show: menuOpen }" id="navbarNav">
        <!-- Desktop centered menu -->
        <div class="desktop-menu-wrapper">
          <ul class="navbar-nav">
            <li class="nav-item mx-3">
              <router-link to="/welcome" class="nav-link" active-class="active-link" @click="closeMenu">Welcome</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link to="/shop" class="nav-link" active-class="active-link" @click="closeMenu">Shop</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link to="/about" class="nav-link" active-class="active-link" @click="closeMenu">About Us</router-link>
            </li>
          </ul>
        </div>

        <!-- Desktop right side -->
        <div class="ms-auto d-none d-lg-flex align-items-center gap-3">
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
              class="btn btn-light p-0 border-0 bg-transparent position-relative" 
              type="button" 
              @click="toggleCart"
            >
              <img src="/Images/shopcart.png" alt="Cart" width="30" height="30" />
              <span v-if="cartStore.totalItems > 0" class="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                {{ cartStore.totalItems }}
              </span>
            </button>
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
          </div>
        </div>

        <!-- Mobile menu items -->
        <div class="d-lg-none mobile-menu-items">
          <button 
            class="btn btn-outline-dark w-100 mb-3" 
            style="border-radius: 25px; padding: 8px 24px"
            @click="goToCheckout"
          >
            Check-Out
          </button>
        </div>
      </div>
    </div>

    <!-- Single Cart Dropdown (Works for both mobile and desktop) -->
    <div 
      class="dropdown-menu dropdown-menu-end cart-dropdown" 
      :class="{ show: cartOpen, 'mobile-dropdown': true }"
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
            class="dropdown-item-text d-flex align-items-center justify-content-between flex-wrap cart-item"
          >
            <div class="d-flex align-items-center mb-2 cart-item-info">
              <img 
                :src="item.image" 
                width="40" 
                height="40" 
                class="me-2" 
                style="object-fit: cover; border-radius: 5px"
                alt="Product"
              />
              <div style="flex: 1">
                <div style="font-weight: bold; font-size: 0.9rem">{{ item.name }}</div>
                <small>Qty: {{ item.quantity }} | ${{ (item.price * item.quantity).toFixed(2) }}</small>
              </div>
            </div>
            <div class="d-flex gap-1 cart-item-buttons">
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
          <button class="btn btn-dark btn-sm w-100" @click="goToCheckout">
            Go to Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Single Profile Dropdown (Works for both mobile and desktop) -->
    <div 
      class="dropdown-menu dropdown-menu-end profile-dropdown" 
      :class="{ show: profileOpen, 'mobile-dropdown': true }"
    >
      <h6 class="dropdown-header">{{ authStore.getUsername || 'Guest' }}</h6>
      <button class="dropdown-item" @click="handleLogout">Logout</button>
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
  menuOpen.value = false
  router.push('/checkout')
}

const handleLogout = () => {
  authStore.logout()
  profileOpen.value = false
  menuOpen.value = false
  router.push('/')
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<style scoped>
.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-link {
  position: relative;
  font-family: 'Garet Normal', sans-serif;
  font-weight: 500;
  color: #333;
  font-size: 1rem;
  padding: 0.5rem 0;
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

/* Desktop centered menu */
.desktop-menu-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Cart and Profile dropdowns */
.cart-dropdown,
.profile-dropdown {
  position: fixed !important;
  z-index: 1060;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.cart-dropdown {
  min-width: 300px;
  max-width: 350px;
  right: 80px !important;
  top: 60px !important;
  left: auto !important;
}

.profile-dropdown {
  min-width: 180px;
  right: 20px !important;
  top: 60px !important;
  left: auto !important;
}

/* Cart item styling */
.cart-item {
  padding: 0.5rem 1rem;
}

.cart-item-info {
  width: 100%;
}

.cart-item-buttons {
  width: 100%;
  justify-content: flex-end;
}

.dropdown-menu {
  display: none;
}

.dropdown-menu.show {
  display: block;
}

/* Mobile styles */
@media (max-width: 991.98px) {
  .navbar-title {
    font-size: 1.2rem;
  }

  .desktop-menu-wrapper {
    position: static;
    transform: none;
    width: 100%;
  }

  .navbar-nav {
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
  }

  .nav-item {
    margin: 0.5rem 0 !important;
  }

  .nav-link {
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
  }

  .mobile-menu-items {
    padding: 1rem 0;
    border-top: 1px solid #dee2e6;
  }

  .navbar-collapse {
    margin-top: 1rem;
  }

  /* Mobile dropdowns */
  .cart-dropdown {
    min-width: calc(100vw - 20px);
    max-width: calc(100vw - 20px);
    right: 10px !important;
  }

  .profile-dropdown {
    right: 10px !important;
  }
}

@media (max-width: 575.98px) {
  .navbar {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .navbar-title {
    font-size: 1.1rem;
  }

  .cart-dropdown {
    min-width: calc(100vw - 20px);
    max-width: calc(100vw - 20px);
  }
}
</style>
