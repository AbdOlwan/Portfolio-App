import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import certificationsApi from '@/services/api/certifications.js'; // تأكد إن المسار صح

/**
 * تعريف Pinia Store لإدارة بيانات "Certifications"
 * ده نسخة من aboutMeStore.js بس معدلة للـ Certifications
 */
export const useCertificationsStore = defineStore('certifications', () => {
  // --- State (الحالة) ---

  /**
   * قائمة الشهادات.
   * القيمة الأولية array فاضي [].
   * @type {import('vue').Ref<CertificationListDto[]>}
   */
  const certifications = ref([]);

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
  const hasData = computed(() => certifications.value.length > 0);

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) الشهادات النشطة من الـ API وتحديث الحالة.
   */
  async function fetchActiveCertifications() {
    if (hasData.value) {
      // لو البيانات موجودة، مش هنحملها تاني
      // (ممكن تغير ده لو محتاج تحديث دائم)
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      // استدعاء الـ API (ده هيرجع الـ array مباشرة بفضل الـ interceptor)
      const data = await certificationsApi.getActiveCertifications();
      certifications.value = data;
    } catch (err) {
      // الـ interceptor هيبعت رسالة الخطأ
      error.value = err.message || 'Failed to fetch certifications.';
    } finally {
      isLoading.value = false;
    }
  }

  // (ممكن نضيف باقي الـ Actions زي create, update, delete هنا بعدين)

  // --- Return (الإرجاع) ---

  return {
    // State
    certifications,
    isLoading,
    error,

    // Getters
    hasData,

    // Actions
    fetchActiveCertifications,
  };
});
