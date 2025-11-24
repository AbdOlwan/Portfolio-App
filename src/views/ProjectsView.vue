<script setup>
import { onMounted } from 'vue';
import { useProjectsStore } from '@/stores/projectsStore';
import { storeToRefs } from 'pinia';

const store = useProjectsStore();
// نستخدم projects هنا لجلب الكل، وليس featuredProjects
const { projects, isLoading, error } = storeToRefs(store);

onMounted(() => {
  store.fetchActiveProjects();
});
</script>

<template>
  <div class="projects-page">
    <div class="container">
      <header class="page-header">
        <h1 class="page-title">My <span class="highlight">Portfolio</span></h1>
        <p class="page-subtitle">A complete showcase of my technical journey.</p>
      </header>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading projects...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>⚠️ {{ error }}</p>
        <button @click="store.fetchActiveProjects()" class="retry-btn">Retry</button>
      </div>

      <div v-else-if="projects && projects.length > 0" class="projects-grid">
        <article v-for="project in projects" :key="project.id" class="project-card">
          <div class="card-image-wrapper">
            <img :src="project.thumbnailUrl" :alt="project.title" class="project-image" loading="lazy" />
            <div class="card-overlay">
              <router-link :to="{ name: 'project-details', params: { id: project.id }}" class="overlay-btn">
                <span>👁️</span> Details
              </router-link>
            </div>
            <span class="project-type-badge">{{ project.projectType }}</span>
          </div>

          <div class="card-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.shortDescription }}</p>
            <div class="tech-stack">
              <span v-for="tech in project.technologies" :key="tech.id" class="tech-tag" :style="{ '--tech-color': tech.color || '#64748b' }">
                {{ tech.name }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
         <p>No projects found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* نفس الستايل المستخدم في HomeView للحفاظ على التناسق */
.projects-page {
  padding-top: 8rem; /* مسافة عشان الهيدر الثابت */
  padding-bottom: 5rem;
  background-color: var(--bg-dark);
  min-height: 100vh;
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.page-header { text-align: center; margin-bottom: 4rem; }
.page-title { font-size: 3rem; font-weight: 700; color: #f8fafc; }
.highlight { color: #2563eb; }
.page-subtitle { color: #94a3b8; margin-top: 1rem; }

/* Grid & Cards Styling (مقتبس من ProjectsSection) */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}
.project-card {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.project-card:hover { transform: translateY(-5px); border-color: #2563eb; }
.card-image-wrapper { position: relative; height: 200px; overflow: hidden; }
.project-image { width: 100%; height: 100%; object-fit: cover; }
.card-overlay {
  position: absolute; inset: 0; background: rgba(15, 23, 42, 0.8);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
}
.project-card:hover .card-overlay { opacity: 1; }
.overlay-btn {
  background: #2563eb; color: white; padding: 0.5rem 1.5rem;
  border-radius: 20px; text-decoration: none; font-weight: bold;
}
.project-type-badge {
  position: absolute; top: 10px; right: 10px;
  background: rgba(0,0,0,0.7); color: white;
  padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;
}
.card-content { padding: 1.5rem; }
.project-title { color: white; margin: 0 0 0.5rem 0; }
.project-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem; }
.tech-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tech-tag {
  background: rgba(255,255,255,0.1); color: #cbd5e1;
  padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.75rem;
}
.tech-tag:hover { border: 1px solid var(--tech-color); color: white; }
.loading-state, .error-state { text-align: center; color: white; padding: 2rem; }
</style>
