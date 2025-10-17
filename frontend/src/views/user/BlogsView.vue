<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
      ></div>
    </div>

    <!-- Header Section -->
    <div class="bg-purple-700">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-white sm:text-4xl">
            All Posts
          </h1>
          <p class="mt-3 text-xl text-purple-200">
            Discover and manage all posts
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filter/Search Controls -->
        <div class="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="w-full sm:w-auto">
            <label for="sort-by" class="block text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sort-by"
              v-model="sortBy"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            >
              <option value="name">Alphabetical</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
          <div class="w-full sm:w-auto">
            <label for="search" class="block text-sm font-medium text-gray-700">Search:</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search posts..."
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Posts Grid -->
        <div v-if="filteredPosts.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="post in filteredPosts"
            :key="post.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <!-- Post Image -->
            <div class="h-48 bg-gray-200 overflow-hidden relative cursor-pointer">
              <img
                v-if="post.image"
                :src="formatImageUrl(post.image)"
                :alt="post.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                @error="handleImageError(post)"
                @click="openImagePreview(formatImageUrl(post.image))"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-purple-100 text-purple-500 cursor-default"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              
              <!-- Zoom icon overlay (optional) -->
              <div 
                v-if="post.image"
                class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300"
                @click="openImagePreview(formatImageUrl(post.image))"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>

            <!-- Post Details -->
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                {{ post.name }}
              </h3>
              
              <!-- Published by User -->
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Published by {{ store.state.auth.user.username || "Valued Member" }}</span>
              </div>
              
              <!-- Club Information -->
              <div v-if="getClubName(post)" class="flex items-center text-sm text-gray-500 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="truncate">{{ getClubName(post) }}</span>
              </div>
              
              <div v-else class="flex items-center text-sm text-gray-400 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>No Club</span>
              </div>

              <p class="text-gray-600 line-clamp-3 mb-4">
                {{ post.description || 'No description available' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="!loading"
          class="text-center py-12 bg-gray-50 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900">
            No posts found
          </h3>
          <p class="mt-1 text-gray-500">
            Try adjusting your search or create a new post
          </p>
          <div class="mt-6">
            <button
              @click="resetFilters"
              v-if="searchQuery"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-3"
            >
              Reset filters
            </button>
            <button
              @click="showAddModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Create New Post
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Post Button -->
    <div class="fixed bottom-8 right-8">
      <button
        @click="showAddModal = true"
        class="inline-flex items-center p-4 border border-transparent rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Add Post Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Create New Post</h3>
          <button
            @click="showAddModal = false"
            class="text-gray-400 hover:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form @submit.prevent="handleAddPost">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Post Name</label>
              <input
                id="name"
                v-model="newPost.name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                v-model="newPost.description"
                rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label for="club" class="block text-sm font-medium text-gray-700">Club (Optional)</label>
              <select
                id="club"
                v-model="newPost.club"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="">No Club</option>
                <option 
                  v-for="club in clubs" 
                  :key="club.id" 
                  :value="club.id"
                >
                  {{ club.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
              <input
                id="image"
                type="file"
                @change="handleImageUpload"
                class="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100"
              />
              <p class="mt-1 text-xs text-gray-500">Upload an image for this post</p>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="showAddModal = false"
              class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="creatingPost"
              class="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400"
            >
              {{ creatingPost ? 'Creating...' : 'Create Post' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Image Preview Modal - Transparent Background -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 flex items-center justify-center z-50"
      @click="selectedImage = null"
    >
      <!-- Transparent background with slight blur effect -->
      <div class="absolute inset-0 bg-transparent backdrop-blur-sm"></div>
      
      <div class="relative max-w-4xl max-h-full z-10">
        <!-- Close Button -->
        <button
          @click="selectedImage = null"
          class="absolute -top-12 right-0 text-gray-700 hover:text-gray-900 transition-colors duration-200 z-10 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        <!-- Image with subtle shadow -->
        <img
          :src="selectedImage"
          alt="Preview"
          class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          @click.stop
        />
        
        <!-- Download Button -->
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

// Reactive variables
const loading = ref(false);
const creatingPost = ref(false);
const sortBy = ref('name');
const searchQuery = ref('');
const showAddModal = ref(false);
const selectedImage = ref(null); // For image preview modal
const newPost = ref({
  name: '',
  description: '',
  club: '',
  image: null
});

// Backend configuration
const backendUrl = 'http://127.0.0.1:8000';

// Computed properties
const posts = computed(() => {
  return store.getters['post/posts'] || [];
});

const clubs = computed(() => {
  return store.getters['club/clubs'] || [];
});

// Helper function to get club name from post
const getClubName = (post) => {
  if (!post.club) return null;
  
  // If club is an object with name property
  if (typeof post.club === 'object' && post.club.name) {
    return post.club.name;
  }
  
  // If club is just an ID, find the club in clubs list
  if (typeof post.club === 'number' || (typeof post.club === 'string' && post.club)) {
    const club = clubs.value.find(c => c.id === parseInt(post.club));
    return club ? club.name : null;
  }
  
  // If using club_details from the updated serializer
  if (post.club_details && post.club_details.name) {
    return post.club_details.name;
  }
  
  return null;
};

// Image handling
const formatImageUrl = (imagePath) => {
  if (!imagePath) return null;
  return imagePath.startsWith('http') ? imagePath : `${backendUrl}${imagePath}`;
};

const handleImageError = (post) => {
  console.error('Image failed to load:', post.image);
  post.image = null;
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    newPost.value.image = file;
  }
};

// Image preview functionality
const openImagePreview = (imageUrl) => {
  selectedImage.value = imageUrl;
};

// Keyboard event handler for ESC key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && selectedImage.value) {
    selectedImage.value = null;
  }
};

// Data fetching
const fetchPosts = async () => {
  try {
    loading.value = true;
    await store.dispatch('post/fetchPosts');
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    loading.value = false;
  }
};

const fetchClubs = async () => {
  try {
    await store.dispatch('club/fetchClubs');
  } catch (error) {
    console.error('Error fetching clubs:', error);
  }
};

const filteredPosts = computed(() => {
  let result = [...posts.value];
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(post => 
      post.name.toLowerCase().includes(query) ||
      (post.description && post.description.toLowerCase().includes(query)) ||
      (getClubName(post) && getClubName(post).toLowerCase().includes(query))
    );
  }
  
  // Apply sorting
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === 'newest') {
    result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }
  
  return result;
});

// Component lifecycle
onMounted(async () => {
  await fetchPosts();
  await fetchClubs();
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

const handleAddPost = async () => {
  try {
    creatingPost.value = true;
    
    const formData = new FormData();
    formData.append('name', newPost.value.name);
    formData.append('description', newPost.value.description);
    
    if (newPost.value.club) {
      formData.append('club', newPost.value.club);
    }
    
    if (newPost.value.image) {
      formData.append('image', newPost.value.image);
    }

    await store.dispatch('post/createPost', formData);
    
    // Reset form and close modal
    showAddModal.value = false;
    newPost.value = {
      name: '',
      description: '',
      club: '',
      image: null
    };
    
    // Refresh the posts list
    await fetchPosts();
  } catch (error) {
    console.error('Error creating post:', error);
  } finally {
    creatingPost.value = false;
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  sortBy.value = 'name';
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>