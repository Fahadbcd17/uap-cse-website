<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
    <main class="flex-grow">
      <!-- Hero Section -->
      <section class="py-20 px-4">
        <div class="container mx-auto text-center">
          <!-- Main University Title -->
          <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            UNIVERSITY OF ASIA PACIFIC
          </h1>
          
          <!-- Department Title -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              Department of Computer Science and Engineering
            </h2>
            <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <!-- Secondary University Title -->
          <div class="mt-16">
            <h3 class="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              
            </h3>
            <h4 class="text-2xl md:text-3xl font-bold text-indigo-700">
              UAP CSE Club
            </h4>
          </div>

          <!-- Additional Content -->
          <div class="mt-16 max-w-2xl mx-auto">
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">

          <router-link to="/signup" class="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Apply Now
          </router-link>
              <button class="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v9"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Quality Education</h3>
              <p class="text-gray-600">World-class academic programs in computer science and engineering</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Modern Facilities</h3>
              <p class="text-gray-600">State-of-the-art laboratories and research facilities</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Expert Faculty</h3>
              <p class="text-gray-600">Renowned professors and industry experts</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>

</script>
