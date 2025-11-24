import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import aboutMeApi from '@/services/api/aboutMe.js';

/**
 * تعريف Pinia Store لإدارة بيانات "About Me"
 */
export const useAboutMeStore = defineStore('aboutMe', () => {
  // --- State (الحالة) ---

  /**
   * بيانات "About Me" الفعلية.
   * نستخدم ref() لجعلها تفاعلية (reactive).
   * القيمة الأولية null.
   * @type {import('vue').Ref<AboutMeDto | null>}
   */
  const aboutMe = ref(null);

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
   * Getter محسوب (computed) للتحقق مما إذا كانت البيانات قد تم تحميلها.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const hasData = computed(() => aboutMe.value !== null);

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) بيانات "About Me" من الـ API وتحديث الحالة.
   * هذا هو الإجراء الرئيسي الذي ستستخدمه المكونات.
   */
  async function fetchAboutMe() {
    if (hasData.value) {
      // إذا كانت البيانات موجودة بالفعل، لا تقم بإعادة تحميلها
      // (يمكنك تغيير هذا السلوك إذا أردت التحديث دائماً)
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      // استدعاء الـ API الذي أنشأناه سابقاً
      // بفضل الـ interceptor، الـ 'data' هنا هي الـ AboutMeDto مباشرة
      const data = await aboutMeApi.getAboutMe();
      aboutMe.value = data;
    } catch (err) {
      // الـ interceptor سيعالج الخطأ ويرسل رسالة واضحة
      error.value = err.message || 'Failed to fetch "About Me" data.';
    } finally {
      // يتم تنفيذه دائماً، سواء نجح الأمر أو فشل
      isLoading.value = false;
    }
  }

  /**
   * تحديث بيانات "About Me" (للاستخدام في لوحة التحكم مثلاً).
   * @param {AboutMeCreateUpdateDto} updatedData
   * @returns {Promise<void>}
   */
  async function updateAboutMe(updatedData) {
    isLoading.value = true;
    error.value = null;

    try {
      // استدعاء الـ API للتحديث
      const savedData = await aboutMeApi.createOrUpdateAboutMe(updatedData);
      // تحديث الحالة بالبيانات الجديدة بعد نجاح الحفظ
      aboutMe.value = savedData;
    } catch (err) {
      error.value = err.message || 'Failed to update "About Me" data.';
      // رمي الخطأ مرة أخرى إذا أردت معالجته في المكون
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // --- Return (الإرجاع) ---

  // إرجاع كل ما نريد أن يكون متاحاً للمكونات
  return {
    // State
    aboutMe,
    isLoading,
    error,

    // Getters
    hasData,

    // Actions
    fetchAboutMe,
    updateAboutMe
  };
});
