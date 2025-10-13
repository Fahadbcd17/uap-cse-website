<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p class="mt-2 text-gray-600">View and manage your account information</p>
        </div>

        <!-- Profile Picture Placeholder -->
        <div class="flex justify-center mb-8">
          <router-link to="/user/dashboard" class="relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
            {{ userInitial }}
          </router-link>
        </div>

        <!-- User Info -->
        <div class="space-y-6">
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
            
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700">Username</label>
                <div class="mt-1 text-lg font-semibold text-gray-900">
                  {{ store.state.auth.user.username }}
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1 text-lg font-semibold text-gray-900">
                  {{ store.state.auth.user.email }}
                </div>
              </div>
            </div>
          </div>

          <!-- Additional sections can be added here -->
          <!-- <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
            ...
          </div> -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ProfilePage',
  setup() {
    const store = useStore();
    
    // Get the first letter of username for avatar
    const userInitial = computed(() => {
      return store.state.auth.user.username ? store.state.auth.user.username.charAt(0).toUpperCase() : '';
    });

    return {
      store,
      userInitial
    };
  }
};
</script>