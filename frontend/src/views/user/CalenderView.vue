<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 class="text-3xl font-black text-gray-900 mb-2">Event Calendar</h1>
              <p class="text-gray-600">Stay updated with all club events and activities</p>
            </div>
            <div class="flex items-center space-x-4">
              <!-- View Toggle -->
              <div class="flex bg-gray-100 rounded-lg p-1">
                <button 
                  @click="currentView = 'month'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300',
                    currentView === 'month' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  Month
                </button>
                <button 
                  @click="currentView = 'week'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300',
                    currentView === 'week' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  Week
                </button>
                <button 
                  @click="currentView = 'day'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300',
                    currentView === 'day' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  Day
                </button>
              </div>

              <!-- Navigation -->
              <div class="flex items-center space-x-2">
                <button @click="previousPeriod" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button @click="nextPeriod" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                <button @click="goToToday" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                  Today
                </button>
              </div>

              <!-- Add Event Button -->
              <button 
                @click="showAddEventModal = true"
                class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span>Add Event</span>
              </button>
            </div>
          </div>

          <!-- Current Period Display -->
          <div class="mt-6">
            <h2 class="text-2xl font-black text-gray-900 text-center">
              {{ currentPeriodDisplay }}
            </h2>
          </div>
        </div>
      </div>

      <!-- Calendar View -->
      <div class="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
        <!-- Month View -->
        <div v-if="currentView === 'month'" class="p-6">
          <!-- Week Days Header -->
          <div class="grid grid-cols-7 gap-1 mb-4">
            <div 
              v-for="day in weekDays" 
              :key="day"
              class="p-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1">
            <div 
              v-for="day in calendarDays" 
              :key="day.date.toString()"
              :class="[
                'min-h-32 p-2 border border-gray-100 transition-colors hover:bg-gray-50',
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
                day.isToday ? 'bg-blue-50 border-blue-200' : ''
              ]"
            >
              <!-- Date Number -->
              <div class="flex justify-between items-start mb-2">
                <span 
                  :class="[
                    'text-sm font-medium px-2 py-1 rounded-full',
                    day.isToday ? 'bg-blue-600 text-white' : 'text-gray-900'
                  ]"
                >
                  {{ day.date.getDate() }}
                </span>
                <button 
                  @click="openAddEventModal(day.date)"
                  class="opacity-0 hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all duration-300"
                >
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>

              <!-- Events -->
              <div class="space-y-1">
                <div 
                  v-for="event in getEventsForDay(day.date)" 
                  :key="event.id"
                  @click="openEventDetails(event)"
                  :class="[
                    'text-xs p-2 rounded cursor-pointer transition-all duration-300 hover:shadow-md',
                    getEventColorClass(event.type)
                  ]"
                >
                  <div class="font-medium truncate">{{ event.title }}</div>
                  <div class="text-opacity-90 truncate">{{ formatTime(event.startTime) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Week View -->
        <div v-if="currentView === 'week'" class="p-6">
          <div class="grid grid-cols-8 gap-1">
            <!-- Time Column -->
            <div class="p-4"></div>
            
            <!-- Day Headers -->
            <div 
              v-for="day in currentWeek" 
              :key="day.date.toString()"
              :class="[
                'p-4 text-center border-b',
                isToday(day.date) ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
              ]"
            >
              <div class="text-sm font-semibold text-gray-600 uppercase">
                {{ formatDate(day.date, 'EEE') }}
              </div>
              <div 
                :class="[
                  'text-2xl font-black',
                  isToday(day.date) ? 'text-blue-600' : 'text-gray-900'
                ]"
              >
                {{ formatDate(day.date, 'd') }}
              </div>
            </div>
          </div>

          <!-- Time Slots -->
          <div class="grid grid-cols-8 gap-1" v-for="hour in hours" :key="hour">
            <div class="p-2 text-right text-sm text-gray-500 border-r border-gray-200">
              {{ formatHour(hour) }}
            </div>
            
            <div 
              v-for="day in currentWeek" 
              :key="day.date.toString() + hour"
              class="min-h-20 border-b border-r border-gray-200 relative"
              @click="openAddEventModal(new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), hour))"
            >
              <!-- Events for this time slot -->
              <div 
                v-for="event in getEventsForDayAndHour(day.date, hour)" 
                :key="event.id"
                @click.stop="openEventDetails(event)"
                :class="[
                  'absolute left-1 right-1 p-2 rounded text-xs cursor-pointer transition-all duration-300 hover:shadow-md z-10',
                  getEventColorClass(event.type)
                ]"
                :style="{
                  top: `${(new Date(event.startTime).getMinutes() / 60) * 100}%`,
                  height: `${(getEventDuration(event) / 60) * 100}%`
                }"
              >
                <div class="font-medium truncate">{{ event.title }}</div>
                <div class="text-opacity-90 truncate">{{ event.location }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Day View -->
        <div v-if="currentView === 'day'" class="p-6">
          <div class="text-center mb-6">
            <h3 class="text-2xl font-black text-gray-900">
              {{ formatDate(currentDay, 'EEEE, MMMM d, yyyy') }}
            </h3>
          </div>

          <div class="grid grid-cols-1 gap-1 max-w-2xl mx-auto">
            <div 
              v-for="hour in hours" 
              :key="hour"
              class="flex border-b border-gray-200 min-h-20"
            >
              <div class="w-20 p-2 text-right text-sm text-gray-500 border-r border-gray-200">
                {{ formatHour(hour) }}
              </div>
              
              <div 
                class="flex-1 p-2 relative"
                @click="openAddEventModal(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), hour))"
              >
                <!-- Events for this time slot -->
                <div 
                  v-for="event in getEventsForDayAndHour(currentDay, hour)" 
                  :key="event.id"
                  @click.stop="openEventDetails(event)"
                  :class="[
                    'absolute left-1 right-1 p-2 rounded text-sm cursor-pointer transition-all duration-300 hover:shadow-md z-10',
                    getEventColorClass(event.type)
                  ]"
                  :style="{
                    top: `${(new Date(event.startTime).getMinutes() / 60) * 100}%`,
                    height: `${(getEventDuration(event) / 60) * 100}%`
                  }"
                >
                  <div class="font-medium">{{ event.title }}</div>
                  <div class="text-opacity-90 text-xs">{{ event.location }}</div>
                  <div class="text-opacity-90 text-xs">{{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events Sidebar -->
      <div class="mt-8 grid lg:grid-cols-4 gap-8">
        <div class="lg:col-span-3">
          <!-- Event Statistics -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl p-6 shadow-lg border border-blue-50">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-medium">Total Events</p>
                  <p class="text-2xl font-black text-gray-900 mt-1">{{ events.length }}</p>
                </div>
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg border border-green-50">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-medium">This Month</p>
                  <p class="text-2xl font-black text-gray-900 mt-1">{{ eventsThisMonth.length }}</p>
                </div>
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg border border-purple-50">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-medium">Upcoming</p>
                  <p class="text-2xl font-black text-gray-900 mt-1">{{ upcomingEvents.length }}</p>
                </div>
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="bg-white rounded-2xl shadow-lg border border-blue-50 p-6">
          <h3 class="text-xl font-black text-gray-900 mb-6">Upcoming Events</h3>
          <div class="space-y-4">
            <div 
              v-for="event in upcomingEvents.slice(0, 5)" 
              :key="event.id"
              @click="openEventDetails(event)"
              class="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div class="flex items-start space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex flex-col items-center justify-center text-white font-semibold text-xs">
                  <span>{{ formatDate(event.startTime, 'MMM') }}</span>
                  <span class="text-lg">{{ formatDate(event.startTime, 'd') }}</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 mb-1">{{ event.title }}</h4>
                  <p class="text-sm text-gray-600">{{ formatTime(event.startTime) }} • {{ event.location }}</p>
                  <span :class="['inline-block px-2 py-1 rounded-full text-xs font-medium mt-2', getEventColorClass(event.type)]">
                    {{ event.type }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="upcomingEvents.length === 0" class="text-center py-8 text-gray-500">
              <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p>No upcoming events</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Event Modal -->
    <div v-if="showAddEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 class="text-xl font-black text-gray-900 mb-4">Add New Event</h3>
        <form @submit.prevent="saveEvent" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
            <input 
              v-model="newEvent.title"
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event title"
            >
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input 
                v-model="newEvent.startTime"
                type="datetime-local" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input 
                v-model="newEvent.endTime"
                type="datetime-local" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              v-model="newEvent.location"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Event location"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select 
              v-model="newEvent.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="workshop">Workshop</option>
              <option value="meeting">Meeting</option>
              <option value="social">Social Event</option>
              <option value="competition">Competition</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              v-model="newEvent.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Event description"
            ></textarea>
          </div>

          <div class="flex space-x-3 pt-4">
            <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Save Event
            </button>
            <button @click="showAddEventModal = false" type="button" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Event Details Modal -->
    <div v-if="selectedEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-black text-gray-900">{{ selectedEvent.title }}</h3>
          <button @click="selectedEvent = null" class="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-gray-700">
              {{ formatDate(selectedEvent.startTime, 'EEEE, MMMM d, yyyy') }}
            </span>
          </div>

          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-gray-700">
              {{ formatTime(selectedEvent.startTime) }} - {{ formatTime(selectedEvent.endTime) }}
            </span>
          </div>

          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-gray-700">{{ selectedEvent.location }}</span>
          </div>

          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span :class="['px-2 py-1 rounded-full text-xs font-medium', getEventColorClass(selectedEvent.type)]">
              {{ selectedEvent.type }}
            </span>
          </div>

          <div v-if="selectedEvent.description" class="mt-4">
            <h4 class="font-semibold text-gray-900 mb-2">Description</h4>
            <p class="text-gray-700">{{ selectedEvent.description }}</p>
          </div>

          <div class="flex space-x-3 pt-6">
            <button @click="registerForEvent(selectedEvent)" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Register
            </button>
            <button @click="selectedEvent = null" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive state
const currentView = ref('month')
const currentDate = ref(new Date())
const showAddEventModal = ref(false)
const selectedEvent = ref(null)

// Static sample events data
const events = ref([
  {
    id: 1,
    title: 'Ai Events',
    startTime: new Date(2025, 11, 20, 14, 0), 
    endTime: new Date(2025, 11, 20, 16, 0),
    location: 'CSE Lab 301',
    type: 'workshop',
    description: 'Learn modern web development techniques including React, Vue, and modern CSS frameworks.'
  },
  {
    id: 2,
    title: 'Club Monthly Meeting',
    startTime: new Date(2025, 11, 20, 14, 0), 
    endTime: new Date(2025, 11, 20, 16, 0),
    location: 'Conference Room A',
    type: 'meeting',
    description: 'Monthly club meeting to discuss upcoming events and projects.'
  },
  {
    id: 3,
    title: 'Hackathon Kickoff',
    startTime: new Date(2025, 11, 20, 14, 0), 
    endTime: new Date(2025, 11, 20, 16, 0),
    location: 'Innovation Hub',
    type: 'competition',
    description: 'Annual coding competition kickoff event with project ideas and team formation.'
  },
  {
    id: 4,
    title: 'AI & ML Seminar',
    startTime: new Date(2025, 11, 20, 14, 0), 
    endTime: new Date(2025, 11, 20, 16, 0),
    location: 'Auditorium B',
    type: 'workshop',
    description: 'Introduction to Artificial Intelligence and Machine Learning concepts.'
  },
  {
    id: 5,
    title: 'Project Submission Deadline',
    startTime: new Date(2025, 11, 20, 14, 0), 
    endTime: new Date(2025, 11, 20, 16, 0),
    location: 'Online',
    type: 'deadline',
    description: 'Final submission deadline for semester projects.'
  },
  {
    id: 6,
    title: 'Tech Social Event',
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5, 17, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5, 19, 0),
    location: 'Student Lounge',
    type: 'social',
    description: 'Networking event for tech enthusiasts with pizza and drinks.'
  }
])

// New event form
const newEvent = ref({
  title: '',
  startTime: '',
  endTime: '',
  location: '',
  type: 'workshop',
  description: ''
})

// Constants
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

// Computed properties
const currentPeriodDisplay = computed(() => {
  if (currentView.value === 'month') {
    return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  } else if (currentView.value === 'week') {
    const start = new Date(currentDate.value)
    start.setDate(start.getDate() - start.getDay())
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  } else {
    return currentDate.value.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - startDate.getDay())
  
  const endDate = new Date(lastDay)
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))
  
  const days = []
  const current = new Date(startDate)
  
  while (current <= endDate) {
    days.push({
      date: new Date(current),
      isCurrentMonth: current.getMonth() === month,
      isToday: isToday(current)
    })
    current.setDate(current.getDate() + 1)
  }
  
  return days
})

