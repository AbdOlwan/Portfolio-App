<script setup>
import { ref, onMounted } from 'vue';
import { useCertificationsStore } from '@/stores/certificationsStore';
import { storeToRefs } from 'pinia';

// ربط الـ Store
const store = useCertificationsStore();
const { certifications, isLoading, error, hasData } = storeToRefs(store);

// Modal state
const selectedCert = ref(null);
const showModal = ref(false);

// جلب البيانات عند التحميل
onMounted(() => {
  store.fetchActiveCertifications();
});

// تنسيق التاريخ
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
};

// --- دوال فتح الروابط ---

// دالة مساعدة لفتح الروابط الخارجية بأمان
const openExternalLink = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

// التعامل مع ضغط الكارت بالكامل
const handleCardClick = (cert) => {
  // لو ضغط على الكارت ومفيش زرار محدد، نفتح الشهادة لو موجودة، أو المودال
  if (cert.certificateUrl) {
    openExternalLink(cert.certificateUrl);
  } else {
    openCertModal(cert);
  }
};

// التعامل مع ضغط الشارة (اللوجو)
const handleBadgeClick = (cert) => {
  if (cert.badgeUrl) {
    openExternalLink(cert.badgeUrl);
  }
};

// --- إدارة الـ Modal ---

const openCertModal = (cert) => {
  selectedCert.value = cert;
  showModal.value = true;
  document.body.style.overflow = 'hidden';
};

const closeCertModal = () => {
  showModal.value = false;
  selectedCert.value = null;
  document.body.style.overflow = '';
};

// --- دوال مساعدة للتاريخ ---

const isExpired = (expiryDate) => {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
};

const getDaysRemaining = (expiryDate) => {
  if (!expiryDate) return null;
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diff = expiry - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
};
</script>

