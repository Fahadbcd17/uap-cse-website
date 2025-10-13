<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p class="text-lg text-gray-600">Loading club details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto py-8 px-4">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-red-800 mb-2">Unable to load club details</h3>
        <p class="text-red-700 mb-4">{{ error }}</p>
        <button 
          @click="fetchClubData"
          class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 mr-3"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Club Details -->
    <div v-else-if="club" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Club Header -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div class="md:flex">
          <!-- Club Image -->
          <div class="md:w-1/3">
            <div class="h-64 md:h-full bg-gray-200">
              <img 
                v-if="club.image" 
                :src="formatImageUrl(club.image)" 
                :alt="club.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Club Info -->
          <div class="md:w-2/3 p-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ club.name }}</h1>
            <p v-if="club.description" class="text-gray-600 text-lg leading-relaxed mb-6">
              {{ club.description }}
            </p>
            <p v-else class="text-gray-400 italic mb-6">
              No description available
            </p>
            
            <!-- Club Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-indigo-600">{{ allMembers.length }}</div>
                <div class="text-sm text-gray-500">Total Members</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ clubExecutives.length }}</div>
                <div class="text-sm text-gray-500">Executives</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-600">{{ clubEvents.length }}</div>
                <div class="text-sm text-gray-500">Events</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ leadershipTeam.length }}</div>
                <div class="text-sm text-gray-500">Leadership</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- All Members Section -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">All Club Members</h2>
          <div class="text-sm text-gray-500">
            {{ allMembers.length }} {{ allMembers.length === 1 ? 'Member' : 'Members' }}
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search members by name or role..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
          </div>
          <select
            v-model="roleFilter"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="president">President</option>
            <option value="vice-president">Vice President</option>
            <option value="general-secretary">General Secretary</option>
            <option value="treasurer">Treasurer</option>
            <option value="executive">Executive</option>
          </select>
        </div>

        <!-- Members Grid -->
        <div v-if="filteredMembers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
            v-for="member in filteredMembers"
            :key="member.id"
            :class="[
              'p-4 rounded-lg border transition-all duration-200 hover:shadow-md',
              getRoleColor(member.role).border,
              getRoleColor(member.role).bg
            ]"
          >
            <div class="flex items-center space-x-3">
              <!-- Member Avatar with Image -->
              <div class="relative">
                <img 
                  v-if="member.image"
                  :src="formatImageUrl(member.image)" 
                  :alt="member.name"
                  class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  @error="(event) => handleMemberImageError(member, event)"
                />
                <div 
                  v-else
                  :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm',
                    getRoleColor(member.role).avatar
                  ]"
                >
                  {{ getInitials(member.name) }}
                </div>
              </div>
              
              <!-- Member Info -->
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 truncate">{{ member.name }}</h3>
                <p 
                  :class="[
                    'text-sm font-medium truncate',
                    getRoleColor(member.role).text
                  ]"
                >
                  {{ member.title }}
                </p>
                <p class="text-xs text-gray-500 truncate">{{ member.mail }}</p>
              </div>
            </div>

            <!-- Role Badge -->
            <div class="mt-3">
              <span 
                :class="[
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  getRoleColor(member.role).badge
                ]"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ formatRole(member.role) }}
              </span>
            </div>
          </div>
        </div>

        <!-- No Members Found -->
        <div v-else class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No Members Found</h3>
          <p class="text-gray-600">Try adjusting your search criteria</p>
        </div>
      </div>

      <!-- Leadership Team Section -->
      <div v-if="leadershipTeam.length > 0" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="leader in leadershipTeam"
            :key="leader.id"
            class="text-center p-6 rounded-xl border-2 border-gray-100 hover:border-indigo-200 transition-all duration-200"
          >
            <!-- Leadership Avatar with Image -->
            <div class="relative">
              <img 
                v-if="leader.image"
                :src="formatImageUrl(leader.image)" 
                :alt="leader.name"
                class="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md mx-auto mb-4"
                @error="(event) => handleMemberImageError(leader, event)"
              />
              <div 
                v-else
                :class="[
                  'w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4',
                  getRoleColor(leader.role).avatar
                ]"
              >
                {{ getInitials(leader.name) }}
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ leader.name }}</h3>
            <p 
              :class="[
                'text-lg font-medium mb-3',
                getRoleColor(leader.role).text
              ]"
            >
              {{ leader.title }}
            </p>
            <p class="text-sm text-gray-600 mb-4">{{ leader.mail }}</p>
            <span 
              :class="[
                'inline-block px-3 py-1 rounded-full text-sm font-medium',
                getRoleColor(leader.role).badge
              ]"
            >
              {{ formatRole(leader.role) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Events Section -->
      <div v-if="clubEvents.length > 0" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Club Events</h2>
        <div class="space-y-4">
          <div 
            v-for="event in clubEvents" 
            :key="event.id" 
            class="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
          >
            <!-- Event Image -->
            <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                v-if="event.image" 
                :src="formatImageUrl(event.image)" 
                :alt="event.title"
                class="w-full h-full object-cover"
                @error="handleEventImageError(event)"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white font-semibold text-xs">
                <span>{{ formatDate(event.date, 'MMM') }}</span>
                <span class="text-lg">{{ formatDate(event.date, 'DD') }}</span>
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 mb-1">{{ event.title }}</h3>
              <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ event.description }}</p>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="truncate">{{ event.location || 'TBA' }}</span>
              </div>
            </div>
            <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-semibold flex-shrink-0">
              Register
            </button>
          </div>
        </div>
      </div>

      <!-- No Events Message -->
      <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No Club Events</h3>
        <p class="text-gray-600">This club doesn't have any events scheduled.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const clubId = ref(parseInt(route.params.id))

