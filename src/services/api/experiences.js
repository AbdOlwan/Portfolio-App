import api from './config.js'; // تأكد إن المسار لملف config.js صحيح

/**
 * API service لإدارة بيانات الخبرات (Experiences)
 * بيتصل بـ ExperiencesController.cs
 */
const experiencesApi = {
  /**
   * جلب قائمة الخبرات النشطة (للعرض العام)
   * GET /api/experiences/active
   * @returns {Promise<ExperienceListDto[]>}
   */
  getActive() {
    return api.get('/experiences/active');
  },

  /**
   * جلب كل الخبرات (للوحة التحكم)
   * GET /api/experiences
   * @returns {Promise<ExperienceDto[]>}
   */
  getAllAdmin() {
    return api.get('/experiences');
  },

  /**
   * جلب خبرة واحدة بواسطة الـ ID
   * GET /api/experiences/{id}
   * @param {number} id
   * @returns {Promise<ExperienceDto>}
   */
  getById(id) {
    return api.get(`/experiences/${id}`);
  },

  /**
   * إنشاء خبرة جديدة
   * POST /api/experiences
   * @param {ExperienceCreateDto} experienceData
   * @returns {Promise<ExperienceDto>}
   */
  create(experienceData) {
    return api.post('/experiences', experienceData);
  },

  /**
   * تعديل خبرة موجودة
   * PUT /api/experiences/{id}
   * @param {number} id
   * @param {ExperienceUpdateDto} experienceData
   * @returns {Promise<ExperienceDto>}
   */
  update(id, experienceData) {
    return api.put(`/experiences/${id}`, experienceData);
  },

  /**
   * حذف خبرة
   * DELETE /api/experiences/{id}
   * @param {number} id
   * @returns {Promise<ApiResponse>}
   */
  delete(id) {
    return api.delete(`/experiences/${id}`);
  },
};

export default experiencesApi;
