<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Clubs</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and join our vibrant community of clubs. Find your passion and connect with like-minded people.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p class="text-lg text-gray-600">Loading clubs...</p>
          <p class="text-sm text-gray-500 mt-2">Please wait while we fetch the latest clubs</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-2xl mx-auto">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-red-800 mb-2">Unable to load clubs</h3>
          <p class="text-red-700 mb-4">{{ error }}</p>
          <button 
            @click="fetchClubs"
            class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="clubs.length === 0" class="text-center py-20">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">No clubs available</h3>
          <p class="text-gray-600 mb-6">There are currently no clubs to display. Check back later for updates.</p>
        </div>
      </div>

      <!-- Clubs Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div 
          v-for="club in clubs" 
          :key="club.id" 
          class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group cursor-pointer"
          @click="viewClubDetails(club.id)"
        >
          <!-- Club Image -->
          <div class="relative h-48 bg-gray-200 overflow-hidden">
            <img 
              v-if="club.image" 
              :src="formatImageUrl(club.image)" 
              :alt="club.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          </div>

          <!-- Club Content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
              {{ club.name }}
            </h3>
            
            <p 
              v-if="club.description" 
              class="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4"
            >
              {{ club.description }}
            </p>
            
            <p v-else class="text-gray-400 text-sm italic mb-4">
              No description available
            </p>

            <!-- Action Button -->
            <button class="w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg font-medium hover:bg-indigo-100 transition-colors duration-200 group/btn">
              <span class="flex items-center justify-center">
                View Club
                <svg class="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Stats -->
      <div v-if="clubs.length > 0" class="mt-16 text-center">
        <div class="inline-flex items-center space-x-8 text-gray-600">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{{ clubs.length }} {{ clubs.length === 1 ? 'Club' : 'Clubs' }}</span>
          </div>
          <div class="text-gray-300">•</div>
          <div class="text-sm">Discover your community</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// Get state from store
const clubs = computed(() => store.getters['club/clubs'])
const loading = computed(() => store.getters['club/loading'])
const error = computed(() => store.getters['club/error'])

// Fetch clubs when component mounts
const fetchClubs = () => {
  store.dispatch('club/fetchClubs')
}

onMounted(() => {
  fetchClubs()
})

// Navigate to club details
const viewClubDetails = (clubId) => {
  router.push(`/clubs/${clubId}`)
}

// Use the same formatImageUrl function that works
const formatImageUrl = (imagePath) => {
  if (!imagePath) return null;
  const backendUrl = 'http://127.0.0.1:8000';
  return imagePath.startsWith('http') ? imagePath : `${backendUrl}${imagePath}`;
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>