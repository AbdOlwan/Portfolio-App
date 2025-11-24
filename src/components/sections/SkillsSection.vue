<script setup>
import { onMounted } from 'vue';
import { useSkillsStore } from '@/stores/skillsStore'; //
import { storeToRefs } from 'pinia';

// ربط الـ Store
const store = useSkillsStore();
const { groupedSkills, isLoading, error, hasData } = storeToRefs(store); //

// جلب البيانات عند التحميل
onMounted(() => {
  store.fetchActiveSkills(); //
});
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="container">

      <div class="section-header">
        <h2 class="section-title">Technical <span class="highlight">Arsenal</span></h2>
        <p class="section-subtitle">
          A comprehensive list of technologies and tools I use to build scalable solutions.
        </p>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading Technologies...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>⚠️ {{ error }}</p>
        <button @click="store.fetchActiveSkills()" class="retry-btn">Retry</button>
      </div>

      <div v-else-if="hasData" class="skills-wrapper">

        <div
          v-for="(skills, category) in groupedSkills"
          :key="category"
          class="skill-category-group"
        >
          <h3 class="category-title">
            <span class="title-decoration"></span>
            {{ category }}
          </h3>

          <div class="skills-grid">
            <div
              v-for="skill in skills"
              :key="skill.id"
              class="skill-card"
            >
              <div class="icon-box">
                <img
                  v-if="skill.iconUrl"
                  :src="skill.iconUrl"
                  :alt="skill.name"
                  class="skill-icon"
                  loading="lazy"
                />
                <div v-else class="icon-placeholder">
                  {{ skill.name.charAt(0) }}
                </div>
              </div>

              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>

      </div>

      <div v-else class="empty-state">
        <p>No skills listed yet.</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- 1. المتغيرات (متوافقة مع System Design) --- */
:root {
  --bg-dark: #0f172a;
  --card-bg: #1e293b;
  --border-color: #334155;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary-blue: #2563eb;
  --primary-glow: rgba(37, 99, 235, 0.5);
}

/* --- 2. تنسيق القسم --- */
.skills-section {
  background-color: #0f172a; /* Dark Background */
  padding: 5rem 1.5rem;
  color: #f8fafc;
  position: relative;
}

/* زخرفة خلفية خفيفة */
.skills-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #1e293b, transparent);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* --- 3. الرأس --- */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.highlight {
  color: #2563eb;
}

.section-subtitle {
  color: #94a3b8;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* --- 4. مجموعات الفئات --- */
.skills-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.skill-category-group {
  animation: fadeInUp 0.6s ease-out forwards;
}

.category-title {
  font-size: 1.25rem;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.title-decoration {
  display: block;
  width: 4px;
  height: 24px;
  background-color: #2563eb;
  border-radius: 2px;
  box-shadow: 0 0 10px var(--primary-glow);
}

/* --- 5. شبكة المهارات (Grid) --- */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.25rem;
}

/* --- 6. بطاقة المهارة (Minimal Card) --- */
.skill-card {
  background-color: #1e293b; /* Slate 800 */
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  cursor: default;
}

.skill-card:hover {
  background-color: #273548;
  border-color: #475569;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* الأيقونة */
.icon-box {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(15, 23, 42, 0.5);
  border-radius: 8px;
  padding: 6px;
}

.skill-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.icon-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #2563eb;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 6px;
}

/* اسم المهارة */
.skill-name {
  font-weight: 500;
  color: #e2e8f0;
  font-size: 0.95rem;
}

.skill-card:hover .skill-name {
  color: white;
}

/* --- 7. الحالات (Loading, Error) --- */
.loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 4rem;
  color: #94a3b8;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* --- 8. التجاوب --- */
@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr); /* عمودين في الموبايل */
  }
  .section-title {
    font-size: 2rem;
  }
}
</style>
