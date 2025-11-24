import api from './config.js'; // استيراد instance الـ axios المُعدّ

/**
 * Service للتفاعل مع SiteSettings API
 * المسار الأساسي: /api/SiteSettings
 */
const siteSettingsApi = {
  /**
   * (Public) جلب جميع إعدادات الموقع كـ Dictionary (Key-Value)
   * GET /api/SiteSettings/dictionary
   * @returns {Promise<Object<string, string>>}
   */
  getDictionary: () => {
    // هذا هو الـ endpoint الأنسب للاستخدام في الواجهة
    return api.get('/SiteSettings/dictionary');
  },

  // =============================================
  // (Admin) دوال لوحة التحكم - يمكنك استخدامها لاحقاً
  // =============================================

  /**
   * (Admin) جلب جميع الإعدادات كـ List
   * GET /api/SiteSettings
   * @returns {Promise<SiteSettingDto[]>}
   */
  getAll: () => {
    return api.get('/SiteSettings');
  },

  /**
   * (Admin) جلب إعداد معين بالمفتاح (Key)
   * GET /api/SiteSettings/key/{key}
   * @param {string} key
   * @returns {Promise<SiteSettingDto>}
   */
  getByKey: (key) => {
    return api.get(`/SiteSettings/key/${key}`);
  },

  /**
   * (Admin) إنشاء إعداد جديد
   * POST /api/SiteSettings
   * @param {SiteSettingCreateUpdateDto} settingData
   * @returns {Promise<SiteSettingDto>}
   */
  create: (settingData) => {
    return api.post('/SiteSettings', settingData);
  },

  /**
   * (Admin) تحديث إعداد
   * PUT /api/SiteSettings/{id}
   * @param {number} id
   * @param {SiteSettingCreateUpdateDto} settingData
   * @returns {Promise<SiteSettingDto>}
   */
  update: (id, settingData) => {
    return api.put(`/SiteSettings/${id}`, settingData);
  },

  /**
   * (Admin) حذف إعداد
   * DELETE /api/SiteSettings/{id}
   * @param {number} id
   * @returns {Promise<void>}
   */
  delete: (id) => {
    return api.delete(`/SiteSettings/${id}`);
  },
};

export default siteSettingsApi;