<template>
  <section id="certifications" class="cert-section">
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>

    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <div class="badge-wrapper">
          <span class="section-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Verified Credentials
          </span>
        </div>
        <h2 class="section-title">
          Professional <span class="highlight">Certifications</span>
        </h2>
        <p class="section-subtitle">
          Industry-recognized certifications that validate my expertise and commitment to excellence
        </p>
      </div>

      <div v-if="isLoading" class="loading-state" data-aos="fade-up">
        <div class="spinner-wrapper">
          <div class="spinner"></div>
          <div class="spinner-glow"></div>
        </div>
        <p>Verifying Credentials...</p>
      </div>

      <div v-else-if="error" class="error-state" data-aos="fade-up">
        <div class="error-icon">⚠️</div>
        <p class="error-message">{{ error }}</p>
        <button @click="store.fetchActiveCertifications()" class="retry-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
          Retry
        </button>
      </div>

      <div v-else-if="hasData" class="cert-grid">
        <div
          v-for="(cert, index) in certifications"
          :key="cert.id"
          class="cert-card"
          :class="{ 'has-link': cert.certificateUrl }"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
          @click="handleCardClick(cert)"
        >
          <div class="verified-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>

          <div
            class="cert-badge-container"
            @click.stop="handleBadgeClick(cert)"
          >
            <div class="badge-glow"></div>

            <div
              class="cert-badge-wrapper"
              :class="{ 'clickable-badge': cert.badgeUrl }"
              :title="cert.badgeUrl ? 'View Badge Verification' : ''"
            >
              <img
                v-if="cert.badgeUrl"
                :src="cert.badgeUrl"
                :alt="cert.name"
                class="cert-badge-img"
                loading="lazy"
                @error="$event.target.style.display='none'"
              />
              <div v-else class="cert-badge-placeholder">
                <span>{{ cert.issuingOrganization ? cert.issuingOrganization.charAt(0) : 'C' }}</span>
              </div>

              <div v-if="cert.badgeUrl" class="badge-click-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="cert-content">
            <h3 class="cert-name">{{ cert.name }}</h3>

            <div v-if="cert.issuingOrganization" class="cert-org">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              {{ cert.issuingOrganization }}
            </div>

            <div class="cert-dates">
              <div class="date-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{{ formatDate(cert.issueDate) }}</span>
              </div>
              <div v-if="cert.expiryDate" class="date-item expiry" :class="{ 'expired': isExpired(cert.expiryDate) }">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span v-if="isExpired(cert.expiryDate)">Expired</span>
                <span v-else-if="getDaysRemaining(cert.expiryDate) < 90">
                  Expires {{ formatDate(cert.expiryDate) }}
                </span>
                <span v-else>Valid until {{ formatDate(cert.expiryDate) }}</span>
              </div>
            </div>

            <div v-if="cert.credentialId" class="credential-id">
              <span class="id-label">ID:</span>
              <code>{{ cert.credentialId }}</code>
            </div>

            <div class="card-footer">
              <a
                v-if="cert.certificateUrl"
                :href="cert.certificateUrl"
                target="_blank"
                class="view-cert-btn"
                @click.stop
              >
                <span>View Certificate</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>

              <button
                v-else
                class="view-details-link"
                @click.stop="openCertModal(cert)"
              >
                View Details
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                   <circle cx="12" cy="12" r="10"></circle>
                   <line x1="12" y1="16" x2="12" y2="12"></line>
                   <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
          </div>

          <div class="card-glow"></div>
        </div>
      </div>

      <div v-else class="empty-state" data-aos="fade-up">
        <div class="empty-icon">📜</div>
        <p>No certifications listed yet.</p>
      </div>
    </div>

    <Transition name="modal">
      <div v-if="showModal && selectedCert" class="modal-overlay" @click="closeCertModal">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeCertModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div class="modal-content">
            <div class="modal-badge">
              <div
                class="modal-badge-wrapper"
                :class="{ 'clickable-badge': selectedCert.badgeUrl }"
                @click="selectedCert.badgeUrl && openExternalLink(selectedCert.badgeUrl)"
                :title="selectedCert.badgeUrl ? 'Open Badge Link' : ''"
              >
                <img
                  v-if="selectedCert.badgeUrl"
                  :src="selectedCert.badgeUrl"
                  :alt="selectedCert.name"
                  class="modal-badge-img"
                />
                <div v-else class="modal-badge-placeholder">
                  <span>{{ selectedCert.issuingOrganization ? selectedCert.issuingOrganization.charAt(0) : 'C' }}</span>
                </div>
              </div>
              </div>

            <div class="modal-details">
              <h3 class="modal-title">{{ selectedCert.name }}</h3>
              <div v-if="selectedCert.issuingOrganization" class="modal-org">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                {{ selectedCert.issuingOrganization }}
              </div>

               <div class="modal-info-grid">
                  <div class="info-box">
                    <div class="info-label">Issue Date</div>
                    <div class="info-value">{{ formatDate(selectedCert.issueDate) }}</div>
                  </div>
                  <div v-if="selectedCert.expiryDate" class="info-box">
                    <div class="info-label">Expiry Date</div>
                    <div class="info-value" :class="{ 'expired-text': isExpired(selectedCert.expiryDate) }">
                      {{ formatDate(selectedCert.expiryDate) }}
                    </div>
                  </div>
                   <div v-if="selectedCert.credentialId" class="info-box full-width">
                    <div class="info-label">Credential ID</div>
                    <div class="info-value credential">
                      <code>{{ selectedCert.credentialId }}</code>
                    </div>
                  </div>
               </div>

              <a
                v-if="selectedCert.certificateUrl"
                :href="selectedCert.certificateUrl"
                target="_blank"
                class="modal-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