const currentWeek = computed(() => {
  const start = new Date(currentDate.value)
  start.setDate(start.getDate() - start.getDay())
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start)
    date.setDate(date.getDate() + i)
    return { date }
  })
})

const currentDay = computed(() => currentDate.value)

const upcomingEvents = computed(() => {
  const now = new Date()
  return events.value
    .filter(event => new Date(event.startTime) >= now)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
})

const eventsThisMonth = computed(() => {
  const current = new Date(currentDate.value)
  const monthStart = new Date(current.getFullYear(), current.getMonth(), 1)
  const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0)
  
  return events.value.filter(event => {
    const eventDate = new Date(event.startTime)
    return eventDate >= monthStart && eventDate <= monthEnd
  })
})

// Methods
const previousPeriod = () => {
  if (currentView.value === 'month') {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
  } else if (currentView.value === 'week') {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), currentDate.value.getDate() - 7)
  } else {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), currentDate.value.getDate() - 1)
  }
}

const nextPeriod = () => {
  if (currentView.value === 'month') {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
  } else if (currentView.value === 'week') {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), currentDate.value.getDate() + 7)
  } else {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), currentDate.value.getDate() + 1)
  }
}

const goToToday = () => {
  currentDate.value = new Date()
}

const isToday = (date) => {
  const today = new Date()
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear()
}

