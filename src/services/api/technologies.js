import api from './config.js'; // استيراد الـ axios instance من ملف الكونفيج

/**
 * المسار الأساسي للـ controller
 * (من TechnologiesController -> "technologies")
 */
const API_ENDPOINT = 'technologies';

/**
 * هذا الكائن يحتوي على جميع دوال الـ API الخاصة بـ Technologies
 */
export default {
  /**
   * 🎯 جلب جميع التقنيات النشطة (للموقع العام)
   * GET /api/technologies/active
   * (بناءً على TechnologiesController.cs -> GetActive)
   *
   * @returns {Promise<TechnologySimpleDto[]>}
   */
  getActive() {
    return api.get(`${API_ENDPOINT}/active`);
  },

  /**
   * 🎯 جلب التقنيات النشطة حسب الفئة
   * GET /api/technologies/category/{category}
   * (بناءً على TechnologiesController.cs -> GetByCategory)
   *
   * @param {string} category
   * @returns {Promise<TechnologySimpleDto[]>}
   */
  getByCategory(category) {
    return api.get(`${API_ENDPOINT}/category/${category}`);
  },

  // ===================================================
  // الدوال التالية للاستخدام في لوحة التحكم (Admin)
  // ===================================================

  /**
   * ADMIN: 🔒 جلب جميع التقنيات (للوحة التحكم)
   * GET /api/technologies
   */
  getAll() {
    return api.get(API_ENDPOINT);
  },

  /**
   * ADMIN: 🔒 جلب تقنية بواسطة الـ ID
   * GET /api/technologies/{id}
   */
  getById(id) {
    return api.get(`${API_ENDPOINT}/${id}`);
  },

  /**
   * ADMIN: 🔒 إنشاء تقنية جديدة
   * POST /api/technologies
   * @param {TechnologyCreateUpdateDto} createDto
   */
  create(createDto) {
    return api.post(API_ENDPOINT, createDto);
  },

  /**
   * ADMIN: 🔒 تعديل تقنية
   * PUT /api/technologies/{id}
   * @param {number} id
   * @param {TechnologyCreateUpdateDto} updateDto
   */
  update(id, updateDto) {
    return api.put(`${API_ENDPOINT}/${id}`, updateDto);
  },

  /**
   * ADMIN: 🔒 حذف تقنية
   * DELETE /api/technologies/{id}
   */
  delete(id) {
    return api.delete(`${API_ENDPOINT}/${id}`);
  },

  /**
   * ADMIN: 🔒 تبديل حالة تفعيل التقنية
   * PATCH /api/technologies/{id}/toggle-active
   */
  toggleActive(id) {
    return api.patch(`${API_ENDPOINT}/${id}/toggle-active`);
  },
};