/* Variables */
:root {
  --bg-dark: #0a0e1a;
  --bg-card: #111827;
  --bg-card-hover: #1a2235;
  --border-color: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --primary: #3b82f6;
  --primary-light: #60a5fa;
  --primary-dark: #2563eb;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}

/* Section */
.cert-section {
  position: relative;
  background: linear-gradient(180deg, #0a0e1a 0%, #0f1729 100%);
  padding: 8rem 1.5rem;
  color: var(--text-primary);
  overflow: hidden;
}

/* Background Gradients */
.bg-gradient-1,
.bg-gradient-2 {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.1;
  pointer-events: none;
}
.bg-gradient-1 {
  top: -10%; right: -5%; width: 600px; height: 600px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
}
.bg-gradient-2 {
  bottom: -10%; left: -5%; width: 500px; height: 500px;
  background: radial-gradient(circle, var(--success) 0%, transparent 70%);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Header */
.section-header { text-align: center; margin-bottom: 5rem; }
.badge-wrapper { margin-bottom: 1.5rem; }
.section-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 1.25rem; background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 50px;
  color: var(--primary-light); font-size: 0.875rem; font-weight: 600;
}
.section-badge svg { stroke-width: 2; }
.section-title {
  font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.highlight {
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--success) 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.section-subtitle {
  font-size: 1.125rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.7;
}

/* Grid */
.cert-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem;
}

/* Card */
.cert-card {
  position: relative; background: var(--bg-card); border: 1px solid var(--border-color);
  border-radius: 20px; padding: 2rem; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden; display: flex; flex-direction: column;
}

/* المؤشر يكون pointer إذا كان فيه رابط للشهادة */
.cert-card.has-link { cursor: pointer; }

.cert-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--primary) 0%, var(--success) 100%);
  transform: scaleX(0); transition: transform 0.4s ease;
}
.cert-card:hover {
  transform: translateY(-8px); border-color: var(--primary);
  background: var(--bg-card-hover); box-shadow: 0 20px 60px -15px rgba(59, 130, 246, 0.3);
}
.cert-card:hover::before { transform: scaleX(1); }

/* Verified Badge */
.verified-badge {
  position: absolute; top: 1rem; right: 1rem; width: 32px; height: 32px;
  background: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); z-index: 2;
}

/* Badge Container */
.cert-badge-container {
  position: relative; width: 100px; height: 100px; margin: 0 auto 1.5rem; flex-shrink: 0;
}
.badge-glow {
  position: absolute; inset: -10px; background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
  border-radius: 50%; animation: pulse 3s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.cert-badge-wrapper {
  position: relative; width: 100%; height: 100%; background: var(--bg-dark);
  border: 2px solid var(--border-color); border-radius: 20px; display: flex; align-items: center; justify-content: center;
  overflow: hidden; transition: all 0.3s ease;
}
.cert-card:hover .cert-badge-wrapper { border-color: var(--primary); transform: scale(1.05); }

/* Clickable Badge */
.clickable-badge { cursor: pointer; position: relative; }
.clickable-badge:hover {
  border-color: var(--primary); box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); transform: scale(1.1); z-index: 10;
}
.badge-click-hint {
  position: absolute; bottom: 4px; right: 4px; background: rgba(0, 0, 0, 0.7); color: #fff;
  border-radius: 6px; padding: 3px; display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
}
.clickable-badge:hover .badge-click-hint { opacity: 1; }

.cert-badge-img { width: 100%; height: 100%; object-fit: contain; padding: 1rem; }
.cert-badge-placeholder {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  font-size: 2rem; font-weight: 800; color: var(--primary);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
}

/* Content */
.cert-content { text-align: center; display: flex; flex-direction: column; flex-grow: 1; }
.cert-name {
  font-size: 1.25rem; font-weight: 700; color: var(--text-primary);
  margin-bottom: 0.75rem; line-height: 1.4; min-height: 2.8rem;
}
.cert-org {
  display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;
  color: var(--text-secondary); margin-bottom: 1.25rem; padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.03); border-radius: 8px; align-self: center;
}
.cert-org svg { stroke-width: 2; }
.cert-dates {
  display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;
}
.date-item {
  display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem;
  color: var(--text-muted); padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.03); border-radius: 8px;
}
.date-item svg { stroke-width: 2; }
.date-item.expiry { color: var(--warning); }
.date-item.expired { color: var(--danger); }
.credential-id {
  display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem;
  padding: 0.5rem 0.8rem; background: rgba(59, 130, 246, 0.05);
  border: 1px dashed var(--border-color); border-radius: 8px; margin-bottom: 1.25rem; align-self: center;
}
.id-label { color: var(--text-muted); font-weight: 600; }
.credential-id code { color: var(--primary-light); font-family: 'Fira Code', monospace; font-size: 0.85rem; }

