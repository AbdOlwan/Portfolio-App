<script setup>
import { onMounted } from 'vue';
import { useCertificationsStore } from '@/stores/certificationsStore'; //
import { storeToRefs } from 'pinia';

// ربط الـ Store
const store = useCertificationsStore();
const { certifications, isLoading, error, hasData } = storeToRefs(store); //

// جلب البيانات عند التحميل
onMounted(() => {
  store.fetchActiveCertifications(); //
});

// تنسيق التاريخ (Month Year)
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
};
</script>

<template>
  <section id="certifications" class="cert-section">
    <div class="container">

      <div class="section-header">
        <h2 class="section-title">Professional <span class="highlight">Certifications</span></h2>
        <p class="section-subtitle">
          Validated expertise and industry-recognized credentials.
        </p>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Verifying Credentials...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>⚠️ {{ error }}</p>
        <button @click="store.fetchActiveCertifications()" class="retry-btn">Retry</button>
      </div>

      <div v-else-if="hasData" class="cert-grid">
        <div
          v-for="cert in certifications"
          :key="cert.id"
          class="cert-card"
        >
          <div class="cert-badge-wrapper">
            <img
              v-if="cert.badgeUrl"
              :src="cert.badgeUrl"
              :alt="cert.name"
              class="cert-badge-img"
              loading="lazy"
            />
            <div v-else class="cert-badge-placeholder">
              <span>{{ cert.issuingOrganization ? cert.issuingOrganization.charAt(0) : 'C' }}</span>
            </div>
          </div>

          <div class="cert-content">
            <div class="cert-header">
              <h3 class="cert-name">{{ cert.name }}</h3>
              <span v-if="cert.issuingOrganization" class="cert-org">
                {{ cert.issuingOrganization }}
              </span>
            </div>

            <div class="cert-meta">
              <div class="meta-row">
                <span class="meta-label">Issued:</span>
                <span class="meta-value">{{ formatDate(cert.issueDate) }}</span>
              </div>

              <div v-if="cert.expiryDate" class="meta-row">
                <span class="meta-label">Expires:</span>
                <span class="meta-value">{{ formatDate(cert.expiryDate) }}</span>
              </div>
            </div>

            <div v-if="cert.credentialId" class="credential-box">
              <span class="cred-label">ID:</span>
              <code class="cred-value">{{ cert.credentialId }}</code>
            </div>

            <a
              v-if="cert.certificateUrl"
              :href="cert.certificateUrl"
              target="_blank"
              class="verify-link"
            >
              View Certificate <span class="arrow">↗</span>
            </a>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>No certifications listed yet.</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- 1. المتغيرات (Design System) --- */
:root {
  --bg-dark: #0f172a;
  --card-bg: #1e293b;
  --border-color: #334155;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary-blue: #2563eb;
  --primary-hover: #1d4ed8;
}

/* --- 2. تنسيق القسم --- */
.cert-section {
  background-color: #0f172a;
  padding: 5rem 1.5rem;
  color: #f8fafc;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  max-width: 1100px;
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

/* --- 4. شبكة الشهادات --- */
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

/* --- 5. البطاقة (Credential Card) --- */
.cert-card {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cert-card:hover {
  border-color: #475569;
  transform: translateY(-4px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
}

/* الشارة / اللوجو */
.cert-badge-wrapper {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
}

.cert-badge-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.cert-badge-placeholder {
  width: 100%;
  height: 100%;
  background-color: #334155;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #94a3b8;
}

/* المحتوى */
.cert-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cert-header {
  margin-bottom: 1rem;
}

.cert-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #f8fafc;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.cert-org {
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
}

/* البيانات الوصفية */
.cert-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
}

.meta-row {
  display: flex;
  gap: 0.4rem;
}

.meta-label {
  color: #64748b;
}

.meta-value {
  color: #cbd5e1;
}

/* ID الكود الهندسي */
.credential-box {
  margin-bottom: 1rem;
  background-color: rgba(15, 23, 42, 0.6);
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px dashed #334155;
  align-self: flex-start;
}

.cred-label {
  color: #64748b;
  font-weight: 600;
}

.cred-value {
  font-family: 'Fira Code', monospace; /* أو Monospace عادي */
  color: #2563eb;
}

/* الرابط */
.verify-link {
  font-size: 0.9rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  transition: gap 0.2s;
}

.verify-link:hover {
  color: #60a5fa;
  gap: 0.6rem;
}

.arrow {
  font-size: 1.1rem;
}

/* --- 6. الحالات --- */
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

/* --- 7. التجاوب --- */
@media (max-width: 640px) {
  .cert-grid {
    grid-template-columns: 1fr;
  }

  .cert-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .cert-badge-wrapper {
    width: 48px;
    height: 48px;
  }
}
</style>
