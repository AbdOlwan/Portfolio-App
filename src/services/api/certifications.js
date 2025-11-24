import api from './config.js'; // <-- تعديل: بنستخدم الملف بتاعك
// (لو ملف config.js في مكان تاني، عدل المسار ده. مثلاً: '@/services/config.js')

const API_ENDPOINT = 'certifications';

export default {
  /**
   * جلب الشهادات النشطة (للموقع العام)
   * GET /api/certifications
   */
  getActiveCertifications() {
    return api.get(API_ENDPOINT); // <-- تعديل: apiClient -> api
  },

  /**
   * جلب كل الشهادات (لـ Admin)
   * GET /api/certifications/all
   */
  getAllCertifications() {
    return api.get(`${API_ENDPOINT}/all`); // <-- تعديل
  },

  /**
   * جلب شهادة بالـ ID
   * GET /api/certifications/{id}
   */
  getCertificationById(id) {
    return api.get(`${API_ENDPOINT}/${id}`); // <-- تعديل
  },

  /**
   * إضافة شهادة جديدة
   * POST /api/certifications
   * @param {CertificationCreateDto} certificationData
   */
  createCertification(certificationData) {
    return api.post(API_ENDPOINT, certificationData); // <-- تعديل
  },

  /**
   * تعديل شهادة
   * PUT /api/certifications/{id}
   * @param {number} id
   * @param {CertificationUpdateDto} certificationData
   */
  updateCertification(id, certificationData) {
    return api.put(`${API_ENDPOINT}/${id}`, certificationData); // <-- تعديل
  },

  /**
   * حذف شهادة
   * DELETE /api/certifications/{id}
   */
  deleteCertification(id) {
    return api.delete(`${API_ENDPOINT}/${id}`); // <-- تعديل
  },

  /**
   * تبديل حالة النشاط
   * PATCH /api/certifications/{id}/toggle-active
   */
  toggleCertificationActive(id) {
    return api.patch(`${API_ENDPOINT}/${id}/toggle-active`); // <-- تعديل
  },
};

