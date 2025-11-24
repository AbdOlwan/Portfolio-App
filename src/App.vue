<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue' // تأكد من وجود هذا الملف
import AppFooter from '@/components/layout/AppFooter.vue' // تأكد من وجود هذا الملف
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main>
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<style>
/* تنسيقات عامة للمشروع بأكمله */
:root {
  --bg-dark: #0f172a;       /* Slate 900 */
  --text-white: #f8fafc;
  --primary-blue: #2563eb;
  --font-main: 'Inter', sans-serif;
}

/* جعل الصفحة تأخذ كامل الارتفاع وتطبيق الخلفية الداكنة */
body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-dark);
  color: var(--text-white);
  font-family: var(--font-main), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* تحسين التمرير (Scroll) */
html {
  scroll-behavior: smooth;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1; /* يجعل المحتوى يملأ المساحة المتاحة ويدفع الفوتر للأسفل */
}
</style>
