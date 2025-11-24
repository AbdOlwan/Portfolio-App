import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import experiencesApi from '@/services/api/experiences.js'; // استيراد الـ service

/**
 * تعريف Pinia Store لإدارة بيانات "Experiences"
 */
export const useExperiencesStore = defineStore('experiences', () => {
  // --- State (الحالة) ---

  /**
   * قائمة الخبرات (للعرض العام).
   * @type {import('vue').Ref<ExperienceListDto[]>}
   */
  const experiences = ref([]);

  /**
   * لتتبع حالة تحميل البيانات من الـ API.
   * @type {import('vue').Ref<boolean>}
   */
  const isLoading = ref(false);

  /**
   * لتخزين أي رسالة خطأ تحدث أثناء جلب البيانات.
   * @type {import('vue').Ref<string | null>}
   */
  const error = ref(null);

  // --- Getters (المشتقات) ---

  /**
   * Getter محسوب للتحقق مما إذا كانت البيانات قد تم تحميلها.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const hasData = computed(() => experiences.value.length > 0);

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) الخبرات النشطة من الـ API وتحديث الحالة.
   */
  async function fetchActiveExperiences() {
    if (hasData.value) {
      return; // البيانات موجودة بالفعل
    }

    isLoading.value = true;
    error.value = null;

    try {
      // استدعاء دالة الـ API التي تجلب البيانات العامة
      const data = await experiencesApi.getActive();
      experiences.value = data;
    } catch (err) {
      // الـ interceptor سيعالج الخطأ
      error.value = err.message || 'Failed to fetch experiences.';
    } finally {
      isLoading.value = false;
    }
  }

  // --- Return (الإرجاع) ---

  return {
    // State
    experiences,
    isLoading,
    error,

    // Getters
    hasData,

    // Actions
    fetchActiveExperiences,
  };
});
