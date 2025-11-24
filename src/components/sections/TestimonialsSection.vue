<script setup>
import { onMounted } from 'vue'
import { useTestimonialsStore } from '@/stores/testimonialsStore'

const testimonialsStore = useTestimonialsStore()

onMounted(() => {
  testimonialsStore.fetchActiveTestimonials()
})

// Helper to generate star array [true, true, true, false, false]
const getStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => i < rating)
}
</script>

<template>
  <section id="testimonials" class="testimonials-section">
    <div class="container">

      <div class="section-header">
        <h2 class="title">Client <span class="highlight">Feedback</span></h2>
        <p class="subtitle">Endorsements from clients and colleagues I've collaborated with.</p>
      </div>

      <div v-if="testimonialsStore.isLoading" class="state-container">
        <div class="loader"></div>
      </div>

      <div v-else-if="testimonialsStore.error" class="state-container">
        <p class="error-text">{{ testimonialsStore.error }}</p>
        <button class="retry-btn" @click="testimonialsStore.fetchActiveTestimonials()">Retry</button>
      </div>

      <div v-else-if="testimonialsStore.hasData" class="testimonials-grid">
        <div
          v-for="item in testimonialsStore.testimonials"
          :key="item.id"
          class="testimonial-card"
        >
          <div class="card-top">
            <div class="quote-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
              </svg>
            </div>
            <div class="rating">
              <span
                v-for="(isFilled, idx) in getStars(item.rating)"
                :key="idx"
                class="star"
                :class="{ filled: isFilled }"
              >★</span>
            </div>
          </div>

          <p class="testimonial-text">
            "{{ item.testimonialText }}"
          </p>

          <div class="client-info">
            <div class="avatar-wrapper">
              <img
                v-if="item.clientImageUrl"
                :src="item.clientImageUrl"
                :alt="item.clientName"
                class="client-avatar"
              />
              <div v-else class="avatar-placeholder">
                {{ item.clientName ? item.clientName.charAt(0).toUpperCase() : '?' }}
              </div>
            </div>

            <div class="client-details">
              <h4 class="client-name">{{ item.clientName }}</h4>
              <p class="client-role">
                {{ item.clientPosition }}
                <span v-if="item.clientCompany" class="company">
                   @ {{ item.clientCompany }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="state-container">
        <p class="empty-text">No testimonials available to display.</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- Layout --- */
.testimonials-section {
  background-color: var(--bg-dark);
  padding: 6rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* --- Header --- */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
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

/* --- Grid --- */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

/* --- Card Design --- */
.testimonial-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  height: 100%;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.3);
  border-color: var(--primary-blue);
}

/* Top: Icon & Stars */
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.quote-icon {
  color: var(--primary-blue);
  opacity: 0.8;
}

.rating {
  display: flex;
  gap: 2px;
}

.star {
  color: var(--border-color); /* Empty star color */
  font-size: 1rem;
}

.star.filled {
  color: #f59e0b; /* Amber-500 for filled stars */
}

/* Body */
.testimonial-text {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-style: italic;
  flex-grow: 1; /* Pushes footer down */
}

/* Footer: Client */
.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.client-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary-blue);
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--bg-dark);
  border: 1px solid var(--border-color);
  color: var(--primary-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.client-details {
  display: flex;
  flex-direction: column;
}

.client-name {
  color: var(--text-main);
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
}

.client-role {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.company {
  color: var(--primary-blue);
  font-weight: 500;
}

/* --- States --- */
.state-container {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid var(--bg-card);
  border-top-color: var(--primary-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.retry-btn {
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;
  background: transparent;
  border: 1px solid var(--primary-blue);
  color: var(--primary-blue);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-btn:hover {
  background: var(--primary-blue);
  color: #fff;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* --- Mobile --- */
@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 2rem;
  }
}
</style>
