<script setup>
import { onMounted } from 'vue';
import { useAboutMeStore } from '@/stores/aboutMeStore'; //
import { storeToRefs } from 'pinia';

// ربط الـ Store
const store = useAboutMeStore();
const { aboutMe, isLoading } = storeToRefs(store); //

// جلب البيانات عند تحميل المكون
onMounted(() => {
  store.fetchAboutMe(); //
});

// التعامل مع زر الفيديو
const openVideo = () => {
  // نستخدم الحقل IntroVideoUrl من الـ DTO
  if (aboutMe.value?.introVideoUrl) {
    window.open(aboutMe.value.introVideoUrl, '_blank');
  }
};
</script>

<template>
  <section class="hero-section">
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <div class="container">

      <div v-if="isLoading" class="loading-state">
        <span>Loading Profile...</span>
      </div>

      <div v-else-if="aboutMe" class="hero-content">

        <div class="text-wrapper">
          <div class="availability-badge">
            Available for Remote & Relocation
          </div>

          <h1 class="hero-title">
            Hi, I'm <span class="highlight-text">{{ aboutMe.fullName }}</span>
          </h1>

          <h2 class="hero-subtitle">
            {{ aboutMe.title }}
          </h2>

          <p class="hero-bio">
            {{ aboutMe.bio }}
          </p>

          <div class="cta-group">
            <a href="#contact" class="btn btn-primary">Hire Me</a>

            <a v-if="aboutMe.cvFileUrl" :href="aboutMe.cvFileUrl" target="_blank" class="btn btn-outline">
              <span class="icon">📄</span> Download CV
            </a>

            <button v-if="aboutMe.introVideoUrl" @click="openVideo" class="btn btn-outline">
               <span class="icon">▶</span> Watch Intro
            </button>
          </div>

          <div class="contact-info-bar">
            <div class="info-item">
                <span class="status-dot"></span>
                {{ aboutMe.location }}
            </div>
            <div class="info-item">
                <span class="at-symbol">@</span>
                {{ aboutMe.email }}
            </div>
          </div>
        </div>

        <div class="image-wrapper">
            <div class="image-frame-back"></div>
            <div class="image-frame-front">
                <img
                    :src="aboutMe.profileImageUrl"
                    alt="Profile Picture"
                    class="profile-img"
                />
            </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- 1. المتغيرات العامة للتصميم --- */
:root {
  --bg-dark: #0f172a;       /* Slate 900 */
  --text-white: #f8fafc;
  --text-gray: #94a3b8;
  --primary-blue: #2563eb;  /* لون مميز */
  --accent-teal: #0d9488;   /* لون ثانوي */
  --font-main: 'Inter', sans-serif; /* يفضل استيراد هذا الخط في index.html */
}

/* --- 2. تنسيق القسم العام (Hero Section) --- */
.hero-section {
  position: relative;
  background-color: #0f172a; /* Fallback color */
  background-color: var(--bg-dark, #0f172a);
  color: white;
  min-height: 90vh; /* يملأ معظم الشاشة */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: sans-serif; /* استبدله بـ 'Inter' إذا قمت بتثبيته */
  padding: 2rem 1rem;
}

/* الأشكال الخلفية الضبابية (Modern Glow Effects) */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  z-index: 0;
}
.shape-1 {
  top: -10%;
  right: -10%;
  width: 400px;
  height: 400px;
  background-color: #2563eb;
}
.shape-2 {
  bottom: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background-color: #0d9488;
}

/* الحاوية الرئيسية */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1; /* فوق الخلفية */
}

/* حالة التحميل */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #94a3b8;
  font-size: 1.2rem;
}

/* --- 3. تنسيق المحتوى (Flexbox Layout) --- */
.hero-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

/* النصوص (اليسار) */
.text-wrapper {
  flex: 1;
  max-width: 600px;
}

.availability-badge {
  display: inline-block;
  background-color: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  color: #60a5fa;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: #f8fafc;
}

/* النص المتدرج للاسم */
.highlight-text {
  background: linear-gradient(to right, #60a5fa, #2dd4bf);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #cbd5e1;
  font-weight: 300;
  margin-bottom: 1.5rem;
}

.hero-bio {
  color: #94a3b8;
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 90%;
}

/* --- 4. الأزرار (CTA) --- */
.cta-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  border: 2px solid #2563eb;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}
.btn-primary:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
  transform: translateY(-2px);
}

.btn-outline {
  background-color: transparent;
  color: #cbd5e1;
  border: 1px solid #475569;
}
.btn-outline:hover {
  border-color: #94a3b8;
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}

.icon {
  font-size: 1.1rem;
}

/* --- 5. شريط المعلومات السفلي --- */
.contact-info-bar {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #64748b;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.status-dot {
  width: 8px;
  height: 8px;
  background-color: #22c55e; /* Green */
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
}

/* --- 6. تنسيق الصور (يمين) --- */
.image-wrapper {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding: 2rem;
}

/* الإطار الخلفي المائل */
.image-frame-back {
  position: absolute;
  top: 2rem;
  right: 0;
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #2563eb, #0d9488);
  border-radius: 20px;
  transform: rotate(6deg);
  opacity: 0.6;
  filter: blur(2px);
  z-index: 1;
}

/* الصورة الأمامية */
.image-frame-front {
  position: relative;
  width: 350px;
  height: 350px;
  background-color: #1e293b;
  border-radius: 20px;
  overflow: hidden;
  transform: rotate(-3deg);
  border: 1px solid #334155;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  z-index: 2;
  transition: transform 0.4s ease;
}

.image-frame-front:hover {
  transform: rotate(0deg) scale(1.02);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- 7. التجاوب مع الشاشات (Media Queries) --- */
@media (max-width: 1024px) {
  .hero-content {
    gap: 2rem;
  }
  .hero-title {
    font-size: 3rem;
  }
  .image-frame-back, .image-frame-front {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column-reverse; /* الصورة فوق في الموبايل */
    text-align: center;
  }

  .text-wrapper {
    max-width: 100%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .cta-group {
    justify-content: center;
  }

  .contact-info-bar {
    justify-content: center;
    margin-top: 1rem;
  }

  .image-wrapper {
    justify-content: center;
    padding: 1rem;
  }

  .image-frame-back, .image-frame-front {
    width: 260px;
    height: 260px;
  }
}
</style>
