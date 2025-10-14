<template>
  <div class="container-fluid p-4" style="background-color: #faf8f2; min-height: 100vh;">
    <!-- Navbar -->
    <nav class="navbar bg-transparent mb-4">
      <div class="container">
        <router-link to="/welcome" class="navbar-brand d-flex align-items-center">
          <img src="/Images/Logo.webp" width="40" height="40" class="me-2" />
          <span style="font-size: 1.5rem; font-weight: bold; color: #000;">Tenth Life</span>
        </router-link>
      </div>
    </nav>

    <!-- Steps Indicator -->
    <div class="row mb-5 justify-content-center">
      <div v-for="(step, index) in ['Payment', 'Delivery', 'Review & Order']" :key="step" class="col-4 d-flex flex-column align-items-center position-relative">
        <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #000; color: #fff; display: flex; justify-content: center; align-items: center; font-weight: bold; z-index: 1;">
          {{ index + 1 }}
        </div>
        <div style="font-weight: bold; color: #333; margin-top: 5px;">{{ step }}</div>
        <div v-if="index < 2" style="position: absolute; top: 20px; right: -50%; width: 100%; height: 2px; background-color: #000; z-index: 0;"></div>
      </div>
    </div>

    <!-- Alerts -->
    <div v-if="confirmed" class="row justify-content-center mb-4">
      <div class="col-md-6">
        <div class="alert alert-success text-center fw-bold">✅ Payment Confirmed!</div>
      </div>
    </div>
    
    <div v-if="cartStore.items.length === 0" class="row justify-content-center mb-4">
      <div class="col-md-6">
        <div class="alert alert-danger text-center fw-bold">🚫 You can not proceed to payment. Please select at least one product.</div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="row justify-content-center align-items-start">
      <!-- Left Column - Payment -->
      <div class="col-lg-6 col-md-12 mb-4">
        <div class="card p-4 shadow-sm w-100" style="border-radius: 15px; min-height: 320px;">
          <h2 class="mb-4" style="font-weight: bold; color: #023047;">Check-Out</h2>
          <p style="font-weight: bold; color: #333;">Pay with:</p>
          
          <div class="row mb-3">
            <div class="col">
              <button class="btn btn-light w-100 border d-flex justify-content-center align-items-center gap-2" @click="handlePayment('QRPAY')" :disabled="cartStore.items.length === 0">
                <img src="/Images/QR PH.png" alt="QRPAY" style="height: 24px;" />
              </button>
            </div>
            <div class="col">
              <button class="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2" @click="handlePayment('GCASH')" :disabled="cartStore.items.length === 0">
                <img src="/Images/GCASH.png" alt="Gcash" style="height: 24px;" />
                <span>GCASH</span>
              </button>
            </div>
            <div class="col">
              <button class="btn btn-dark w-100 d-flex justify-content-center align-items-center gap-2" @click="handlePayment('GPAY')" :disabled="cartStore.items.length === 0">
                <img src="/Images/Gpay.png" alt="Gpay" style="height: 24px;" />
              </button>
            </div>
          </div>

          <div class="text-center mb-3"><strong style="color: #666;">OR</strong></div>

          <!-- Card Details Form -->
          <form>
            <div class="mb-3">
              <label class="form-label" style="color: #555;">Credit Card Number</label>
              <input 
                type="text" 
                class="form-control" 
                style="border-radius: 8px;" 
                v-model="cardNumber" 
                @input="handleCardNumberChange"
                maxlength="19" 
                placeholder="1111 2222 3333 4444"
              />
            </div>
            
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label class="form-label" style="color: #555;">EXP Date</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    style="border-radius: 8px;" 
                    v-model="expDate" 
                    @input="handleExpDateChange"
                    maxlength="5" 
                    placeholder="MM/YY"
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label class="form-label" style="color: #555;">CVV2</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    style="border-radius: 8px;" 
                    v-model="cvv" 
                    @input="handleCvvChange"
                    maxlength="3" 
                    placeholder="CVV"
                  />
                </div>
              </div>
            </div>

            <div style="padding-bottom: 80px; position: relative;">
              <button 
                type="button"
                class="btn btn-dark" 
                style="position: absolute; bottom: 20px; right: 20px; border-radius: 10px; font-weight: bold; font-size: 1.1rem; padding: 12px 20px;" 
                @click="handleConfirm" 
                :disabled="!isContinueEnabled || cartStore.items.length === 0"
              >
                Continue to Shipping
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Column - Cart Items -->
      <div class="col-lg-4 col-md-12">
        <div class="card p-4 shadow-sm w-100" style="border-radius: 15px; background-color: #fff;">
          <h3 class="mb-4" style="font-weight: bold; color: #023047;">ITEMS:</h3>
          
          <div v-if="cartStore.items.length === 0" class="text-muted">
            Your cart is empty.
          </div>
          
          <div v-else style="max-height: 400px; overflow-y: auto;">
            <div v-for="(item, index) in cartStore.items" :key="index" class="mb-3 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <img :src="item.image" :alt="item.name" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 10px;" />
                <div>
                  <strong>{{ item.name }}</strong>
                  <div>Qty: {{ item.quantity }}</div>
                  <div>${{ (item.price * item.quantity).toFixed(2) }}</div>
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-primary btn-sm" @click="cartStore.increaseQuantity(item.name)">+</button>
                <button class="btn btn-secondary btn-sm" @click="cartStore.decreaseQuantity(item.name)">-</button>
                <button class="btn btn-danger btn-sm" @click="cartStore.removeFromCart(item.name)">✕</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Discount Code -->
        <div class="input-group mt-4">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Gift cards or Store code" 
            style="border-radius: 8px; font-size: 1.1rem;" 
            v-model="discountCode"
          />
          <button class="btn btn-secondary" style="border-radius: 8px; font-size: 1.1rem;" @click="applyDiscount">
            APPLY
          </button>
        </div>

        <button v-if="voucherApplied" class="btn btn-danger mt-2 w-100" @click="cancelDiscount">
          Cancel Voucher
        </button>

        <!-- Order Summary -->
        <div class="mt-4 px-3" style="font-weight: bold; color: #000;">
          <div class="d-flex justify-content-between mb-2" style="font-size: 1.6rem;">
            <span>Subtotal:</span>
            <span>${{ totalPrice.toFixed(2) }}</span>
          </div>

          <div v-if="discountAmount > 0" class="d-flex justify-content-between mb-2" style="font-size: 1.6rem; color: red;">
            <span>Discount:</span>
            <span>-${{ discountAmount.toFixed(2) }}</span>
          </div>

          <div class="d-flex justify-content-between mb-2" style="font-size: 1.6rem;">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>

          <div style="border-top: 3px solid #000000; margin: 1rem 0; opacity: 1;"></div>

          <div class="d-flex justify-content-between mt-3" style="font-size: 1.8rem;">
            <span>TOTAL:</span>
            <span>${{ finalTotal }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Success Modal -->
    <div class="modal fade" id="paymentModal" tabindex="-1" ref="paymentModalRef">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">✅ Successfully Paid!</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Continue to Shipping</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Voucher Warning Modal -->
    <div class="modal fade" id="voucherModal" tabindex="-1" ref="voucherModalRef">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">⚠️ Only 1 voucher can be applied at a time</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Modal } from 'bootstrap'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const confirmed = ref(false)
const discountAmount = ref(0)
const paymentMethod = ref('')
const cardNumber = ref('')
const expDate = ref('')
const cvv = ref('')
const discountCode = ref('')
const voucherApplied = ref(false)

const paymentModalRef = ref(null)
const voucherModalRef = ref(null)
let paymentModalInstance = null
let voucherModalInstance = null

const totalPrice = computed(() => {
  return cartStore.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
})

const finalTotal = computed(() => {
  return (totalPrice.value - discountAmount.value).toFixed(2)
})

const isCardDetailsComplete = computed(() => {
  return cardNumber.value.length === 19 && expDate.value.length === 5 && cvv.value.length === 3
})

const isContinueEnabled = computed(() => {
  return paymentMethod.value || isCardDetailsComplete.value
})

const handleConfirm = () => {
  confirmed.value = true
}

const handlePayment = (method) => {
  paymentMethod.value = method
  if (!paymentModalInstance && paymentModalRef.value) {
    paymentModalInstance = new Modal(paymentModalRef.value)
  }
  paymentModalInstance?.show()
}

const handleCardNumberChange = (e) => {
  let rawValue = e.target.value.replace(/\D/g, '').slice(0, 16)
  cardNumber.value = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ')
}

const handleExpDateChange = (e) => {
  let value = e.target.value.replace(/[^0-9/]/g, '')
  if (value.length === 2 && !value.includes('/')) {
    value = value + '/'
  }
  if (value.length > 5) {
    value = value.slice(0, 5)
  }
  expDate.value = value
}

const handleCvvChange = (e) => {
  cvv.value = e.target.value.replace(/\D/g, '').slice(0, 3)
}

const applyDiscount = () => {
  const code = discountCode.value.trim().toUpperCase()
  
  if (voucherApplied.value) {
    if (!voucherModalInstance && voucherModalRef.value) {
      voucherModalInstance = new Modal(voucherModalRef.value)
    }
    voucherModalInstance?.show()
    return
  }
  
  if (code === "TENTHLIFE10") {
    discountAmount.value = totalPrice.value * 0.10
    voucherApplied.value = true
  } else if (code === "PAWPATROL30") {
    discountAmount.value = totalPrice.value * 0.30
    voucherApplied.value = true
  } else {
    discountAmount.value = 0
    voucherApplied.value = false
  }
}

const cancelDiscount = () => {
  discountAmount.value = 0
  voucherApplied.value = false
  discountCode.value = ''
}
</script>
