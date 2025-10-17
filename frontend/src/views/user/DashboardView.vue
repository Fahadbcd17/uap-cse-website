<template>
  <div 
    class="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Loading State -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50"
    >
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600 font-medium">Loading your dashboard...</p>
      </div>
    </div>

    <!-- Welcome Section -->
    <div class="relative overflow-hidden">
      <!-- Background Overlay for better readability -->
      <div class="absolute inset-0 bg-black/20"></div>
      
      <!-- Background Elements -->
      <div class="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div class="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div class="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      
      <!-- Main Welcome Content -->
      <div class="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- Welcome Icon -->
          <div class="mb-8">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
          </div>

          <!-- Welcome Message -->
          <h1 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Welcome back,
            <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {{ store.state.auth.user.username || "Valued Member" }}!
            </span>
            <span class="ml-3">👋</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Great to see you again! Your CSE Club dashboard is ready and waiting for you.
          </p>

        </div>
      </div>
    </div>

    <!-- Motivational Quote -->
    <div class="relative">
      <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-lg text-white italic">
          "The computer was born to solve problems that did not exist before."
        </p>
        <p class="text-sm text-gray-300 mt-2">- Bill Gates</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import backgroundImage from '../../assets/cover-img.jpg';

const store = useStore();
const loading = ref(true);
const error = ref(null);
const accessToken = computed(() => store.getters['auth/accessToken']);

onMounted(async () => {
  try {
    // Simulate loading for better UX
    setTimeout(() => {
      loading.value = false;
    }, 1500);
    
  } catch (err) {
    error.value = err.message || "Failed to load welcome data";
    loading.value = false;
    console.error('Error:', err);
  }
});
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.3s ease;
}
</style>