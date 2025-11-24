<script setup>
import { onMounted } from 'vue'
import { useEducationStore } from '@/stores/educationStore'

const educationStore = useEducationStore()

// Fetch data on mount
onMounted(() => {
  educationStore.fetchActiveEducations()
})

// Format Date (Arabic Locale based on your existing code)
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'short'
  })
}

const getYearRange = (start, end) => {
  const s = formatDate(start)
  const e = end ? formatDate(end) : 'Present'
  return `${s} - ${e}`
}
</script>

<template>
  <section id="education" class="education-section">
    <div class="container">

      <div class="section-header">
        <h2 class="title">Education & <span class="highlight">Qualifications</span></h2>
        <p class="subtitle">My academic foundation and continuous learning path.</p>
      </div>

      <div v-if="educationStore.isLoading" class="state-container">
        <div class="loader"></div>
      </div>

      <div v-else-if="educationStore.error" class="state-container">
        <p class="error-text">{{ educationStore.error }}</p>
        <button class="retry-btn" @click="educationStore.fetchActiveEducations()">Retry</button>
      </div>

      <div v-else-if="educationStore.hasData" class="timeline">
        <div class="timeline-line"></div>

        <div
          v-for="(edu, index) in educationStore.educations"
          :key="edu.id"
          class="timeline-item"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <div class="timeline-dot"></div>

          <div class="timeline-content">
            <div class="card-header">
              <div class="institution-details">
                <h3 class="degree">{{ edu.degree }}</h3>
                <span class="institution">{{ edu.institutionName }}</span>
              </div>
              <div class="meta-badge">
                {{ getYearRange(edu.startDate, edu.endDate) }}
              </div>
            </div>

            <div class="card-body">
              <p class="field">{{ edu.fieldOfStudy }}</p>

              <div v-if="edu.grade" class="grade-container">
                <span class="grade-label">Grade:</span>
                <span class="grade-value">{{ edu.grade }}</span>
              </div>

              <p v-if="edu.description" class="description">
                {{ edu.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="state-container">
        <p class="empty-text">No education history details available yet.</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- Layout & Spacing --- */
.education-section {
  background-color: var(--bg-dark);
  padding: 6rem 1.5rem;
  min-height: 60vh;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

/* --- Typography & Headers --- */
.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.highlight {
  color: var(--primary-blue);
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* --- Timeline Structure --- */
.timeline {
  position: relative;
  padding: 1rem 0;
}

/* The Vertical Line */
.timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(37, 99, 235, 0) 0%,
    var(--primary-blue) 15%,
    var(--primary-blue) 85%,
    rgba(37, 99, 235, 0) 100%
  );
}

.timeline-item {
  position: relative;
  padding-left: 3rem; /* Space for line and dot */
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease forwards;
  animation-delay: var(--delay);
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* The Dot */
.timeline-dot {
  position: absolute;
  left: -6px; /* Center on 2px line (width 14px / 2 - 1px) */
  top: 24px;
  width: 14px;
  height: 14px;
  background-color: var(--bg-dark);
  border: 2px solid var(--primary-blue);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
  z-index: 2;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-dot {
  background-color: var(--primary-blue);
  box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.3);
}

/* --- Card Design --- */
.timeline-content {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  position: relative;
}

.timeline-item:hover .timeline-content {
  transform: translateY(-4px);
  border-color: var(--primary-blue);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.degree {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 0.25rem 0;
}

.institution {
  font-size: 0.95rem;
  color: var(--primary-blue);
  font-weight: 500;
  display: block;
}

.meta-badge {
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--primary-blue);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid rgba(37, 99, 235, 0.2);
}

.field {
  color: var(--text-main);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.description {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
}

.grade-container {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.25rem 0.75rem;
  background-color: rgba(13, 148, 136, 0.1); /* Accent Teal background */
  border-radius: 8px;
  border: 1px solid rgba(13, 148, 136, 0.2);
}

.grade-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.grade-value {
  font-weight: 700;
  color: var(--accent-teal);
}

/* --- Loading & Error States --- */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--text-muted);
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid var(--bg-card);
  border-top-color: var(--primary-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.6rem 1.5rem;
  background-color: var(--bg-card);
  border: 1px solid var(--primary-blue);
  color: var(--primary-blue);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background-color: var(--primary-blue);
  color: #fff;
}

/* --- Animations --- */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- Mobile Responsiveness --- */
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .meta-badge {
    margin-top: 0.5rem;
  }

  .timeline-item {
    padding-left: 2rem;
  }

  .timeline-dot {
    width: 12px;
    height: 12px;
    left: -5px;
  }
}
</style>
