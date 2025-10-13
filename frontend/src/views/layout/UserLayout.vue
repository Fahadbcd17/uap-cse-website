<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
    <!-- Navigation Bar -->
    <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-lg shadow-sm border-b border-purple-100">
      <div class="container mx-auto px-4 py-4">
        <!-- Top Bar -->
        <div class="flex justify-between items-center mb-4">
          <!-- Logo and Brand -->
          <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <img src="../../assets/logo.jpg" alt="">
          </div>
          <span class="text-xl font-bold text-gray-800">UAP</span>
        </div>
          
          <!-- Right Side Actions -->
          <div class="flex items-center space-x-3">
            <!-- Search Button -->
            <button @click="toggleSearch" class="p-2 text-gray-500 hover:text-purple-600 transition-all duration-300 hover:bg-purple-50 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>

            <!-- Notifications -->
            <button class="p-2 text-gray-500 hover:text-purple-600 transition-all duration-300 hover:bg-purple-50 rounded-lg relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <!-- User Menu -->
            <div class="relative group">
              <button @click="toggleUserMenu" class="flex items-center space-x-3 p-2 rounded-xl hover:bg-purple-50 transition-all duration-300 border border-transparent hover:border-purple-200">
                <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  0
                </div>
                <div class="hidden md:block text-left">
                  <p class="text-sm font-semibold text-gray-900"> {{ store.state.auth.user.username }} </p>
                  <p class="text-xs text-gray-500">CSE Member</p>
                </div>
                <svg class="w-4 h-4 text-gray-500 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div v-show="userMenu" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-purple-100 py-2 z-50 backdrop-blur-sm">
                <div class="px-4 py-3 border-b border-purple-50">
                  <p class="text-sm font-semibold text-gray-900">{{ store.state.auth.user.username }}</p>
                  <p class="text-xs text-purple-600">CSE Club Member</p>
                </div>
                
                <router-link to="/user/profile" class="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-purple-50 transition-all duration-200 group">
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <span class="font-medium">Profile</span>
                </router-link>
                
                
                
                <div class="border-t border-purple-100 my-2"></div>
                
                <button @click="logout" class="flex items-center space-x-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-all duration-200 w-full group">
                  <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                  </div>
                  <span class="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Navigation Menu -->
        <nav class="flex items-center space-x-8 border-t border-purple-50 pt-4">
          <router-link 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path" 
            class="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium group relative"
            :class="[
              currentRoute === item.path 
                ? 'text-purple-600 bg-purple-50 border border-purple-200' 
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            ]"
          >
            <div class="w-5 h-5 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
              </svg>
            </div>
            <span>{{ item.name }}</span>
            <div 
              v-if="currentRoute === item.path"
              class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"
            ></div>
          </router-link>
        </nav>
      </div>
      
      <!-- Search Bar -->
      <div v-if="searchOpen" class="container mx-auto px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-purple-100">
        <div class="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search events, projects, members..." 
            class="w-full px-4 py-3 pl-12 pr-4 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
          >
          <svg class="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <button @click="toggleSearch" class="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex flex-grow">
      <!-- Main Content Area -->
      <main class="flex-grow p-6">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 min-h-[calc(100vh-200px)]">
          <slot></slot>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-auto">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <h3 class="text-2xl font-black mb-4 bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">UNIVERSITY OF ASIA PACIFIC</h3>
            <p class="text-gray-300 leading-relaxed max-w-md">
              Excellence in education, innovation, and research in the heart of the Asia Pacific region. 
              Empowering future technology leaders through quality computer science education.
            </p>
          </div>
          <div>
            <h4 class="font-bold text-lg mb-4 text-white">Academics</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform block">Undergraduate Programs</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform block">Graduate Programs</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform block">Research Centers</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform block">Faculty Directory</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-lg mb-4 text-white">Contact Info</h4>
            <div class="space-y-3 text-gray-300">
              <p class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>74/A Green Road, Farmgate, Dhaka 1215</span>
              </p>
              <p class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>Fax: +88024101630</span>
              </p>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p class="text-lg">&copy; 2024 University of Asia Pacific. All rights reserved. | Empowering Future Innovators</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const route = useRoute()

// Reactive state
const sidebarOpen = ref(false)
const searchOpen = ref(false)
const userMenu = ref(false)



// Navigation items
const navItems = [
  {
    name: 'Dashboard',
    path: '/user/dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    name: 'Clubs',
    path: '/user/clubs',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    name: 'Calendar',
    path: '/user/calendar',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    name: 'Student Blogs',
    path: '/user/blogs',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
  },
  {
    name: 'Post',
    path: '/user/post',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }
]

// Current route
const currentRoute = computed(() => route.path)

// Methods
const toggleUserMenu = () => {
  userMenu.value = !userMenu.value
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  if (searchOpen.value) searchOpen.value = false
}

const toggleSearch = () => {
  searchOpen.value = !searchOpen.value
  if (sidebarOpen.value) sidebarOpen.value = false
}

const logout = () => {
  store.dispatch("auth/logout").then(() => {
    router.push({ name: "login" })
  })
}
</script>

<style scoped>
/* Smooth transitions */
.transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Ensure proper stacking context */
.z-30 { z-index: 30; }
.z-40 { z-index: 40; }
.z-50 { z-index: 50; }

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Active navigation indicator animation */
.router-link-active {
  position: relative;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #2563eb;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>