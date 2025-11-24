import api from './config.js'; // استيراد instance الـ axios المُعدّ

/**
 * Service للتفاعل مع Projects API
 * المسار الأساسي: /api/Projects
 */
const projectsApi = {
  /**
   * (Public) جلب جميع المشاريع النشطة
   * GET /api/Projects/active
   * @returns {Promise<ProjectListDto[]>}
   */
  getActive: () => {
    // الـ interceptor في config.js سيهتم بإرجاع response.data.data
    return api.get('/Projects/active');
  },

  /**
   * (Public) جلب المشاريع المميزة (Featured)
   * GET /api/Projects/featured
   * @returns {Promise<ProjectListDto[]>}
   */
  getFeatured: () => {
    return api.get('/Projects/featured');
  },

  /**
   * (Public) جلب مشروع معين بالتفاصيل الكاملة عن طريق ID
   * GET /api/Projects/{id}
   * @param {number} id
   * @returns {Promise<ProjectDto>}
   */
  getById: (id) => {
    return api.get(`/Projects/${id}`);
  },

  /**
   * (Public) جلب المشاريع حسب النوع
   * GET /api/Projects/type/{projectType}
   * @param {string} projectType
   * @returns {Promise<ProjectListDto[]>}
   */
  getByType: (projectType) => {
    return api.get(`/Projects/type/${projectType}`);
  },

  // =============================================
  // (Admin) دوال لوحة التحكم - يمكنك استخدامها لاحقاً
  // =============================================

  /**
   * (Admin) جلب جميع المشاريع (نشطة وغير نشطة)
   * GET /api/Projects
   * @returns {Promise<ProjectListDto[]>}
   */
  getAll: () => {
    return api.get('/Projects');
  },

  /**
   * (Admin) إنشاء مشروع جديد
   * POST /api/Projects
   * @param {ProjectCreateDto} projectData
   * @returns {Promise<ProjectDto>}
   */
  create: (projectData) => {
    return api.post('/Projects', projectData);
  },

  /**
   * (Admin) تحديث مشروع
   * PUT /api/Projects/{id}
   * @param {number} id
   * @param {ProjectUpdateDto} projectData
   * @returns {Promise<ProjectDto>}
   */
  update: (id, projectData) => {
    return api.put(`/Projects/${id}`, projectData);
  },

  /**
   * (Admin) حذف مشروع
   * DELETE /api/Projects/{id}
   * @param {number} id
   * @returns {Promise<void>}
   */
  delete: (id) => {
    return api.delete(`/Projects/${id}`);
  },

  /**
   * (Admin) تبديل حالة النشاط
   * PATCH /api/Projects/{id}/toggle-active
   * @param {number} id
   * @returns {Promise<void>}
   */
  toggleActive: (id) => {
    return api.patch(`/Projects/${id}/toggle-active`);
  },

  /**
   * (Admin) تبديل حالة "مميز"
   * PATCH /api/Projects/{id}/toggle-featured
   * @param {number} id
   * @returns {Promise<void>}
   */
  toggleFeatured: (id) => {
    return api.patch(`/Projects/${id}/toggle-featured`);
  },
};

export default projectsApi;
