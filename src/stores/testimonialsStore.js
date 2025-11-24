import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import testimonialsApi from '@/services/api/testimonials.js'; // استيراد الـ service

/**
 * تعريف Pinia Store لإدارة "آراء العملاء"
 */
export const useTestimonialsStore = defineStore('testimonials', () => {
  // --- State (الحالة) ---

  /**
   * قائمة الآراء (للعرض العام).
   * @type {import('vue').Ref<TestimonialListDto[]>}
   */
  const testimonials = ref([]);

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
  const hasData = computed(() => testimonials.value.length > 0);

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) الآراء الموافق عليها من الـ API وتحديث الحالة.
   */
  async function fetchActiveTestimonials() {
    // إذا كانت البيانات موجودة بالفعل، لا تقم بجلبها مرة أخرى
    if (hasData.value) {
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      // استدعاء دالة الـ API
      const data = await testimonialsApi.getActive();
      testimonials.value = data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch testimonials.';
    } finally {
      isLoading.value = false;
    }
  }

  // ملاحظة: يمكنك إضافة action لإرسال رأي جديد (create) هنا
  // async function submitTestimonial(formData) { ... }

  // --- Return (الإرجاع) ---

  return {
    // State
    testimonials,
    isLoading,
    error,

    // Getters
    hasData,

    // Actions
    fetchActiveTestimonials,
  };
});
