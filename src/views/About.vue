<template>
  <div class="about-body">
    <Navbar />
    
    <div class="about-header">
      <p class="subtitle">GET TO KNOW US!</p>
      <h2 class="title">About the Team <span class="underline"></span></h2>
    </div>

    <!-- Bootstrap Carousel -->
    <div id="teamCarousel" class="carousel slide about-carousel mt-4" data-bs-ride="false">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#teamCarousel" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#teamCarousel" data-bs-slide-to="1"></button>
      </div>

      <div class="carousel-inner">
        <!-- Slide 1 -->
        <div class="carousel-item active">
          <div class="cards-wrapper">
            <!-- Card 1 -->
            <div 
              class="testimonial-card-side"
              :class="{ 'blurred': hoveredCard !== null && hoveredCard !== 4 }"
              @mouseenter="hoveredCard = 4"
              @mouseleave="hoveredCard = null"
            >
              <div class="quote-icon">❝</div>
              <p class="testimonial-text">
                Cats are like humans to others. That's why we make sure to give a life worth meowing for.
              </p>
              <div class="profile">
                <img src="/Images/Members/KelvinPFP.jpg" class="profile-pic" alt="Kelvin" />
                <div class="profile-name">
                  <span class="last-name">GUILLERMO,</span>
                  <span class="first-name">Kelvin Yuan M.</span>
                </div>
              </div>
            </div>

            <!-- Card 2 - Middle -->
            <div 
              class="testimonial-card middle"
              :class="{ 'blurred': hoveredCard !== null && hoveredCard !== 5 }"
              @mouseenter="hoveredCard = 5"
              @mouseleave="hoveredCard = null"
            >
              <div class="quote-icon">❝</div>
              <p class="testimonial-text">
                Dedicated to seeing cat owners and their pets to create wonderful and memorable meow-ments together.
              </p>
              <div class="profile">
                <img src="/Images/Members/Perez.PNG" class="profile-pic" alt="Neil" />
                <div class="profile-name">
                  <span class="last-name">PEREZ,</span>
                  <span class="first-name">Neil Sam R.</span>
                </div>
              </div>
            </div>

            <!-- Card 3 -->
            <div 
              class="testimonial-card-side"
              :class="{ 'blurred': hoveredCard !== null && hoveredCard !== 6 }"
              @mouseenter="hoveredCard = 6"
              @mouseleave="hoveredCard = null"
            >
              <div class="quote-icon">❝</div>
              <p class="testimonial-text">
                I joined this project to ensure that cats receive the care, love, and attention they deserve.
              </p>
              <div class="profile">
                <img src="/Images/Members/Marco.jpg" class="profile-pic" alt="Marco" />
                <div class="profile-name">
                  <span class="last-name">ARANTE,</span>
                  <span class="first-name">Marco C.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="carousel-item">
          <div class="cards-wrapper">
            <!-- Card 4 -->
            <div 
              class="testimonial-card-side"
              :class="{ 'blurred': hoveredCard !== null && hoveredCard !== 1 }"
              @mouseenter="hoveredCard = 1"
              @mouseleave="hoveredCard = null"
            >
              <div class="quote-icon">❝</div>
              <p class="testimonial-text">
                I joined this project to ensure that cats receive the care, love, and attention they deserve.
              </p>
              <div class="profile">
                <img src="/Images/Members/Marco.jpg" class="profile-pic" alt="Marco" />
                <div class="profile-name">
                  <span class="last-name">ARANTE,</span>
                  <span class="first-name">Marco C.</span>
                </div>
              </div>
            </div>

            <!-- Card 5 - Middle -->
            <div 
              class="testimonial-card middle"
              :class="{ 'blurred': hoveredCard !== null && hoveredCard !== 2 }"
              @mouseenter="hoveredCard = 2"
              @mouseleave="hoveredCard = null"
            >
              <div class="quote-icon">❝</div>
              <p class="testimonial-text">
                Dedicated to make a difference, one purr at a time to provide cats and their owners love and warmth.
              </p>
              <div class="profile">
                <img src="/Images/Members/IMG_1809.JPG" class="profile-pic" alt="Audrey" />
                <div class="profile-name">
                  <span class="last-name">BUGAYONG,</span>
                  <span class="first-name">Mikhaella Audrey G.</span>
                </div>
              </div>
            </div>

            <!-- Card 6 -->
            <div 
              class="testimonial-card-side"
              :class="{ 'blurred': hoveredCard !== null && hoveredCard !== 3 }"
              @mouseenter="hoveredCard = 3"
              @mouseleave="hoveredCard = null"
            >
              <div class="quote-icon">❝</div>
              <p class="testimonial-text">
                Cats should be seen as family, and they should be treated as such by all cat owners.
              </p>
              <div class="profile">
                <img src="/Images/Members/GambePFP.jpg" class="profile-pic" alt="Gabriel" />
                <div class="profile-name">
                  <span class="last-name">GAMBE,</span>
                  <span class="first-name">Gabriel Paul Auren Z.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#teamCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#teamCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <img src="/Images/squigly about.png" alt="bot left squigly" class="bot-left-squig" />
    <img src="/Images/loop about.png" alt="bot right loop" class="bot-right-loop" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

const hoveredCard = ref(null)
</script>