const getEventsForDay = (date) => {
  return events.value.filter(event => {
    const eventDate = new Date(event.startTime)
    return eventDate.getDate() === date.getDate() &&
           eventDate.getMonth() === date.getMonth() &&
           eventDate.getFullYear() === date.getFullYear()
  })
}

const getEventsForDayAndHour = (date, hour) => {
  return events.value.filter(event => {
    const eventDate = new Date(event.startTime)
    return eventDate.getDate() === date.getDate() &&
           eventDate.getMonth() === date.getMonth() &&
           eventDate.getFullYear() === date.getFullYear() &&
           eventDate.getHours() === hour
  })
}

const getEventColorClass = (type) => {
  const colors = {
    workshop: 'bg-blue-100 text-blue-800 border-blue-200',
    meeting: 'bg-green-100 text-green-800 border-green-200',
    social: 'bg-purple-100 text-purple-800 border-purple-200',
    competition: 'bg-orange-100 text-orange-800 border-orange-200',
    deadline: 'bg-red-100 text-red-800 border-red-200'
  }
  return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
}

const getEventDuration = (event) => {
  const start = new Date(event.startTime)
  const end = new Date(event.endTime)
  return (end - start) / (1000 * 60) // duration in minutes
}

const formatDate = (date, format = 'MMM d') => {
  const d = new Date(date)
  if (format === 'EEE') return d.toLocaleDateString('en-US', { weekday: 'short' })
  if (format === 'MMM') return d.toLocaleDateString('en-US', { month: 'short' })
  if (format === 'd') return d.getDate().toString()
  if (format === 'EEEE, MMMM d, yyyy') 
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const formatTime = (date) => {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

const formatHour = (hour) => {
  return hour <= 12 ? `${hour} AM` : `${hour - 12} PM`
}

const openAddEventModal = (date) => {
  const defaultDate = date || new Date()
  newEvent.value = {
    title: '',
    startTime: defaultDate.toISOString().slice(0, 16),
    endTime: new Date(defaultDate.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16),
    location: '',
    type: 'workshop',
    description: ''
  }
  showAddEventModal.value = true
}

const openEventDetails = (event) => {
  selectedEvent.value = event
}

const saveEvent = () => {
  // Create new event with static data
  const newEventData = {
    id: events.value.length + 1,
    title: newEvent.value.title,
    startTime: new Date(newEvent.value.startTime),
    endTime: new Date(newEvent.value.endTime),
    location: newEvent.value.location,
    type: newEvent.value.type,
    description: newEvent.value.description
  }
  
  events.value.push(newEventData)
  showAddEventModal.value = false
  
  // Reset form
  newEvent.value = {
    title: '',
    startTime: '',
    endTime: '',
    location: '',
    type: 'workshop',
    description: ''
  }
}

const registerForEvent = (event) => {
  alert(`Successfully registered for: ${event.title}`)
  selectedEvent.value = null
}
</script>

<style scoped>
/* Custom styles for calendar */
.hover\:opacity-100:hover {
  opacity: 1;
}
</style>