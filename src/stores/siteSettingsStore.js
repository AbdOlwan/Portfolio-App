import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import siteSettingsApi from '@/services/api/siteSettings.js';

/**
 * تعريف Pinia Store لإدارة "إعدادات الموقع"
 */
export const useSiteSettingsStore = defineStore('siteSettings', () => {
  // --- State (الحالة) ---

  /**
   * لتخزين الإعدادات كـ Object (Dictionary)
   * @type {import('vue').Ref<Object<string, string>>}
   * @example { "SiteTitle": "موقعي الشخصي", "FooterCopyright": "© 2024" }
   */
  const settings = ref({});

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
   * Getter للتحقق مما إذا كانت الإعدادات قد تم تحميلها.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const hasData = computed(() => Object.keys(settings.value).length > 0);

  /**
   * Getter مساعد للوصول إلى إعداد معين بسهولة
   * @param {string} key - مفتاح الإعداد المطلوب
   * @returns {string | undefined}
   */
  const getSetting = (key) => {
    return computed(() => settings.value[key]);
  };

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) إعدادات الموقع كـ Dictionary.
   */
  async function fetchSettingsDictionary() {
    if (hasData.value) {
      return; // البيانات موجودة بالفعل
    }

    isLoading.value = true;
    error.value = null;

    try {
      // استدعاء دالة الـ API التي تجلب الـ Dictionary
      const data = await siteSettingsApi.getDictionary();
      settings.value = data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch site settings.';
    } finally {
      isLoading.value = false;
    }
  }

  // --- Return (الإرجاع) ---

  return {
    // State
    settings,
    isLoading,
    error,

    // Getters
    hasData,
    getSetting, // إرجاع الـ getter المساعد

    // Actions
    fetchSettingsDictionary,
  };
});
