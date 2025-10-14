<template>
  <div class="login-container">
    <!-- Navbar -->
    <nav class="navbar bg-transparent ps-4 pt-3">
      <div class="navbar-brand d-flex align-items-center">
        <img src="/Images/Logo.webp" width="40" height="40" class="me-2" alt="Logo" />
        <span style="font-size: 1.5rem; font-weight: bold">Tenth Life</span>
      </div>
    </nav>

    <!-- Main Content - Two Columns -->
    <div class="container-fluid" style="position: relative; z-index: 2;">
      <div class="row flex-grow-1 align-items-center justify-content-center px-4" style="min-height: 80vh; padding: 0 5rem; margin-top: -1rem; margin-bottom: 7.5rem">
        <!-- Login Card Column -->
        <div class="col-12 col-md-6 d-flex justify-content-center mt-4 mt-md-0" style="margin-top: -6rem">
          <div class="login-card" style="width: 100%; max-width: 550px; position: relative; z-index: 2">
            <div style="position: absolute; top: -5rem; left: 13rem; z-index: 1">
              <img src="/Images/Design2.png" width="160" alt="Design" />
            </div>
            <div class="card-body p-4">
              <h2 class="login-title" style="font-size: 2.5rem; font-weight: bold">Login</h2>
              
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label fw-semibold">Email:</label>
                <input 
                  type="text" 
                  v-model="username" 
                  class="form-control login-input" 
                  required
                />
              </div>                <div class="mb-3">
                  <label class="form-label fw-semibold">Password:</label>
                  <input 
                    type="password" 
                    v-model="password" 
                    class="form-control login-input" 
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary login-button w-100"
                  :disabled="isLoading"
                >
                  {{ isLoading ? 'Logging in...' : 'Login' }}
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Welcome Section Column -->
        <div class="col-12 col-md-6 mt-5 mt-md-0" style="z-index: 1; margin-top: -5rem">
          <div style="width: 40rem; background-color: transparent; border: none; position: relative">
            <h1 class="welcome-title" style="font-size: 3.5rem; font-weight: bold; color: #003344; margin-bottom: 1rem">
              Meow-come! 
              <img src="/Images/PawPrints.png" width="80" height="80" class="ms-3" alt="Paws" />
            </h1>
            <p class="welcome-text" style="font-size: 1.4rem; color: #444; line-height: 1.8">
              Welcome to our webstore! Here you can find the best cat treats that will
              surely give them the tenth life flavors. Make sure to grab some from our
              new best seller treats!
            </p>

            <div class="row mt-4">
              <div class="col-12 col-md-6 d-flex align-items-start mb-3 mb-md-0">
                <img src="/Images/Phone.png" width="30" height="30" class="me-2" alt="Phone" />
                <div>
                  <h5 style="font-weight: bold">Phone</h5>
                  <p style="margin: 0">0999999999</p>
                </div>
              </div>
              <div class="col-12 col-md-6 d-flex align-items-start">
                <img src="/Images/Email.png" width="30" height="30" class="me-2" alt="Email" />
                <div>
                  <h5 style="font-weight: bold">Email</h5>
                  <p style="margin: 0">tenthlifefoods@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cat Image and Decorations -->
    <div style="display: flex; justify-content: center; position: relative; margin-top: -25vh; z-index: 2; left: 50%; transform: translateX(-50%)">
      <img src="/Images/CatsOrange.png" style="max-width: 1000px; height: auto" alt="Cats" />
    </div>
    <div style="position: absolute; top: 20vh; right: 23vh">
      <img src="/Images/Design1.png" class="design1-image" width="100" height="100" alt="Design" />
    </div>
    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 160px; background-color: #d27749; z-index: 1"></div>

    <!-- Error Modal -->
    <div 
      class="modal fade" 
      :class="{ show: showModal, 'd-block': showModal }" 
      tabindex="-1" 
      style="background-color: rgba(0,0,0,0.5)"
      v-if="showModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login Problem!</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">{{ errorMessage }}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showModal = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  const result = await authStore.login(username.value, password.value)
  isLoading.value = false

  if (result.success) {
    setTimeout(() => {
      router.push('/welcome')
    }, 700)
  } else {
    errorMessage.value = result.error || 'Invalid credentials'
    showModal.value = true
  }
}
</script>

<style scoped>
.login-container {
  background-color: #fffdf0;
  min-height: 100vh;
  position: relative;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  padding: 2rem;
}

.login-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #003344;
  margin-bottom: 1.5rem;
  font-family: 'Genty Sans', sans-serif;
}

.login-input {
  background-color: #f2f4f5 !important;
  border-radius: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.login-input:focus {
  background-color: #f2f4f5 !important;
}

.login-button {
  background-color: #003344;
  border: none;
  border-radius: 30px;
  padding: 0.5rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
}

.login-button:hover {
  background-color: #002233;
}

.form-label {
  font-weight: 600;
  font-size: 1rem;
  color: #444;
}

.form-label {
  font-weight: 600;
  font-size: 1rem;
  color: #444;
}

.welcome-title {
  font-family: 'Genty Sans', sans-serif;
}

.welcome-text {
  font-family: 'Montserrat Arabic', sans-serif;
}

@media (max-width: 768px) {
  .login-card {
    max-width: 90vw;
  }
  
  .design1-decoration,
  .design2-decoration {
    display: none;
  }
}
</style>
