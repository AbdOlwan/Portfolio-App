<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'; // لاستخراج الـ ID من الرابط
import { useProjectsStore } from '@/stores/projectsStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useProjectsStore();
const { selectedProject, isLoading, error } = storeToRefs(store);

// دالة لجلب البيانات
const loadProject = () => {
  const projectId = route.params.id;
  if (projectId) {
    store.fetchProjectById(projectId);
  }
};

onMounted(() => {
  loadProject();
});

// إعادة التحميل إذا تغير الـ ID في الرابط دون تغيير الصفحة
watch(() => route.params.id, () => {
  loadProject();
});
</script>

<template>
  <div class="project-details-page">

    <div v-if="isLoading" class="state-container">
      <div class="spinner"></div>
      <p>Loading project details...</p>
    </div>

    <div v-else-if="error" class="state-container error">
      <p>⚠️ {{ error }}</p>
      <router-link to="/projects" class="back-link">Back to Projects</router-link>
    </div>

    <div v-else-if="selectedProject" class="container">
      <div class="nav-back">
        <router-link to="/projects" class="back-link">← All Projects</router-link>
      </div>

      <header class="project-header">
        <span class="badge">{{ selectedProject.projectType }}</span>
        <h1 class="title">{{ selectedProject.title }}</h1>
        <div class="meta">
          <span>📅 {{ new Date(selectedProject.startDate).getFullYear() }}</span>
          <span v-if="selectedProject.isFeatured" class="star">★ Featured</span>
        </div>
      </header>

      <div class="main-visual">
        <img :src="selectedProject.thumbnailUrl" :alt="selectedProject.title" />
      </div>

      <div class="content-grid">
        <main class="main-info">
          <h3>Overview</h3>
          <p class="description">{{ selectedProject.fullDescription }}</p>

          <div v-if="selectedProject.projectImages?.length" class="gallery">
             <h3>Gallery</h3>
             <div class="gallery-grid">
               <img v-for="img in selectedProject.projectImages"
                    :key="img.id"
                    :src="img.imageUrl"
                    :alt="img.caption"
                    class="gallery-img" />
             </div>
          </div>
        </main>

        <aside class="sidebar">
          <div class="links-card">
            <a :href="selectedProject.githubUrl" target="_blank" class="btn github">
              GitHub Repository
            </a>
            <a v-if="selectedProject.liveDemoUrl" :href="selectedProject.liveDemoUrl" target="_blank" class="btn live">
              Live Demo
            </a>
          </div>

          <div class="tech-card">
            <h3>Technologies</h3>
            <div class="tags">
              <span v-for="tech in selectedProject.technologies"
                    :key="tech.id"
                    class="tag"
                    :style="{ borderColor: tech.color }">
                {{ tech.name }}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-details-page {
  padding-top: 6rem;
  background-color: var(--bg-dark);
  color: #f8fafc;
  min-height: 100vh;
}
.container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
.state-container { padding: 4rem; text-align: center; color: #94a3b8; }

.nav-back { margin-bottom: 2rem; }
.back-link { color: #2563eb; text-decoration: none; font-weight: 600; }
.back-link:hover { text-decoration: underline; }

.project-header { margin-bottom: 2rem; }
.badge { background: #2563eb; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.8rem; }
.title { font-size: 2.5rem; margin: 1rem 0; }
.meta { color: #94a3b8; display: flex; gap: 1rem; }
.star { color: #fbbf24; }

.main-visual img { width: 100%; border-radius: 12px; border: 1px solid #334155; }

.content-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; margin-top: 3rem; }

.description { line-height: 1.8; color: #cbd5e1; white-space: pre-line; }

/* Sidebar */
.links-card, .tech-card {
  background: #1e293b; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;
  border: 1px solid #334155;
}
.btn {
  display: block; text-align: center; padding: 0.75rem; border-radius: 8px;
  text-decoration: none; font-weight: 600; margin-bottom: 0.5rem; transition: 0.3s;
}
.btn.github { background: #334155; color: white; }
.btn.live { background: #2563eb; color: white; }
.btn:hover { opacity: 0.9; }

.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag {
  background: rgba(255,255,255,0.05); padding: 0.25rem 0.75rem;
  border-radius: 20px; font-size: 0.85rem; border: 1px solid transparent;
}

/* Gallery */
.gallery { margin-top: 2rem; }
.gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem; }
.gallery-img { width: 100%; border-radius: 8px; }

@media (max-width: 768px) {
  .content-grid { grid-template-columns: 1fr; }
}
</style>
