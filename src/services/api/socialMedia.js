import api from './config.js'; // استيراد الـ axios instance من ملف الكونفيج

/**
 * المسار الأساسي للـ controller
 * (من SocialMediaController -> "socialmedia")
 */
const API_ENDPOINT = 'socialmedia';

/**
 * هذا الكائن يحتوي على جميع دوال الـ API الخاصة بـ Social Media
 */
export default {
  /**
   * 🎯 جلب جميع روابط التواصل الاجتماعي (للعرض العام)
   * GET /api/socialmedia/active
   * (بناءً على SocialMediaController.cs -> GetActiveSocialMedia)
   *
   * @returns {Promise<SocialMediaListDto[]>}
   */
  getActive() {
    // الـ interceptor في config.js سيهتم بإرجاع response.data.data
    return api.get(`${API_ENDPOINT}/active`);
  },

  // ===================================================
  // الدوال التالية للاستخدام في لوحة التحكم (Admin)
  // يمكنك إكمالها بنفس الطريقة عند الحاجة
  // ===================================================

  /**
   * ADMIN: 🔒 جلب كل الروابط (للوحة التحكم)
   * GET /api/socialmedia
   */
  getAll() {
    return api.get(API_ENDPOINT);
  },

  /**
   * ADMIN: 🔒 جلب رابط بواسطة الـ ID
   * GET /api/socialmedia/{id}
   */
  getById(id) {
    return api.get(`${API_ENDPOINT}/${id}`);
  },

  /**
   * ADMIN: 🔒 إنشاء رابط جديد
   * POST /api/socialmedia
   * @param {SocialMediaCreateUpdateDto} createDto
   */
  create(createDto) {
    return api.post(API_ENDPOINT, createDto);
  },

  /**
   * ADMIN: 🔒 تحديث رابط
   * PUT /api/socialmedia/{id}
   * @param {number} id
   * @param {SocialMediaCreateUpdateDto} updateDto
   */
  update(id, updateDto) {
    return api.put(`${API_ENDPOINT}/${id}`, updateDto);
  },

  /**
   * ADMIN: 🔒 حذف رابط
   * DELETE /api/socialmedia/{id}
   */
  delete(id) {
    return api.delete(`${API_ENDPOINT}/${id}`);
  },

  /**
   * ADMIN: 🔒 تفعيل/إلغاء تفعيل رابط
   * PATCH /api/socialmedia/{id}/toggle-active
   */
  toggleActive(id) {
    return api.patch(`${API_ENDPOINT}/${id}/toggle-active`);
  },
};
