<script setup>
import { onMounted } from 'vue';
import { useProjectsStore } from '@/stores/projectsStore'; //
import { storeToRefs } from 'pinia';

// ربط الـ Store
const store = useProjectsStore();
// - نستخدم featuredProjects لأننا في الصفحة الرئيسية
const { featuredProjects, isLoading, error } = storeToRefs(store);

// جلب البيانات عند التحميل
onMounted(() => {
  store.fetchFeaturedProjects(); //
});

</script>

<template>
  <section id="projects" class="projects-section">
    <div class="container">

      <div class="section-header">
        <h2 class="section-title">Featured <span class="highlight">Work</span></h2>
        <p class="section-subtitle">
          A selection of projects that demonstrate my engineering capabilities.
        </p>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Fetching Projects...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>⚠️ {{ error }}</p>
        <button @click="store.fetchFeaturedProjects()" class="retry-btn">Retry</button>
      </div>

      <div v-else-if="featuredProjects && featuredProjects.length > 0" class="projects-grid">
        <article
          v-for="project in featuredProjects"
          :key="project.id"
          class="project-card"
        >
          <div class="card-image-wrapper">
            <img
              :src="project.thumbnailUrl"
              :alt="project.title"
              class="project-image"
              loading="lazy"
            />

            <div class="card-overlay">
              <div class="overlay-links">
                 <a :href="`/project/${project.id}`" class="overlay-btn primary" title="View Details">
                  <span class="icon">👁️</span> Details
                 </a>
                 </div>
            </div>

            <span class="project-type-badge">
              {{ project.projectType }}
            </span>
          </div>

          <div class="card-content">
            <div class="card-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <span v-if="project.isFeatured" class="featured-star" title="Featured Project">★</span>
            </div>

            <p class="project-desc">
              {{ project.shortDescription }}
            </p>

<div class="tech-stack">
  <span
    v-for="tech in (project.technologies || []).filter(t => t && t.id).slice(0, 4)"
    :key="tech.id"
    class="tech-tag"
    :style="{ '--tech-color': tech.color || '#64748b' }"
  >
    {{ tech.name }}
  </span>

  <span v-if="project.technologies && project.technologies.filter(t => t && t.id).length > 4" class="tech-tag more">
    +{{ project.technologies.filter(t => t && t.id).length - 4 }}
  </span>
</div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <p>No featured projects available at the moment.</p>
      </div>

      <div class="section-footer">
        <a href="/projects" class="view-all-link">
          View All Projects <span class="arrow">→</span>
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- 1. المتغيرات (يجب أن تتوافق مع Hero Section) --- */
:root {
  --bg-dark: #0f172a;
  --card-bg: #1e293b;
  --card-border: #334155;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary-blue: #2563eb;
  --accent-teal: #0d9488;
}

/* --- 2. تنسيق القسم --- */
.projects-section {
  background-color: #0f172a; /* نفس خلفية الـ Hero لدمج سلس */
  padding: 5rem 1.5rem;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
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
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: rgba(37, 99, 235, 0.2);
  z-index: -1;
}

.section-subtitle {
  color: #94a3b8;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* --- 4. الشبكة (Grid) --- */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
}

/* --- 5. البطاقة (Card Design) --- */
.project-card {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: #2563eb;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
}

/* منطقة الصورة */
.card-image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
  background-color: #0f172a;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

/* Overlay عند الهوفر */
.card-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.project-card:hover .card-overlay {
  opacity: 1;
}

.overlay-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.project-card:hover .overlay-btn {
  transform: translateY(0);
}

.overlay-btn:hover {
  background-color: #1d4ed8;
}

/* شارة النوع */
.project-type-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(15, 23, 42, 0.8);
  color: #e2e8f0;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

/* محتوى النص */
.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
  line-height: 1.4;
}

.featured-star {
  color: #fbbf24; /* Amber 400 */
  font-size: 1.2rem;
}

.project-desc {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* التقنيات (Tags) */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.tech-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #cbd5e1;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 500;
}

/* استخدام اللون القادم من الـ API كتلميح لوني */
.tech-tag:hover {
  border-color: var(--tech-color);
  color: white;
}

.tech-tag.more {
  background-color: transparent;
  border: 1px dashed #475569;
}

/* --- 6. الفوتر (View All) --- */
.section-footer {
  text-align: center;
  margin-top: 4rem;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.1rem;
  transition: gap 0.3s ease;
}

.view-all-link:hover {
  gap: 0.8rem;
  color: #60a5fa;
}

/* --- 7. حالات التحميل والخطأ --- */
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
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .section-title {
    font-size: 2rem;
  }
}
</style>