// Search and filter
const searchQuery = ref('')
const roleFilter = ref('all')

// Get state from store with safe fallbacks
const clubs = computed(() => store.getters['club/clubs'] || [])
const presidents = computed(() => store.getters['president/presidents'] || [])
const vicePresidents = computed(() => store.getters['vicePresident/vicePresidents'] || [])
const generalSecretaries = computed(() => store.getters['generalSecretary/generalSecretaries'] || [])
const treasurers = computed(() => store.getters['treasurer/treasurers'] || [])
const executives = computed(() => store.getters['executive/executives'] || [])
const events = computed(() => store.getters['event/events'] || [])

// Safe convener getter - handles case where module doesn't exist
const conveners = computed(() => {
  try {
    return store.getters['convener/conveners'] || []
  } catch (error) {
    console.log('Convener module not available:', error)
    return []
  }
})

// Find current club
const club = computed(() => clubs.value.find(c => c.id === clubId.value))

// Filter club-specific events
const clubEvents = computed(() => {
  return events.value.filter(event => {
    if (event.club) {
      if (typeof event.club === 'object') {
        return event.club.id === clubId.value
      }
      return event.club === clubId.value
    }
    return false
  })
})

// Filter club-specific executives
const clubExecutives = computed(() => {
  return executives.value.filter(executive => {
    if (executive.club) {
      if (typeof executive.club === 'object') {
        return executive.club.id === clubId.value
      }
      return executive.club === clubId.value
    }
    return false
  })
})

// Combine all members for THIS CLUB only
const allMembers = computed(() => {
  const members = []

  // Helper function to filter by club
  const filterByClub = (items) => {
    return items.filter(item => {
      if (item && item.club) {
        if (typeof item.club === 'object') {
          return item.club.id === clubId.value
        }
        return item.club === clubId.value
      }
      return false
    })
  }

  // Add conveners for this club (only if available)
  if (conveners.value && conveners.value.length > 0) {
    filterByClub(conveners.value).forEach(c => 
      members.push({ ...c, role: 'convener' })
    )
  }

  // Add presidents for this club
  filterByClub(presidents.value).forEach(p => 
    members.push({ ...p, role: 'president' })
  )

  // Add vice presidents for this club
  filterByClub(vicePresidents.value).forEach(vp => 
    members.push({ ...vp, role: 'vice-president' })
  )

  // Add general secretaries for this club
  filterByClub(generalSecretaries.value).forEach(gs => 
    members.push({ ...gs, role: 'general-secretary' })
  )

  // Add treasurers for this club
  filterByClub(treasurers.value).forEach(t => 
    members.push({ ...t, role: 'treasurer' })
  )

  // Add executives for this club
  filterByClub(executives.value).forEach(e => 
    members.push({ ...e, role: 'executive' })
  )

  return members
})

// Leadership team (non-executives)
const leadershipTeam = computed(() => 
  allMembers.value.filter(member => member.role !== 'executive')
)

