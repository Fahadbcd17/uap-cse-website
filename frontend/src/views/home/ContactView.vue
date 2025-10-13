<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white py-20">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl font-bold mb-6">Get in Touch</h1>
        <p class="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
          We're here to help you with any questions about admissions, programs, campus life, or anything else you'd like to know.
        </p>
      </div>
    </section>

    <!-- Contact Cards -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Phone -->
          <div class="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Call Us</h3>
            <p class="text-gray-600 mb-4">Speak directly with our admission counselors</p>
            <div class="text-lg font-semibold text-purple-600">(555) 123-4567</div>
            <div class="text-sm text-gray-500 mt-2">Mon-Fri, 9AM-5PM EST</div>
          </div>

          <!-- Email -->
          <div class="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Email Us</h3>
            <p class="text-gray-600 mb-4">Send us your questions and we'll respond quickly</p>
            <div class="text-lg font-semibold text-purple-600">admissions@university.edu</div>
            <div class="text-sm text-gray-500 mt-2">Response within 24 hours</div>
          </div>

          <!-- Visit -->
          <div class="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Visit Campus</h3>
            <p class="text-gray-600 mb-4">Schedule a campus tour and see us in person</p>
            <div class="text-lg font-semibold text-purple-600">Schedule a Tour</div>
            <div class="text-sm text-gray-500 mt-2">Guided tours available daily</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p class="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

            <form class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200" placeholder="Your first name">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200" placeholder="Your last name">
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200" placeholder="your.email@example.com">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200" placeholder="(555) 123-4567">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <select required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200">
                  <option value="">Select a subject</option>
                  <option value="admissions">Admissions Inquiry</option>
                  <option value="financial-aid">Financial Aid</option>
                  <option value="academic-programs">Academic Programs</option>
                  <option value="campus-tour">Campus Tour</option>
                  <option value="international">International Students</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Program of Interest</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200">
                  <option value="">Select a program (optional)</option>
                  <option value="cs">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business Administration</option>
                  <option value="arts">Arts & Sciences</option>
                  <option value="medicine">Medicine</option>
                  <option value="law">Law</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea rows="6" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200" placeholder="Tell us how we can help you..."></textarea>
              </div>

              <div class="flex items-center">
                <input type="checkbox" id="newsletter" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <label for="newsletter" class="ml-2 text-sm text-gray-700">
                  I'd like to receive updates about admissions and university news
                </label>
              </div>

              <button type="submit" class="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold text-lg">
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <!-- Office Hours -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Office Hours</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                  <span class="text-gray-700">Monday - Friday</span>
                  <span class="font-semibold text-gray-900">9:00 AM - 5:00 PM</span>
                </div>
                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                  <span class="text-gray-700">Saturday</span>
                  <span class="font-semibold text-gray-900">10:00 AM - 2:00 PM</span>
                </div>
                <div class="flex justify-between items-center py-3">
                  <span class="text-gray-700">Sunday</span>
                  <span class="font-semibold text-gray-900">Closed</span>
                </div>
              </div>
            </div>

            <!-- Campus Location -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Visit Our Campus</h3>
              <div class="space-y-4">
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-purple-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p class="text-gray-700">123 Education Lane</p>
                    <p class="text-gray-700">Academic City, AC 12345</p>
                    <p class="text-gray-700">United States</p>
                  </div>
                </div>
                <button class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold mt-4">
                  Schedule Campus Tour
                </button>
              </div>
            </div>

            <!-- Emergency Contact -->
            <div class="bg-red-50 border border-red-200 rounded-2xl p-8">
              <h3 class="text-xl font-bold text-red-900 mb-4">Emergency Contact</h3>
              <p class="text-red-700 mb-4">For urgent matters outside office hours</p>
              <div class="text-lg font-semibold text-red-800">(555) 911-HELP</div>
              <p class="text-sm text-red-600 mt-2">Available 24/7 for emergencies</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Department Contacts -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Department Contacts</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Reach out to specific departments for specialized assistance with your inquiries.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Admissions -->
          <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v6l9-5-9-5-9 5 9 5z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Admissions Office</h3>
            <p class="text-gray-600 mb-4">Questions about applications, requirements, and deadlines</p>
            <div class="text-purple-600 font-semibold">admissions@university.edu</div>
            <div class="text-gray-500 text-sm">(555) 123-4567</div>
          </div>

          <!-- Financial Aid -->
          <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Financial Aid</h3>
            <p class="text-gray-600 mb-4">Scholarships, grants, loans, and payment plans</p>
            <div class="text-purple-600 font-semibold">finaid@university.edu</div>
            <div class="text-gray-500 text-sm">(555) 123-4568</div>
          </div>

          <!-- International -->
          <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">International Office</h3>
            <p class="text-gray-600 mb-4">Visa, immigration, and international student support</p>
            <div class="text-purple-600 font-semibold">international@university.edu</div>
            <div class="text-gray-500 text-sm">(555) 123-4569</div>
          </div>

          <!-- Housing -->
          <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Student Housing</h3>
            <p class="text-gray-600 mb-4">Dormitories, apartments, and campus accommodation</p>
            <div class="text-purple-600 font-semibold">housing@university.edu</div>
            <div class="text-gray-500 text-sm">(555) 123-4570</div>
          </div>

          <!-- Academic -->
          <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Academic Affairs</h3>
            <p class="text-gray-600 mb-4">Curriculum, courses, and academic policies</p>
            <div class="text-purple-600 font-semibold">academics@university.edu</div>
            <div class="text-gray-500 text-sm">(555) 123-4571</div>
          </div>

          <!-- Career Services -->
          <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Career Services</h3>
            <p class="text-gray-600 mb-4">Internships, job placement, and career counseling</p>
            <div class="text-purple-600 font-semibold">careers@university.edu</div>
            <div class="text-gray-500 text-sm">(555) 123-4572</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p class="text-xl text-gray-600">Quick answers to common questions</p>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">How do I apply for admission?</h3>
            <p class="text-gray-600">You can apply through our online application portal. Create an account, fill out the application form, upload required documents, and pay the application fee. The entire process takes about 30-45 minutes.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">What are the application deadlines?</h3>
            <p class="text-gray-600">For Fall 2024, the priority deadline is January 15th and the regular decision deadline is March 1st. Early decision applications are due November 1st.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Do you offer campus tours?</h3>
            <p class="text-gray-600">Yes! We offer guided campus tours Monday through Saturday. You can schedule a tour online or by calling our admissions office. Virtual tours are also available.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">What financial aid options are available?</h3>
            <p class="text-gray-600">We offer merit-based scholarships, need-based grants, work-study programs, and federal student loans. Over 85% of our students receive some form of financial assistance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">University Name</h3>
            <p class="text-gray-400">
              Committed to excellence in education and student success since 1990.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <div class="space-y-2">
              <a href="#" class="text-gray-400 hover:text-white block">Home</a>
              <a href="#" class="text-gray-400 hover:text-white block">Admissions</a>
              <a href="#" class="text-gray-400 hover:text-white block">Academic Programs</a>
              <a href="#" class="text-gray-400 hover:text-white block">Campus Life</a>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact Info</h3>
            <div class="space-y-2 text-gray-400">
              <p>123 Education Lane</p>
              <p>Academic City, AC 12345</p>
              <p>admissions@university.edu</p>
              <p>(555) 123-4567</p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">Facebook</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">Twitter</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">Instagram</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 University Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// This is a static contact page
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>