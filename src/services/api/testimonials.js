import api from './config.js';


const testimonialsApi = {
  /**
   * جلب آراء العملاء الموافق عليها (للعرض العام)
   * GET /api/testimonials
   * @returns {Promise<TestimonialListDto[]>}
   */
  getActive() {
    return api.get('/testimonials');
  },

  /**
   * إضافة رأي عميل جديد (من الزوار)
   * POST /api/testimonials
   * @param {TestimonialCreateDto} testimonialData
   * @returns {Promise<TestimonialDto>}
   */
  create(testimonialData) {
    // testimonialData يتطابق مع TestimonialCreateDto
    return api.post('/testimonials', testimonialData);
  },

  // ===================================================
  // الدوال التالية للاستخدام في لوحة التحكم (Admin)
  // ===================================================

  /**
   * جلب جميع الآراء (للمشرف)
   * GET /api/testimonials/all
   * @returns {Promise<TestimonialDto[]>}
   */
  getAllAdmin() {
    return api.get('/testimonials/all');
  },

  /**
   * جلب الآراء المعلقة (للمشرف)
   * GET /api/testimonials/pending
   * @returns {Promise<TestimonialDto[]>}
   */
  getPending() {
    return api.get('/testimonials/pending');
  },

  /**
   * جلب رأي واحد بالـ ID (للمشرف)
   * GET /api/testimonials/{id}
   * @param {number} id
   * @returns {Promise<TestimonialDto>}
   */
  getById(id) {
    return api.get(`/testimonials/${id}`);
  },

  /**
   * تعديل رأي (للمشرف)
   * PUT /api/testimonials/{id}
   * @param {number} id
   * @param {TestimonialUpdateDto} testimonialData
   * @returns {Promise<TestimonialDto>}
   */
  update(id, testimonialData) {
    return api.put(`/testimonials/${id}`, testimonialData);
  },

  /**
   * الموافقة على رأي (للمشرف)
   * POST /api/testimonials/{id}/approve
   * @param {number} id
   * @returns {Promise<ApiResponse>}
   */
  approve(id) {
    return api.post(`/testimonials/${id}/approve`);
  },

  /**
   * رفض رأي (للمشرف)
   * POST /api/testimonials/{id}/reject
   * @param {number} id
   * @returns {Promise<ApiResponse>}
   */
  reject(id) {
    return api.post(`/testimonials/${id}/reject`);
  },

  /**
   * حذف رأي (للمشرف)
   * DELETE /api/testimonials/{id}
   * @param {number} id
   * @returns {Promise<ApiResponse>}
   */
  delete(id) {
    return api.delete(`/testimonials/${id}`);
  },
};

export default testimonialsApi;