/* === Card Footer & Buttons (New) === */
.card-footer {
  margin-top: auto; /* يضمن بقاء الزر في الأسفل */
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

/* تصميم زر فتح الشهادة */
.view-cert-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--primary-light);
  border: 1px solid rgba(37, 99, 235, 0.3);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 5; /* لضمان أنه قابل للنقر فوق طبقة الكارت */
  position: relative;
}

.view-cert-btn:hover {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.view-cert-btn svg {
  transition: transform 0.3s ease;
}

.view-cert-btn:hover svg {
  transform: translateX(3px) translateY(-3px); /* حركة السهم */
}

/* تصميم زر عرض التفاصيل (البديل) */
.view-details-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  z-index: 5;
}

.view-details-link:hover {
  color: var(--primary-light);
}

/* Card Glow */
.card-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
}
.cert-card:hover .card-glow { opacity: 1; }

/* ... (Loading State, Error State, Empty State styles remain same) ... */
.loading-state, .error-state, .empty-state { text-align: center; padding: 6rem 2rem; }
.spinner-wrapper {
  position: relative; width: 60px; height: 60px; margin: 0 auto 1.5rem;
}
.spinner {
  width: 60px; height: 60px; border: 3px solid rgba(59, 130, 246, 0.1);
  border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite;
}
.spinner-glow {
  position: absolute; inset: -10px; background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  border-radius: 50%; animation: pulse 2s ease-in-out infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.error-icon, .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
.retry-btn {
  display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem;
  background: var(--danger); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;
}

/* Modal Styles */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; padding: 2rem; z-index: 1000; overflow-y: auto;
}
.modal-container {
  position: relative; background: var(--bg-card); border: 1px solid var(--border-color);
  border-radius: 24px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
.modal-close {
  position: absolute; top: 1.5rem; right: 1.5rem; width: 40px; height: 40px;
  background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); border-radius: 50%;
  color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.3s ease; z-index: 10;
}
.modal-close:hover {
  background: var(--danger); border-color: var(--danger); color: white; transform: rotate(90deg);
}
.modal-content { padding: 3rem; }
.modal-badge { text-align: center; margin-bottom: 2rem; }
.modal-badge-wrapper {
  width: 140px; height: 140px; margin: 0 auto 1rem; background: var(--bg-dark);
  border: 3px solid var(--primary); border-radius: 24px; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}
.modal-badge-img { width: 100%; height: 100%; object-fit: contain; padding: 1.5rem; }
.modal-badge-placeholder {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  font-size: 3rem; font-weight: 800; color: var(--primary);
}
.modal-details { text-align: center; }
.modal-title {
  font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem; line-height: 1.3;
}
.modal-org {
  display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; color: var(--text-secondary);
  margin-bottom: 2rem; padding: 0.5rem 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 12px;
}
.modal-info-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem; text-align: left;
}
.info-box {
  padding: 1.25rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 12px;
}
.info-box.full-width { grid-column: 1 / -1; }
.info-label {
  font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;
  font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
}
.info-value { font-size: 1rem; color: var(--text-primary); font-weight: 600; }
.info-value.expired-text { color: var(--danger); }
.expired-badge {
  display: inline-block; margin-left: 0.5rem; padding: 0.25rem 0.5rem;
  background: var(--danger); color: white; border-radius: 6px; font-size: 0.75rem;
}
.info-value.credential { display: flex; align-items: center; gap: 0.5rem; }
.info-value code {
  flex: 1; font-family: 'Fira Code', monospace; color: var(--primary-light); font-size: 0.9rem;
  background: rgba(59, 130, 246, 0.1); padding: 0.5rem; border-radius: 6px; word-break: break-all;
}

/* Modal Button */
.modal-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.75rem; width: 100%;
  padding: 1rem 2rem; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 1rem;
  transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
.modal-btn:hover {
  transform: translateY(-2px); box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}
.modal-btn svg { stroke-width: 2; }

/* Transitions */
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-container, .modal-leave-active .modal-container { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.modal-enter-from .modal-container, .modal-leave-to .modal-container { opacity: 0; transform: scale(0.95) translateY(20px); }

@media (max-width: 768px) {
  .cert-section { padding: 5rem 1rem; }
  .cert-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .modal-info-grid { grid-template-columns: 1fr; }
  .info-box.full-width { grid-column: 1; }
}
</style>
