import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const cartItems = ref([])

  // Initialize from localStorage
  const initCart = () => {
    const savedCart = localStorage.getItem('cartItems')
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart)
    }
  }

  // Save to localStorage
  const saveCart = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.value.find(item => item.name === product.name)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({ ...product, quantity })
    }
    
    saveCart()
  }

  // Remove from cart
  const removeFromCart = (productName) => {
    cartItems.value = cartItems.value.filter(item => item.name !== productName)
    saveCart()
  }

  // Decrease quantity
  const decreaseQuantity = (productName) => {
    const item = cartItems.value.find(item => item.name === productName)
    
    if (item) {
      item.quantity -= 1
      if (item.quantity <= 0) {
        removeFromCart(productName)
      } else {
        saveCart()
      }
    }
  }

  // Increase quantity
  const increaseQuantity = (productName) => {
    const item = cartItems.value.find(item => item.name === productName)
    
    if (item) {
      item.quantity += 1
      saveCart()
    }
  }

  // Clear cart
  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  // Getters
  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  })

  return {
    items: cartItems,
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    initCart,
    totalPrice,
    totalItems
  }
})
