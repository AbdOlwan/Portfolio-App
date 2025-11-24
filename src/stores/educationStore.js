import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import educationApi from '@/services/api/education.js'; // استيراد الـ service اللي لسه عاملينه

/**
 * تعريف Pinia Store لإدارة بيانات "Education"
 */
export const useEducationStore = defineStore('education', () => {
  // --- State (الحالة) ---

  /**
   * قائمة عناصر التعليم (للعرض العام).
   * القيمة الأولية array فاضي [].
   * @type {import('vue').Ref<EducationListDto[]>}
   */
  const educations = ref([]);

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
  const hasData = computed(() => educations.value.length > 0);

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) عناصر التعليم النشطة من الـ API وتحديث الحالة.
   */
  async function fetchActiveEducations() {
    // لو البيانات موجودة، مش هنحملها تاني (زي ما عملت في باقي الـ stores)
    if (hasData.value) {
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      // استدعاء دالة الـ API اللي عملناها في education.js
      // بفضل الـ interceptor، الـ 'data' هنا هي الـ array مباشرة
      const data = await educationApi.getActiveEducations();
      educations.value = data;
    } catch (err) {
      // الـ interceptor هيبعت رسالة الخطأ جاهزة
      error.value = err.message || 'Failed to fetch education history.';
    } finally {
      isLoading.value = false;
    }
  }

  // (ممكن نضيف باقي الـ Actions بتاعت لوحة التحكم زي create, update, delete هنا بعدين)

  // --- Return (الإرجاع) ---

  return {
    // State
    educations,
    isLoading,
    error,

    // Getters
    hasData,

    // Actions
    fetchActiveEducations,
  };
});
