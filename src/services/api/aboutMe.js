import api from './config.js';

/**
 * خدمة API لإدارة معلومات "About Me"
 * يتوافق مع AboutMeController.cs
 */
const aboutMeApi = {
  /**
   * جلب معلومات الـ About Me
   * GET /api/AboutMe
   * @returns {Promise<AboutMeDto>}
   */
  getAboutMe: () => {
    return api.get('/AboutMe');
  },

  /**
   * إنشاء أو تحديث معلومات الـ About Me (يتطلب صلاحية)
   * POST /api/AboutMe
   * @param {AboutMeCreateUpdateDto} aboutMeData - البيانات الجديدة
   * @returns {Promise<AboutMeDto>}
   */
  createOrUpdateAboutMe: (aboutMeData) => {
    // aboutMeData يجب أن يطابق هيكل AboutMeCreateUpdateDto
    return api.post('/AboutMe', aboutMeData);
  }

  // ملاحظة: الـ Controller لا يحتوي على حذف، لذلك لا نحتاجه هنا
};

export default aboutMeApi;
