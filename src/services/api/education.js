import api from './config.js'; // تأكد إن المسار لملف config.js صحيح

/**
 * API service لإدارة بيانات التعليم (Education)
 * بيتصل بـ EducationController.cs
 */
const educationApi = {
  /**
   * جلب قائمة التعليم النشطة (للعرض العام)
   * GET /api/education
   * @returns {Promise<EducationListDto[]>}
   */
  getActiveEducations() {
    return api.get('/education');
  },

  /**
   * جلب كل عناصر التعليم (للوحة التحكم)
   * GET /api/education/admin
   * @returns {Promise<EducationDto[]>}
   */
  getAllAdmin() {
    return api.get('/education/admin');
  },

  /**
   * جلب عنصر تعليم واحد بواسطة الـ ID
   * GET /api/education/{id}
   * @param {number} id
   * @returns {Promise<EducationDto>}
   */
  getById(id) {
    return api.get(`/education/${id}`);
  },

  /**
   * إنشاء عنصر تعليم جديد
   * POST /api/education
   * @param {EducationCreateUpdateDto} educationData
   * @returns {Promise<EducationDto>}
   */
  create(educationData) {
    return api.post('/education', educationData);
  },

  /**
   * تعديل عنصر تعليم موجود
   * PUT /api/education/{id}
   * @param {number} id
   * @param {EducationCreateUpdateDto} educationData
   * @returns {Promise<EducationDto>}
   */
  update(id, educationData) {
    return api.put(`/education/${id}`, educationData);
  },

  /**
   * حذف عنصر تعليم
   * DELETE /api/education/{id}
   * @param {number} id
   * @returns {Promise<ApiResponse>}
   */
  delete(id) {
    return api.delete(`/education/${id}`);
  },
};

export default educationApi;
