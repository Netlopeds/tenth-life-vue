<template>
  <div class="welcome-page">
    <Navbar />

    <div id="welcome-body" class="container-fluid text-center mt-5">
      <!-- Cat Banner -->
      <div class="cat-banner">
        <div class="banner-content text-center">
          <h1 class="banner-title">MEOW-COME!</h1>
        </div>
      </div>

      <!-- Full Width Yellow Banner -->
      <div class="full-width-banner">
        <div class="row g-0 align-items-end ps-5" style="min-height: 300px;">
          <div class="col-md-6 col-sm-12 left-banner-content">
            <p class="banner-description">Give them a Paw-Some Time!</p>
            <button class="btn btn-dark shop-now-btn mt-3" @click="$router.push('/shop')">
              Shop Now 
              <span class="ms-2">
                <img id="shop-arrow" src="/Images/shop_now_arrow.png" alt="arrow" class="img-fluid rounded" />
              </span>
            </button>
            <p class="satisfied-text">Below are some Satisfied Meow-stomers!</p>
            <img src="/Images/Big Paw Print.png" alt="Paw Prints" class="big-paw-print"/>
          </div>
          <div class="col-md-6 col-sm-12 p-0">
            <img src="/Images/cat_cropped.png" alt="Cat Eating" class="cat-eating-img"/>
          </div>
        </div>
      </div>

      <!-- Card Row -->
      <div class="row card-row mt-5 justify-content-center">
        <!-- Card 1 -->
        <div class="col-md-3">
          <div class="card h-100 text-center border-0 position-relative">
            <div class="heart-icon-placeholder">
              <img src="/Images/heart.png" alt="Heart" width="20" height="20" />
            </div>
            <img class="card-img-top" src="/Images/cat playing toy.jpg" alt="Cat 1" />
            <div class="card-body">
              <p class="card-text">
                This playful kitty loves chewing on its favorite plush toy! Great for teething relief and endless fun.
              </p>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-md-3">
          <div class="card h-100 text-center border-0 position-relative">
            <div class="heart-icon-placeholder">
              <img src="/Images/heart.png" alt="Heart" width="20" height="20" />
            </div>
            <img class="card-img-top" src="/Images/cat playing toy 2.jpg" alt="Cat 2" />
            <div class="card-body">
              <p class="card-text">
                Energetic and full of life, this kitten can't get enough of its colorful feather wand. Ideal for interactive playtime!
              </p>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="col-md-3">
          <div class="card h-100 text-center border-0 position-relative">
            <div class="heart-icon-placeholder">
              <img src="/Images/heart.png" alt="Heart" width="20" height="20" />
            </div>
            <img class="card-img-top" src="/Images/cat playing toy 3.webp" alt="Cat 3" />
            <div class="card-body">
              <p class="card-text">
                Always on the lookout, this curious cat rules its climbing tower kingdom. Perfect for cats that love to perch and pounce.
              </p>
            </div>
          </div>
        </div>

        <!-- About Us Button -->
        <div class="col-md-1 text-center">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <button 
              id="about-btn" 
              class="btn btn-outline-dark" 
              style="border-radius: 50%; width: 80px; height: 80px; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;"
              @click="$router.push('/about')"
            >
              <img src="/Images/About_us_arrow.png" alt="arrow" class="img-fluid rounded" />
            </button>
            <div class="about-btn-text" style="margin-top: 8px; font-size: 1rem; font-weight: bold;">
              About Us
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.banner-section {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.banner-heading {
  font-family: 'TT Norms Bold', sans-serif;
  font-size: 3.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.brand-name {
  color: #ff6b6b;
  font-size: 4rem;
}

.banner-text {
  font-family: 'Garet Normal', sans-serif;
  font-size: 1.25rem;
  color: #555;
  line-height: 1.8;
}

.cat-image {
  max-width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.paw-prints {
  position: absolute;
  width: 60px;
  opacity: 0.3;
}

.paw-1 {
  top: 10%;
  left: 5%;
  transform: rotate(-15deg);
}

.paw-2 {
  top: 50%;
  right: 10%;
  transform: rotate(25deg);
}

.paw-3 {
  bottom: 15%;
  left: 15%;
  transform: rotate(-30deg);
}

.testimonials-section {
  background-color: #f9f9f9;
}

.section-title {
  font-family: 'TT Norms Bold', sans-serif;
  font-size: 2.5rem;
  color: #333;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.3s;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.testimonial-stars {
  color: #ffd700;
  font-size: 1.5rem;
}

.testimonial-text {
  font-family: 'Garet Normal', sans-serif;
  font-size: 1rem;
  color: #555;
  font-style: italic;
  margin-bottom: 1rem;
}

.testimonial-author {
  font-family: 'TT Norms Bold', sans-serif;
  color: #333;
  font-weight: bold;
}
</style>
