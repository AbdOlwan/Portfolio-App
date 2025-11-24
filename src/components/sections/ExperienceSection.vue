<script setup>
import { onMounted } from 'vue';
import { useExperiencesStore } from '@/stores/experiencesStore'; //
import { storeToRefs } from 'pinia';

const store = useExperiencesStore();
const { experiences, isLoading, error, hasData } = storeToRefs(store); //

onMounted(() => {
  store.fetchActiveExperiences(); //
});

// دالة لتنسيق التاريخ (مثال: Jan 2022 - Present)
const formatDateRange = (startDate, endDate, isCurrent) => {
  const options = { year: 'numeric', month: 'short' };
  const start = new Date(startDate).toLocaleDateString('en-US', options);

  if (isCurrent || !endDate) {
    return `${start} — Present`;
  }

  const end = new Date(endDate).toLocaleDateString('en-US', options);
  return `${start} — ${end}`;
};
</script>

<template>
  <section id="experience" class="experience-section">
    <div class="container">

      <div class="section-header">
        <h2 class="section-title">Professional <span class="highlight">Journey</span></h2>
        <p class="section-subtitle">
          Building scalable software and solving complex engineering problems.
        </p>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading Career History...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>⚠️ {{ error }}</p>
        <button @click="store.fetchActiveExperiences()" class="retry-btn">Retry</button>
      </div>

      <div v-else-if="hasData" class="timeline-wrapper">
        <div class="timeline-line"></div>

        <div
          v-for="exp in experiences"
          :key="exp.id"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <div class="marker-dot" :class="{ 'current-pulse': exp.isCurrentJob }"></div>
            <div class="date-label">
              <code>{{ formatDateRange(exp.startDate, exp.endDate, exp.isCurrentJob) }}</code>
            </div>
          </div>

          <div class="experience-card">
            <div class="card-header">
              <div class="company-logo-box">
                <img
                  v-if="exp.companyLogoUrl"
                  :src="exp.companyLogoUrl"
                  :alt="exp.companyName"
                  class="logo-img"
                />
                <div v-else class="logo-placeholder">
                  {{ exp.companyName.charAt(0) }}
                </div>
              </div>

              <div class="header-info">
                <h3 class="role-title">{{ exp.position }}</h3>
                <div class="company-meta">
                  <span class="company-name">@ {{ exp.companyName }}</span>
                  <span class="separator">•</span>
                  <span class="location">{{ exp.location }}</span>
                  <span class="separator">•</span>
                  <span class="type-badge">{{ exp.employmentType }}</span>
                </div>
              </div>
            </div>

            <div class="card-body">
              <p class="description">
                {{ exp.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>No experience records found.</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- 1. المتغيرات (System Design) --- */
:root {
  --bg-dark: #0f172a;
  --card-bg: #1e293b;
  --border-color: #334155;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary-blue: #2563eb;
  --accent-teal: #0d9488;
}

/* --- 2. تنسيق القسم --- */
.experience-section {
  background-color: #0f172a;
  padding: 5rem 1.5rem;
  color: #f8fafc;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  max-width: 1000px;
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
}

/* --- 4. هيكل الـ Timeline (Log Style) --- */
.timeline-wrapper {
  position: relative;
  padding-left: 2rem; /* مساحة للخط الجانبي في الموبايل، سنعدلها للديسك توب */
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* الخط الرأسي */
.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 8px; /* محاذاة مع النقطة */
  width: 2px;
  background: linear-gradient(180deg, #2563eb 0%, rgba(37, 99, 235, 0.1) 100%);
}

.timeline-item {
  position: relative;
  padding-left: 2rem;
}

/* --- 5. العلامة والتاريخ (Marker) --- */
.timeline-marker {
  position: absolute;
  left: 0;
  top: 0;
}

.marker-dot {
  width: 18px;
  height: 18px;
  background-color: #0f172a;
  border: 3px solid #2563eb;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 24px; /* محاذاة مع عنوان البطاقة */
  z-index: 2;
  transition: all 0.3s ease;
}

/* تأثير النبض للوظيفة الحالية */
.current-pulse {
  background-color: #2563eb;
  box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
  animation: pulse-blue 2s infinite;
}

@keyframes pulse-blue {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
}

.date-label {
  display: none; /* نخفيه في الموبايل ونظهره في الديسك توب */
  position: absolute;
  right: 30px; /* يمين النقطة (للنسخة الديسك توب سنغيره) */
  top: 22px;
  white-space: nowrap;
  color: #94a3b8;
  font-size: 0.9rem;
}

.date-label code {
  font-family: 'Fira Code', monospace;
  background: rgba(15, 23, 42, 0.5);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #334155;
}

/* --- 6. بطاقة الخبرة --- */
.experience-card {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.experience-card:hover {
  border-color: #2563eb;
  transform: translateX(5px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* الشعار */
.company-logo-box {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  background-color: white; /* لضمان ظهور اللوجو الشفاف */
  padding: 2px;
}

.logo-placeholder {
  width: 100%;
  height: 100%;
  background-color: #334155;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.2rem;
}

/* تفاصيل العنوان */
.header-info {
  flex: 1;
}

.role-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 0.25rem 0;
}

.company-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #94a3b8;
}

.company-name {
  color: #2563eb;
  font-weight: 600;
}

.separator {
  color: #475569;
}

.type-badge {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* الوصف */
.card-body .description {
  color: #cbd5e1;
  line-height: 1.7;
  font-size: 1rem;
  white-space: pre-line; /* يحافظ على الأسطر الجديدة */
}

/* --- 7. الحالات --- */
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

@keyframes spin { to { transform: rotate(360deg); } }

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* --- 8. التجاوب (Media Queries) --- */

/* تنسيق الديسك توب (Log Style) */
@media (min-width: 768px) {
  .timeline-wrapper {
    padding-left: 0;
    margin-left: 160px; /* مساحة للتاريخ على اليسار */
  }

  .timeline-line {
    left: -21px; /* مكان الخط بالنسبة لل wrapper */
  }

  .timeline-item {
    padding-left: 0;
  }

  .marker-dot {
    left: -30px; /* محاذاة النقطة مع الخط */
  }

  .date-label {
    display: block;
    right: 100%; /* يظهر يسار النقطة */
    top: 24px;
    margin-right: 50px; /* مسافة بين التاريخ والنقطة */
    text-align: right;
  }
}

@media (max-width: 767px) {
  /* في الموبايل، نعرض التاريخ فوق البطاقة بدلاً من الجانب */
  .card-header {
    flex-direction: column;
  }

  .company-logo-box {
    margin-bottom: 0.5rem;
  }

  /* إظهار التاريخ داخل البطاقة في الموبايل (يمكن إضافته في HTML مع class mobile-only) */
  .timeline-marker .date-label {
    display: none; /* إخفاء التاريخ الجانبي في الموبايل */
  }
}
</style>