// Filtered members based on search and role filter
const filteredMembers = computed(() => {
  let filtered = allMembers.value

  // Apply role filter
  if (roleFilter.value !== 'all') {
    filtered = filtered.filter(member => member.role === roleFilter.value)
  }

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(member => 
      member.name.toLowerCase().includes(query) ||
      (member.title && member.title.toLowerCase().includes(query)) ||
      member.role.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Safe loading state
const loading = computed(() => {
  const loadingStates = [
    store.getters['club/loading'],
    store.getters['president/loading'], 
    store.getters['vicePresident/loading'],
    store.getters['generalSecretary/loading'],
    store.getters['treasurer/loading'],
    store.getters['executive/loading'],
    store.getters['event/loading']
  ]
  
  // Try to get convener loading state safely
  try {
    loadingStates.push(store.getters['convener/loading'])
  } catch (error) {
    // Convener module not available, skip it
  }
  
  return loadingStates.some(state => state === true)
})

// Safe error state
const error = computed(() => {
  const errors = [
    store.getters['club/error'],
    store.getters['president/error'], 
    store.getters['vicePresident/error'],
    store.getters['generalSecretary/error'],
    store.getters['treasurer/error'],
    store.getters['executive/error'],
    store.getters['event/error']
  ]
  
  // Try to get convener error state safely
  try {
    errors.push(store.getters['convener/error'])
  } catch (error) {
    // Convener module not available, skip it
  }
  
  return errors.find(error => error) || null
})

// Fetch all data when component mounts
const fetchClubData = async () => {
  try {
    await store.dispatch('club/fetchClubs')
    await store.dispatch('president/fetchPresidents')
    await store.dispatch('vicePresident/fetchVicePresidents')
    await store.dispatch('generalSecretary/fetchGeneralSecretaries')
    await store.dispatch('treasurer/fetchTreasurers')
    await store.dispatch('executive/fetchExecutives')
    await store.dispatch('event/fetchEvents')
    
    // Try to fetch conveners if the module exists
    try {
      await store.dispatch('convener/fetchConveners')
    } catch (error) {
      console.log('Convener fetch failed, continuing without conveners:', error)
    }
  } catch (error) {
    console.error('Error fetching club data:', error)
  }
}

onMounted(() => {
  fetchClubData()
})

// Utility functions
const formatImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  const backendUrl = 'http://127.0.0.1:8000';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it starts with /media/, prepend backend URL
  if (imagePath.startsWith('/media/')) {
    return `${backendUrl}${imagePath}`;
  }
  
  // If it starts with media/, prepend backend URL with slash
  if (imagePath.startsWith('media/')) {
    return `${backendUrl}/${imagePath}`;
  }
  
  // If it's just a filename, assume it's in media root
  if (imagePath.includes('/')) {
    return `${backendUrl}/media/${imagePath}`;
  }
  
  // For simple filenames, try different common paths
  return `${backendUrl}/media/profile-pic/${imagePath}`;
}

const handleImageError = (event) => {
  console.log('Image failed to load:', event.target.src);
  event.target.style.display = 'none';
  const nextSibling = event.target.nextElementSibling;
  if (nextSibling && nextSibling.style) {
    nextSibling.style.display = 'flex';
  }
}

const handleMemberImageError = (member, event) => {
  console.log('Member image failed to load:', member.name, member.image);
  if (event && event.target) {
    event.target.style.display = 'none';
    // Create fallback avatar if it doesn't exist
    const parent = event.target.parentElement;
    if (parent) {
      const fallback = document.createElement('div');
      fallback.className = `w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getRoleColor(member.role).avatar}`;
      fallback.textContent = getInitials(member.name);
      parent.appendChild(fallback);
    }
  }
}

const handleEventImageError = (event) => {
  console.log('Event image failed to load:', event.image);
}

const getInitials = (name) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatDate = (dateString, format = 'MMM DD') => {
  if (!dateString) return 'TBD';
  const date = new Date(dateString)
  if (format === 'MMM') return date.toLocaleDateString('en-US', { month: 'short' })
  if (format === 'DD') return date.getDate().toString()
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const formatRole = (role) => {
  const roleMap = {
    'convener': 'Convener',
    'president': 'President',
    'vice-president': 'Vice President',
    'general-secretary': 'General Secretary',
    'treasurer': 'Treasurer',
    'executive': 'Executive Member'
  }
  return roleMap[role] || role
}

const getRoleColor = (role) => {
  const colors = {
    'convener': {
      avatar: 'bg-gradient-to-br from-red-500 to-pink-600',
      text: 'text-red-600',
      badge: 'bg-red-100 text-red-800',
      border: 'border-red-200',
      bg: 'bg-red-50'
    },
    'president': {
      avatar: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      text: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-800',
      border: 'border-purple-200',
      bg: 'bg-purple-50'
    },
    'vice-president': {
      avatar: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      text: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-800',
      border: 'border-blue-200',
      bg: 'bg-blue-50'
    },
    'general-secretary': {
      avatar: 'bg-gradient-to-br from-green-500 to-emerald-600',
      text: 'text-green-600',
      badge: 'bg-green-100 text-green-800',
      border: 'border-green-200',
      bg: 'bg-green-50'
    },
    'treasurer': {
      avatar: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      text: 'text-yellow-600',
      badge: 'bg-yellow-100 text-yellow-800',
      border: 'border-yellow-200',
      bg: 'bg-yellow-50'
    },
    'executive': {
      avatar: 'bg-gradient-to-br from-gray-500 to-gray-600',
      text: 'text-gray-600',
      badge: 'bg-gray-100 text-gray-800',
      border: 'border-gray-200',
      bg: 'bg-gray-50'
    }
  }
  return colors[role] || colors['executive']
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>