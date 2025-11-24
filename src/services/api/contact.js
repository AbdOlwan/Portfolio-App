import api from './config.js'; // بنستورد الـ axios instance من ملف الكونفيج

// المسار الأساسي للـ controller ده
// جاي من اسم الكنترولر ContactMessagesController -> "contactmessages"
const API_ENDPOINT = 'contactmessages';

export default {
  /**
   * إرسال رسالة اتصل بنا جديدة (للزوار)
   * POST /api/contactmessages
   * @param {ContactMessageCreateDto} messageData
   * @returns {Promise<ContactMessageDto>}
   */
  sendMessage(messageData) {
    // messageData لازم يكون DTO مطابق لـ ContactMessageCreateDto
    // { name, email, phone, subject, message }
    return api.post(API_ENDPOINT, messageData);
  },

  // ===================================================
  // الدوال التالية للاستخدام في لوحة التحكم (Admin)
  // ===================================================

  /**
   * جلب جميع الرسائل (للمشرف)
   * GET /api/contactmessages
   */
  getAllMessages() {
    return api.get(API_ENDPOINT);
  },

  /**
   * جلب الرسائل غير المقروءة (للمشرف)
   * GET /api/contactmessages/unread
   */
  getUnreadMessages() {
    return api.get(`${API_ENDPOINT}/unread`);
  },

  /**
   * جلب رسالة بالـ ID (للمشرف)
   * GET /api/contactmessages/{id}
   */
  getMessageById(id) {
    return api.get(`${API_ENDPOINT}/${id}`);
  },

  /**
   * تحديد رسالة كمقروءة (للمشرف)
   * PATCH /api/contactmessages/{id}/read
   */
  markAsRead(id) {
    return api.patch(`${API_ENDPOINT}/${id}/read`);
  },

  /**
   * حذف رسالة (للمشرف)
   * DELETE /api/contactmessages/{id}
   */
  deleteMessage(id) {
    return api.delete(`${API_ENDPOINT}/${id}`);
  },
};
