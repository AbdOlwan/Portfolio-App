<script setup>
import { computed } from 'vue'
import { useSiteSettingsStore } from '@/stores/siteSettingsStore'
import { useSocialMediaStore } from '@/stores/socialMediaStore'

const siteSettingsStore = useSiteSettingsStore()
const socialMediaStore = useSocialMediaStore()

const currentYear = new Date().getFullYear()

const siteName = computed(() => {
  return siteSettingsStore.settings['SiteName'] || 'PORTFOLIO'
})

const footerCopyright = computed(() => {
  // Fallback to English default if not set
  return siteSettingsStore.settings['FooterCopyright'] || `© ${currentYear} All Rights Reserved.`
})
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-top">

        <div class="footer-column brand-column">
          <h3 class="brand-name">{{ siteName }}</h3>
          <p class="brand-description">
            Building exceptional digital experiences with engineering precision.
          </p>
        </div>

        <div class="footer-column">
          <h4 class="footer-heading">Quick Links</h4>
<nav class="footer-nav">
  <router-link :to="{ path: '/', hash: '#home' }" class="footer-link">Home</router-link>
  <router-link :to="{ path: '/', hash: '#projects' }" class="footer-link">Projects</router-link>
  <router-link :to="{ path: '/', hash: '#skills' }" class="footer-link">Skills</router-link>
  <router-link :to="{ path: '/', hash: '#contact' }" class="footer-link">Contact</router-link>
</nav>
        </div>

        <div v-if="socialMediaStore.hasData" class="footer-column">
          <h4 class="footer-heading">Connect</h4>
          <div class="social-links">
            <a
              v-for="link in socialMediaStore.socialMediaLinks"
              :key="link.id"
              :href="link.profileUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn"
              :title="link.platform"
            >
              <i v-if="link.iconClass" :class="link.iconClass"></i>
              <img v-else-if="link.iconUrl" :src="link.iconUrl" :alt="link.platform" class="social-icon">
              <span v-else>{{ link.platform.charAt(0) }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">{{ footerCopyright }}</p>
        <p class="made-with">
          Engineered with <span class="heart">♥</span> using Vue.js & .NET
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* --- Layout --- */
.app-footer {
  background-color: var(--bg-dark);
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 4rem 1.5rem 2rem;
  margin-top: 0; /* Sections usually handle their own spacing */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* --- Top Section --- */
.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--border-color);
}

/* Headings */
.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.footer-heading {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

/* Content */
.brand-description {
  line-height: 1.6;
  font-size: 0.95rem;
  max-width: 300px;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  width: fit-content;
}

.footer-link:hover {
  color: var(--primary-blue);
  transform: translateX(5px);
}

/* Social Buttons */
.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px; /* Soft square */
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-btn:hover {
  background-color: var(--primary-blue);
  border-color: var(--primary-blue);
  color: #fff;
  transform: translateY(-3px);
}

.social-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* --- Bottom Section --- */
.footer-bottom {
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
}

.made-with {
  color: var(--text-muted);
}

.heart {
  color: #ef4444; /* Red-500 */
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .footer-top {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .brand-description {
    margin: 0 auto;
  }

  .footer-link {
    margin: 0 auto;
  }

  .footer-link:hover {
    transform: none; /* Disable slide on mobile */
    color: var(--primary-blue);
  }

  .social-links {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
