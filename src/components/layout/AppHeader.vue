<script setup>
import { ref, computed } from 'vue'
import { useSiteSettingsStore } from '@/stores/siteSettingsStore'

const siteSettingsStore = useSiteSettingsStore()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const siteName = computed(() => {
  return siteSettingsStore.settings['SiteName'] || 'PORTFOLIO'
})

// قمنا بتغيير href ليحتوي فقط على اسم القسم بدون # لتسهيل التعامل معه في القالب
const navLinks = [
  { name: 'Home', section: '#home', id: 'home' },
  { name: 'Projects', section: '#projects', id: 'projects' },
  { name: 'Skills', section: '#skills', id: 'skills' },
  { name: 'Experience', section: '#experience', id: 'experience' },
  { name: 'Contact', section: '#contact', id: 'contact' }
]
</script>

<template>
  <header class="app-header">
    <nav class="navbar">
      <div class="container">

        <div class="navbar-brand">
          <router-link to="/" class="brand-link">
            <span class="brand-prefix">&lt;</span>
            <span class="brand-name">{{ siteName }}</span>
            <span class="brand-suffix">/&gt;</span>
          </router-link>
        </div>

        <ul class="nav-links desktop-nav">
          <li v-for="link in navLinks" :key="link.id" class="nav-item">
            <router-link
              :to="{ path: '/', hash: link.section }"
              class="nav-link"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          :aria-label="isMobileMenuOpen ? 'Close Menu' : 'Open Menu'"
        >
          <span class="hamburger-icon" :class="{ active: isMobileMenuOpen }">
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>

      <transition name="slide-down">
        <ul v-if="isMobileMenuOpen" class="nav-links mobile-nav">
          <li v-for="link in navLinks" :key="link.id" class="nav-item">
            <router-link
              :to="{ path: '/', hash: link.section }"
              class="nav-link"
              @click="toggleMobileMenu"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<style scoped>
/* نفس الستايل الخاص بك تماماً بدون تغيير */
/* ... (أبقِ الستايل كما هو) ... */
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
}
.navbar { width: 100%; }
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 2px;
  font-family: 'Courier New', monospace;
}
.brand-prefix, .brand-suffix { color: var(--primary-blue); font-weight: 700; font-size: 1.2rem; }
.brand-name { font-size: 1.25rem; font-weight: 800; color: var(--text-main); letter-spacing: 1px; }
.nav-links { list-style: none; padding: 0; margin: 0; display: flex; gap: 2.5rem; }
.desktop-nav { display: none; }
.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}
.nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
  background-color: var(--primary-blue); transition: width 0.3s ease;
}
.nav-link:hover { color: var(--text-main); }
.nav-link:hover::after { width: 100%; }
.mobile-menu-btn { display: block; background: none; border: none; cursor: pointer; padding: 0.5rem; z-index: 1001; }
.hamburger-icon { display: flex; flex-direction: column; gap: 6px; width: 24px; height: 20px; }
.hamburger-icon span { display: block; width: 100%; height: 2px; background-color: var(--text-main); border-radius: 2px; transition: all 0.3s ease; }
.hamburger-icon.active span:nth-child(1) { transform: rotate(45deg) translateY(8px) translateX(4px); }
.hamburger-icon.active span:nth-child(2) { opacity: 0; }
.hamburger-icon.active span:nth-child(3) { transform: rotate(-45deg) translateY(-8px) translateX(4px); }
.mobile-nav {
  flex-direction: column; gap: 0; padding: 1rem 1.5rem; background-color: var(--bg-dark);
  border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);
  position: absolute; top: 100%; left: 0; width: 100%; box-sizing: border-box;
}
.mobile-nav .nav-item { border-bottom: 1px solid var(--border-color); }
.mobile-nav .nav-item:last-child { border-bottom: none; }
.mobile-nav .nav-link { display: block; padding: 1rem 0; font-size: 1.1rem; color: var(--text-main); }
.mobile-nav .nav-link:hover { color: var(--primary-blue); padding-left: 10px; }
.mobile-nav .nav-link::after { display: none; }
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease-out; max-height: 400px; opacity: 1; }
.slide-down-enter-from, .slide-down-leave-to { max-height: 0; opacity: 0; }
@media (min-width: 768px) {
  .desktop-nav { display: flex; }
  .mobile-menu-btn, .mobile-nav { display: none !important; }
}
</style>
