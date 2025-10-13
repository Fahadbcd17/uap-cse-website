<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
    <!-- Navigation Bar -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <img src="../../assets/logo.jpg" alt="">
          </div>
          <span class="text-xl font-bold text-gray-800">UAP</span>
        </div>
        
        <nav class="hidden md:flex items-center space-x-8">

          <router-link to="/" class="text-gray-600 hover:text-blue-600 transition">Home</router-link>
          <router-link to="/admission" class="text-gray-600 hover:text-blue-600 transition">Admissions</router-link>
          <router-link to="/about" class="text-gray-600 hover:text-blue-600 transition">About</router-link>
          <router-link to="/contact" class="text-gray-600 hover:text-blue-600 transition">Contact</router-link>
          <router-link to="/login" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Login
          </router-link>          
        </nav>
        
        <div class="flex items-center space-x-4">
          <button @click="toggleMobileMenu" class="md:hidden text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg">
        <div class="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <router-link to="/" class="text-gray-600 hover:text-blue-600 transition">Home</router-link>
          <router-link to="/admission" class="text-gray-600 hover:text-blue-600 transition">Admissions</router-link>
          <router-link to="/about" class="text-gray-600 hover:text-blue-600 transition">About</router-link>
          <router-link to="/contact" class="text-gray-600 hover:text-blue-600 transition">Contact</router-link>
          <router-link to="/login" class="text-gray-600 hover:text-blue-600 transition">Contact</router-link>
          
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>
    

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">UNIVERSITY OF ASIA PACIFIC</h3>
            <p class="text-gray-400">Excellence in education and innovation in the Asia Pacific region.</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Academics</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Undergraduate Programs</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Graduate Programs</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Research</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Faculty</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Admissions</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Apply Now</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Requirements</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Scholarships</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Campus Tour</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Contact</h4>
            <div class="space-y-2 text-gray-400">
              <p>74/A Green Road, Farmgate</p>
              <p>Dhaka 1215</p>
              <p>Fax: +88024101630</p>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2023 University of Asia Pacific. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>