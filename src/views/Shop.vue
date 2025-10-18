<template>
  <div class="shop-body">
    <Navbar />

    <div class="container-fluid shop-container px-3 px-md-4 py-4">
      <div id="shop_banner" class="text-center py-4 py-md-5 mt-2 mt-md-3 mb-4 mb-md-5">
        <h1 id="banner-text" class="fw-bold">Check Out Our Purr-fect Shop</h1>
        <div class="custom-search-bar mt-3 mt-md-4 mx-auto">
          <input
            type="text"
            class="search-text form-control"
            placeholder="Search"
            v-model="searchTerm"
          />
          <span class="search-icon">
            <img src="/Images/magnifying-glass.png" alt="Search" />
          </span>
        </div>
      </div>

      <div class="container shop-inner-container">
        <div class="row g-3 g-md-4">
          <div v-for="(product, idx) in filteredProducts" :key="idx" class="col-6 col-md-4 col-lg-3">
            <div class="product-item">
              <img
                :src="product.image"
                :alt="product.name"
                class="product-image"
              />
              <div class="product-info mt-2">
                <div class="product-name">{{ product.name }}</div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <span class="product-price">${{ product.price.toFixed(2) }}</span>
                  <button
                    class="btn btn-warning btn-sm add-button"
                    @click="openModal(product)"
                  >
                    <img src="/Images/shopping-bag.png" alt="Add" />
                    <span class="add-text">ADD</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="filteredProducts.length === 0" class="text-center mt-5">
          <h4>No products found.</h4>
        </div>
      </div>
    </div>

    <!-- Bootstrap Modal -->
    <div 
      class="modal fade" 
      id="quantityModal" 
      tabindex="-1" 
      ref="modalRef"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content product-modal">
          <div class="modal-header">
            <h5 class="modal-title">Select Quantity</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <div v-if="selectedProduct">
              <img
                :src="selectedProduct.image"
                :alt="selectedProduct.name"
                class="modal-product-image"
              />
              <h5 class="modal-product-name">{{ selectedProduct.name }}</h5>
              <div class="text-muted modal-product-price">Price per item: ${{ selectedProduct.price.toFixed(2) }}</div>
              
              <div class="d-flex justify-content-center align-items-center mt-3 quantity-selector">
                <button class="btn btn-secondary quantity-btn" @click="quantity = Math.max(1, quantity - 1)">−</button>
                <span class="mx-3 mx-md-4 fs-4 quantity-display">{{ quantity }}</span>
                <button class="btn btn-secondary quantity-btn" @click="quantity++">+</button>
              </div>
              
              <div class="mt-3 fw-bold modal-total">
                Total: ${{ (selectedProduct.price * quantity).toFixed(2) }}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary modal-btn" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-warning modal-btn" @click="addToCartAndClose">
              Add {{ quantity }} to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import Navbar from '../components/Navbar.vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const searchTerm = ref('')
const selectedProduct = ref(null)
const quantity = ref(1)
const modalRef = ref(null)
let modalInstance = null

// Import product images using relative paths from src-vue/views/
const catWand = new URL('../../public/Images/Products/cat_wand.webp', import.meta.url).href
const catFood = new URL('../../public/Images/Products/cat_food.webp', import.meta.url).href
const catMouse = new URL('../../public/Images/Products/cat_mouse.webp', import.meta.url).href
const catTreat = new URL('../../public/Images/Products/cat_treat.webp', import.meta.url).href
const wasteBag = new URL('../../public/Images/Products/waste-bag.webp', import.meta.url).href
const deodorizationBox = new URL('../../public/Images/Products/Deodorization Box.webp', import.meta.url).href
const garbageBag = new URL('../../public/Images/Products/garbage-bag.jpg', import.meta.url).href
const catTreats = new URL('../../public/Images/Products/cat-treats.png', import.meta.url).href
const catFountain = new URL('../../public/Images/Products/cat-fountain.png', import.meta.url).href
const catLitterCube = new URL('../../public/Images/Products/cat-litter-cube.webp', import.meta.url).href
const catDryingBox = new URL('../../public/Images/Products/cat-drying-box.png', import.meta.url).href
const floormat = new URL('../../public/Images/Products/NewPetreeGen2FloormatSquare2_1024x1024.png', import.meta.url).href

const products = [
  { name: "Cat Wand", price: 5.0, image: catWand },
  { name: "Cat Food (M)", price: 10.5, image: catFood },
  { name: "Cat Catnip Chew Toy", price: 15.0, image: catMouse },
  { name: "Cat Treat 5-pack", price: 3.0, image: catTreat },
  { name: "Waste Bag for Petree 2.0 Litter Box", price: 10.0, image: wasteBag },
  { name: "Petree Deodorization Box Smell Remover (Pack of 2)", price: 20.0, image: deodorizationBox },
  { name: "Pet Marvel Waste Bag", price: 5.0, image: garbageBag },
  { name: "Ciao Churu Cat Treats (14g x 20 pcs per pack)", price: 3.0, image: catTreats },
  { name: "Petkit Eversweet 3 Pro Wireless Cat Fountain", price: 80.0, image: catFountain },
  { name: "Pet Marvel Litter Cube", price: 155.0, image: catLitterCube },
  { name: "Redminut Pet Drying Box", price: 250.0, image: catDryingBox },
  { name: "Petree Big Floormat Gen 2", price: 5.5, image: floormat },
]

const filteredProducts = computed(() => {
  if (!searchTerm.value) return products
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value)
  }
})

const openModal = (product) => {
  selectedProduct.value = product
  quantity.value = 1
  modalInstance?.show()
}

const addToCartAndClose = () => {
  if (selectedProduct.value) {
    cartStore.addToCart(selectedProduct.value, quantity.value)
    modalInstance?.hide()
  }
}
</script>
