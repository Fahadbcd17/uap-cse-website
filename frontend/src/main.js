import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { store } from './store'
// import "preline/preline";
// import VueApexCharts from "vue3-apexcharts";
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import '@fortawesome/fontawesome-free/css/all.css';
// import '@fortawesome/fontawesome-free/js/all.js';





const app = createApp(App)
app.use(router)
app.use(store)
// app.use(VueApexCharts)
app.mount('#app')