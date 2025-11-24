import api from './config.js'; // تأكد إن المسار لملف config.js صحيح

/**
 * API service لإدارة بيانات المهارات (Skills)
 * بيتصل بـ SkillsController.cs
 */
const skillsApi = {
  /**
   * جلب قائمة المهارات النشطة (للعرض العام)
   * GET /api/skills/active
   * @returns {Promise<SkillListDto[]>}
   */
  getActive() {
    return api.get('/skills/active');
  },

  /**
   * جلب المهارات النشطة حسب الفئة
   * GET /api/skills/category/{category}
   * @param {string} category
   * @returns {Promise<SkillListDto[]>}
   */
  getByCategory(category) {
    return api.get(`/skills/category/${category}`);
  },

  /**
   * جلب كل المهارات (للوحة التحكم)
   * GET /api/skills
   * @returns {Promise<SkillDto[]>}
   */
  getAllAdmin() {
    return api.get('/skills');
  },

  /**
   * جلب مهارة واحدة بواسطة الـ ID (للوحة التحكم)
   * GET /api/skills/{id}
   * @param {number} id
   * @returns {Promise<SkillDto>}
   */
  getById(id) {
    return api.get(`/skills/${id}`);
  },

  /**
   * إنشاء مهارة جديدة
   * POST /api/skills
   * @param {SkillCreateDto} skillData
   * @returns {Promise<SkillDto>}
   */
  create(skillData) {
    return api.post('/skills', skillData);
  },

  /**
   * تعديل مهارة موجودة
   * PUT /api/skills/{id}
   * @param {number} id
   * @param {SkillUpdateDto} skillData
   * @returns {Promise<SkillDto>}
   */
  update(id, skillData) {
    return api.put(`/skills/${id}`, skillData);
  },

  /**
   * حذف مهارة
   * DELETE /api/skills/{id}
   * @param {number} id
   * @returns {Promise<ApiResponse>}
   */
  delete(id) {
    return api.delete(`/skills/${id}`);
  },

  /**
   * تبديل حالة النشاط (تفعيل/إلغاء تفعيل)
   * PATCH /api/skills/{id}/toggle-active
   * @param {number} id
   * @returns {Promise<ApiResponse>}
   */
  toggleActive(id) {
    return api.patch(`/skills/${id}/toggle-active`);
  },

  /**
   * إعادة ترتيب المهارات
   * POST /api/skills/reorder
   * @param {Object<number, number>} orderMap - e.g., { 1: 0, 2: 1 } (id: order)
   * @returns {Promise<ApiResponse>}
   */
  reorder(orderMap) {
    return api.post('/skills/reorder', orderMap);
  },
};

export default skillsApi;
