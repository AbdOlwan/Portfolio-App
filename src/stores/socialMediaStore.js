import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import socialMediaApi from '@/services/api/socialMedia.js'; // استيراد الـ service

/**
 * تعريف Pinia Store لإدارة "روابط التواصل الاجتماعي"
 * (بنفس نمط ملفات الـ store الأخرى)
 */
export const useSocialMediaStore = defineStore('socialMedia', () => {
  // --- State (الحالة) ---

  /**
   * قائمة الروابط (للعرض العام).
   * @type {import('vue').Ref<SocialMediaListDto[]>}
   */
  const socialMediaLinks = ref([]);

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
  const hasData = computed(() => socialMediaLinks.value.length > 0);

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) الروابط النشطة من الـ API وتحديث الحالة.
   */
  async function fetchActiveSocialMedia() {
    // إذا كانت البيانات موجودة بالفعل، لا تقم بجلبها مرة أخرى
    if (hasData.value) {
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      // استدعاء دالة الـ API التي أنشأناها
      const data = await socialMediaApi.getActive();
      socialMediaLinks.value = data;
    } catch (err) {
      // الـ interceptor في config.js سيعالج الخطأ
      error.value = err.message || 'Failed to fetch social media links.';
    } finally {
      isLoading.value = false;
    }
  }

  // --- Return (الإرجاع) ---

  return {
    // State
    socialMediaLinks,
    isLoading,
    error,

    // Getters
    hasData,

    // Actions
    fetchActiveSocialMedia,
  };
});
