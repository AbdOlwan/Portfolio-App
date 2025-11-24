import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import technologiesApi from '@/services/api/technologies.js'; // استيراد الـ service

/**
 * تعريف Pinia Store لإدارة "التقنيات"
 * (ملاحظة: DTO الخاص بالتقنيات النشطة لا يحتوي على "Category"،
 * لذا لن نقوم بالتجميع هنا كما فعلنا في المهارات)
 */
export const useTechnologiesStore = defineStore('technologies', () => {
  // --- State (الحالة) ---

  /**
   * قائمة التقنيات (للعرض العام).
   * @type {import('vue').Ref<TechnologySimpleDto[]>}
   */
  const technologies = ref([]);

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
  const hasData = computed(() => technologies.value.length > 0);

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) التقنيات النشطة من الـ API وتحديث الحالة.
   */
  async function fetchActiveTechnologies() {
    if (hasData.value) {
      return; // البيانات موجودة بالفعل
    }

    isLoading.value = true;
    error.value = null;

    try {
      // استدعاء دالة الـ API
      const data = await technologiesApi.getActive();
      technologies.value = data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch active technologies.';
    } finally {
      isLoading.value = false;
    }
  }

  // --- Return (الإرجاع) ---

  return {
    // State
    technologies,
    isLoading,
    error,

    // Getters
    hasData,

    // Actions
    fetchActiveTechnologies,
  };
});
