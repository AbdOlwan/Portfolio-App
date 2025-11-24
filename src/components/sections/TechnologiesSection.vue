<script setup>
import { onMounted, computed } from 'vue';
import { useTechnologiesStore } from '@/stores/technologiesStore'; //
import { storeToRefs } from 'pinia';

const store = useTechnologiesStore();
//
const { technologies, isLoading, error, hasData } = storeToRefs(store);

onMounted(() => {
  store.fetchActiveTechnologies(); //
});

// نقوم بمضاعفة القائمة لإنشاء تأثير التمرير اللانهائي السلس
const marqueeList = computed(() => {
  if (!technologies.value.length) return [];
  // نكرر القائمة 3 مرات لضمان الامتلاء حتى في الشاشات الكبيرة
  return [...technologies.value, ...technologies.value, ...technologies.value];
});
</script>

<template>
  <section id="technologies" class="tech-section">

    <div class="bg-glow"></div>

    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Tech <span class="highlight">Stack</span></h2>
        <p class="section-subtitle">
          The ecosystem of tools and technologies I work with.
        </p>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="error-state">
        <p>⚠️ {{ error }}</p>
      </div>

      <div v-else-if="hasData" class="marquee-wrapper">

        <div class="fade-overlay left"></div>
        <div class="fade-overlay right"></div>

        <div class="marquee-track">
          <div
            v-for="(tech, index) in marqueeList"
            :key="`${tech.id}-${index}`"
            class="tech-item"
            :style="{ '--hover-color': tech.color || '#2563eb' }"
          >
            <div class="icon-box">
              <img
                v-if="tech.iconUrl"
                :src="tech.iconUrl"
                :alt="tech.name"
                class="tech-icon"
                loading="lazy"
              />
              <span v-else class="tech-initial">{{ tech.name.charAt(0) }}</span>
            </div>
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>

      </div>

      <div v-else class="empty-state">
        <p>No technologies added yet.</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- 1. Global Variables --- */
:root {
  --bg-dark: #0f172a;
  --card-bg: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary-blue: #2563eb;
}

/* --- 2. Section Layout --- */
.tech-section {
  background-color: #0b1120; /* أغمق قليلاً من الأقسام الأخرى للتباين */
  padding: 4rem 0;
  overflow: hidden;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 200px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 100%; /* Full width for marquee */
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1.5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.highlight {
  color: var(--primary-blue);
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 1rem;
}

/* --- 3. Marquee Styles --- */
.marquee-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 1rem 0;
  display: flex;
}

/* Fade Overlays (يسار ويمين) */
.fade-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.fade-overlay.left {
  left: 0;
  background: linear-gradient(to right, #0b1120, transparent);
}

.fade-overlay.right {
  right: 0;
  background: linear-gradient(to left, #0b1120, transparent);
}

/* المسار المتحرك */
.marquee-track {
  display: flex;
  gap: 3rem; /* المسافة بين العناصر */
  animation: scroll 40s linear infinite;
  width: max-content; /* مهم جداً ليحتوي العناصر */
}

/* التوقف عند التحويم */
.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); 
  }
}

/* --- 4. Tech Item --- */
.tech-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(30, 41, 59, 0.5);
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: default;
  white-space: nowrap;
}

.tech-item:hover {
  background-color: rgba(30, 41, 59, 1);
  border-color: var(--hover-color);
  box-shadow: 0 0 15px var(--hover-color);
  transform: translateY(-2px);
}

.icon-box {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.tech-item:hover .tech-icon {
  filter: grayscale(0%);
}

.tech-initial {
  font-weight: bold;
  color: var(--text-muted);
}

.tech-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.tech-item:hover .tech-name {
  color: var(--text-main);
}

/* --- 5. States --- */
.loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
}

.spinner {
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--primary-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* --- 6. Responsive --- */
@media (max-width: 768px) {
  .marquee-track {
    gap: 2rem;
    animation-duration: 20s;
  }

  .tech-item {
    padding: 0.5rem 1rem;
  }

  .fade-overlay {
    width: 50px;
  }
}
</style>
