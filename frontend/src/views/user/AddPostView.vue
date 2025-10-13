<template>
  <div class="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Highlight Post Form -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <form @submit.prevent="submitHighlight" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Title <span class="text-red-700">(Required)</span>
              </label>
              <div class="mt-1">
                <input
                  v-model="name"
                  type="text"
                  id="name"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="Enter a title for your highlight"
                  required
                />
              </div>
            </div>

            <!-- Clubs Dropdown -->
            <div>
              <label for="club" class="block text-sm font-medium text-gray-700">
                Select Club <span class="text-gray-500">(Optional)</span>
              </label>
              <div class="mt-1">
                <select
                  v-model="selectedClub"
                  id="club"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                >
                  <option value="">No Club (General Post)</option>
                  <option 
                    v-for="club in clubs" 
                    :key="club.id" 
                    :value="club.id"
                  >
                    {{ club.name }}
                  </option>
                </select>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                Choose a club to associate with this post, or leave blank for a general post
              </p>
            </div>

            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
              >
                Description <span class="text-gray-500">(Optional)</span>
              </label>
              <div class="mt-1">
                <textarea
                  v-model="description"
                  id="description"
                  rows="3"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="Share details about your experience"
                ></textarea>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Image <span class="text-red-700">(Required)</span>
              </label>
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        class="sr-only"
                        @change="handleFileUpload"
                        accept="image/*"
                        required
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  <div v-if="imageFile" class="mt-2">
                    <p class="text-sm text-gray-900">{{ imageFile.name }}</p>
                    <button
                      type="button"
                      @click="removeFile"
                      class="mt-1 text-xs text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center">
              <input
                v-model="termsAgreed"
                id="terms"
                name="terms"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                required
              />
              <label for="terms" class="ml-2 block text-sm text-gray-900">
                I confirm that this is my original content
              </label>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isSubmitting || !termsAgreed || !name || !imageFile"
              >
                <span v-if="!isSubmitting">Submit Highlight</span>
                <span v-else>Processing...</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="fixed z-10 inset-0 overflow-y-auto">
        <!-- Background overlay -->
        <div class="fixed inset-0 " @click="redirect"></div>
        
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Modal panel -->
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  class="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Highlight Submitted!
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Thank you for sharing your experience. Your highlight has
                    been successfully posted.
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                @click="redirect"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const name = ref("");
const description = ref("");
const selectedClub = ref(""); // Store selected club ID
const imageFile = ref(null);
const termsAgreed = ref(false);
const isSubmitting = ref(false);
const showSuccessModal = ref(false);

const accessToken = computed(() => store.getters["auth/accessToken"]);
const clubs = computed(() => store.getters["club/clubs"]);
const clubsLoading = computed(() => store.getters["club/loading"]);

// Fetch clubs when component mounts
onMounted(async () => {
  try {
    await store.dispatch("club/fetchClubs");
  } catch (error) {
    console.error("Failed to load clubs:", error);
  }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }
    if (!file.type.match("image.*")) {
      alert("Only image files are allowed");
      return;
    }
    imageFile.value = file;
  }
};

const removeFile = () => {
  imageFile.value = null;
  const fileInput = document.getElementById("file-upload");
  if (fileInput) fileInput.value = "";
};

const submitHighlight = async () => {
  // Validation
  if (!name.value.trim()) {
    alert("Please enter a title");
    return;
  }

  if (!imageFile.value) {
    alert("Please upload an image");
    return;
  }

  if (!termsAgreed.value) {
    alert("Please confirm your post details");
    return;
  }

  if (!accessToken.value) {
    alert("Please log in to submit a highlight");
    router.push('/login');
    return;
  }

  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append("name", name.value.trim());
    
    // Add club if selected
    if (selectedClub.value) {
      formData.append("club", selectedClub.value);
    }
    
    if (description.value.trim()) {
      formData.append("description", description.value.trim());
    }
    formData.append("image", imageFile.value);

    const response = await fetch('http://127.0.0.1:8000/api/post/', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken.value}`
      }
    });

    if (!response.ok) {
      let errorMessage = 'Request failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
      } catch {
        errorMessage = await response.text() || `HTTP ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Reset form
    name.value = "";
    description.value = "";
    selectedClub.value = "";
    imageFile.value = null;
    termsAgreed.value = false;
    removeFile();
    
    // Show success
    showSuccessModal.value = true;
    
  } catch (err) {
    console.error('Error creating highlight:', err);
    
    if (err.message.includes('401') || err.message.includes('token')) {
      alert('Authentication failed. Please log in again.');
      router.push('/login');
    } else if (err.message.includes('413')) {
      alert('File too large. Please choose a smaller image.');
    } else if (err.message.includes('415')) {
      alert('Invalid file type. Please upload a valid image (PNG, JPG, JPEG).');
    } else {
      alert(err.message || 'An error occurred while creating your highlight. Please try again.');
    }
  } finally {
    isSubmitting.value = false;
  }
};

const redirect = () => {
  showSuccessModal.value = false;
  router.push({ name: "dashboard" });
};
</script>

<style>
/* Add any custom styles here */
</style>