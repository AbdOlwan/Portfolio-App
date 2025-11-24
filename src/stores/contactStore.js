import { ref } from 'vue';
import { defineStore } from 'pinia';
import contactApi from '@/services/api/contact.js';

/**
 * تعريف Pinia Store لإدارة إرسال رسائل الاتصال
 */
export const useContactStore = defineStore('contact', () => {
  // --- State (الحالة) ---

  /**
   * لتتبع حالة إرسال الرسالة للـ API.
   * @type {import('vue').Ref<boolean>}
   */
  const isLoading = ref(false);

  /**
   * لتخزين أي رسالة خطأ تحدث أثناء الإرسال.
   * @type {import('vue').Ref<string | null>}
   */
  const error = ref(null);

  /**
   * لتخزين رسالة النجاح بعد الإرسال.
   * @type {import('vue').Ref<string | null>}
   */
  const successMessage = ref(null);

  // --- Actions (الإجراءات) ---

  /**
   * إرسال (submit) فورم الاتصال.
   * @param {ContactMessageCreateDto} formData
   * @returns {Promise<boolean>} - بيرجع true لو نجح، و false لو فشل
   */
  async function submitContactForm(formData) {
    // 1. تنظيف الحالة قبل البدء
    isLoading.value = true;
    error.value = null;
    successMessage.value = null;

    try {
      // 2. استدعاء الـ API
      // formData المفروض تكون { name, email, phone, subject, message }
      await contactApi.sendMessage(formData);

      // 3. في حالة النجاح
      successMessage.value = 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.';
      isLoading.value = false;
      return true;

    } catch (err) {
      // 4. في حالة الفشل
      // الـ interceptor بتاعك هيبعت رسالة الخطأ جاهزة
      error.value = err.message || 'حدث خطأ غير متوقع أثناء إرسال الرسالة.';
      isLoading.value = false;
      return false;
    }
  }

  /**
   * دالة مساعدة لمسح رسائل الحالة (الخطأ أو النجاح)
   * ممكن تستدعيها لما اليوزر يقفل رسالة التنبيه مثلاً
   */
  function clearStatus() {
    error.value = null;
    successMessage.value = null;
  }

  // --- Return (الإرجاع) ---

  return {
    // State
    isLoading,
    error,
    successMessage,

    // Actions
    submitContactForm,
    clearStatus,
  };
});
