<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p class="mt-2 text-gray-600">View and manage your account information</p>
        </div>

        <!-- Profile Picture -->
        <div class="flex justify-center mb-8">
          <div class="relative">
            <div v-if="currentUserProfile?.image" class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                :src="currentUserProfile.image" 
                alt="Profile" 
                class="w-full h-full object-cover"
              />
            </div>
            <div v-else class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {{ userInitial }}
            </div>
            <button 
              @click="editProfile"
              class="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p class="mt-2 text-gray-600">Loading profile...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-red-700">{{ error }}</p>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-green-700">{{ successMessage }}</p>
          </div>
        </div>

        <!-- User Info -->
        <div v-if="!loading && !error" class="space-y-6">
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
            
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Username</label>
                <div class="mt-1 text-lg font-semibold text-gray-900">
                  {{ currentUserProfile?.username || store.state.auth.user.username }}
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1 text-lg font-semibold text-gray-900">
                  {{ currentUserProfile?.email || store.state.auth.user.email }}
                </div>
              </div>

              <!-- Gender -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Gender</label>
                <div class="mt-1 text-lg font-semibold text-gray-900">
                  <span v-if="currentUserProfile?.gender" class="capitalize">
                    {{ formatGender(currentUserProfile.gender) }}
                  </span>
                  <span v-else class="text-gray-400 italic">
                    Not set
                  </span>
                </div>
              </div>

              <!-- Member Since -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Member Since</label>
                <div class="mt-1 text-lg font-semibold text-gray-900">
                  {{ formatDate(currentUserProfile?.date_joined || store.state.auth.user.date_joined) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-between pt-4">
            <button 
              @click="editProfile"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Edit Profile
            </button>
            
            <router-link 
              to="/user/dashboard"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div class="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Edit Profile</h3>
            <button 
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 focus:outline-none"
              :disabled="modalLoading"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="saveProfile" class="space-y-4" enctype="multipart/form-data">
            <!-- Profile Picture Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
              <div class="flex items-center space-x-4">
                <div v-if="previewImage" class="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                  <img :src="previewImage" alt="Preview" class="w-full h-full object-cover">
                </div>
                <div v-else-if="currentUserProfile?.image" class="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                  <img :src="currentUserProfile.image" alt="Current" class="w-full h-full object-cover">
                </div>
                <div v-else class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileSelect"
                    accept="image/*"
                    class="hidden"
                  />
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    :disabled="modalLoading"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {{ selectedFile ? 'Change Image' : 'Choose Image' }}
                  </button>
                  <p v-if="selectedFile" class="text-xs text-gray-500 mt-1 truncate">
                    {{ selectedFile.name }}
                  </p>
                </div>
              </div>
              <button
                v-if="selectedFile || currentUserProfile?.image"
                type="button"
                @click="removeImage"
                class="mt-2 text-sm text-red-600 hover:text-red-800 focus:outline-none"
                :disabled="modalLoading"
              >
                Remove Image
              </button>
            </div>

            <!-- Gender Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select 
                v-model="editForm.gender" 
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                :disabled="modalLoading"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            <!-- Modal Loading State -->
            <div v-if="modalLoading" class="text-center py-2">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p class="mt-1 text-sm text-gray-600">Saving changes...</p>
            </div>

            <!-- Modal Error State -->
            <div v-if="modalError" class="bg-red-50 border border-red-200 rounded-lg p-3">
              <p class="text-red-700 text-sm">{{ modalError }}</p>
            </div>

            <div class="flex justify-between pt-4">
              <button
                type="button"
                @click="closeModal"
                :disabled="modalLoading"
                class="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="modalLoading || !hasChanges"
                class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ modalLoading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const loading = ref(false);
const error = ref(null);
const successMessage = ref(null);
const showEditModal = ref(false);
const modalLoading = ref(false);
const modalError = ref(null);
const selectedFile = ref(null);
const previewImage = ref(null);
const fileInput = ref(null);
const originalGender = ref('');
const originalImage = ref('');

const editForm = reactive({
  gender: '',
});

// Get the first letter of username for avatar
const userInitial = computed(() => {
  return store.state.auth.user.username ? store.state.auth.user.username.charAt(0).toUpperCase() : '';
});

// Get current user profile data
const currentUserProfile = computed(() => {
  return store.state.user.currentUserProfile;
});

// Check if there are changes
const hasChanges = computed(() => {
  return editForm.gender !== originalGender.value || selectedFile.value !== null || (editForm.gender === '' && originalGender.value === null);
});

const formatGender = (gender) => {
  const genderMap = {
    'M': 'Male',
    'F': 'Female',
    'O': 'Other'
  };
  return genderMap[gender] || gender;
};

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      modalError.value = 'File size must be less than 5MB';
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      modalError.value = 'Please select an image file';
      return;
    }
    
    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file);
    modalError.value = null;
  }
};

const removeImage = () => {
  selectedFile.value = null;
  previewImage.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const editProfile = () => {
  // Populate form with current data
  if (currentUserProfile.value) {
    editForm.gender = currentUserProfile.value.gender || '';
    originalGender.value = currentUserProfile.value.gender || '';
    originalImage.value = currentUserProfile.value.image || '';
  }
  
  // Reset file selection
  selectedFile.value = null;
  previewImage.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  
  showEditModal.value = true;
  modalError.value = null;
};

const closeModal = () => {
  showEditModal.value = false;
  modalError.value = null;
  selectedFile.value = null;
  previewImage.value = null;
};

const saveProfile = async () => {
  modalLoading.value = true;
  modalError.value = null;

  try {
    // Always use FormData for profile updates
    const formData = new FormData();
    
    // Add gender to FormData
    if (editForm.gender !== null && editForm.gender !== undefined) {
      formData.append('gender', editForm.gender);
    }
    
    // Handle image upload/removal
    if (selectedFile.value) {
      // New image selected
      formData.append('image', selectedFile.value);
    } else if (selectedFile.value === null && originalImage.value && !previewImage.value) {
      // Image removal requested - send empty file field
      formData.append('image', ''); // Empty string to remove image
    }
    // If no image field is appended, the existing image remains unchanged

    console.log('Sending FormData with entries:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Make the update request with FormData
    await store.dispatch('user/updateCurrentUserProfile', formData);

    successMessage.value = 'Profile updated successfully!';
    
    // Close modal and refresh data
    closeModal();
    
    // Refresh the profile data
    await store.dispatch('user/fetchCurrentUserProfile');
    
  } catch (err) {
    console.error('Error updating profile:', err);
    modalError.value = 'Failed to update profile. Please try again.';
    
    // Show specific error if available
    if (err.response?.data) {
      if (typeof err.response.data === 'object') {
        // Handle field-specific errors
        if (err.response.data.image) {
          modalError.value = `Image error: ${err.response.data.image.join(', ')}`;
        } else if (err.response.data.gender) {
          modalError.value = `Gender error: ${err.response.data.gender.join(', ')}`;
        } else {
          modalError.value = `Error: ${JSON.stringify(err.response.data)}`;
        }
      } else {
        modalError.value = `Error: ${err.response.data}`;
      }
    } else if (err.message) {
      modalError.value = err.message;
    }
  } finally {
    modalLoading.value = false;
  }
};

// Fetch current user data when component mounts
onMounted(async () => {
  loading.value = true;
  error.value = null;
  try {
    await store.dispatch('user/fetchCurrentUserProfile');
  } catch (err) {
    error.value = 'Failed to load profile data';
    console.error('Error loading profile:', err);
  } finally {
    loading.value = false;
  }
});
</script>