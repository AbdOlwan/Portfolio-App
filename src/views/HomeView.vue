<script setup>
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

// يمكنك إضافة المزيد من الـ sections هنا:
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import EducationSection from '@/components/sections/EducationSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
</script>

<template>
  <div class="home-view">
    <!-- Hero/About Section -->
    <HeroSection />

    <!-- Projects Section -->
    <ProjectsSection />

    <!-- Skills Section -->
    <SkillsSection />

    <ExperienceSection />
    <CertificationsSection />

    <EducationSection />
    <TestimonialsSection />
        <ContactSection />
  </div>
</template>

<style scoped>
.home-view {
  /* يمكنك إضافة أي styles عامة للصفحة هنا */
  background-color: offwhite;
}
</style>
