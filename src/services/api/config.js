import axios from 'axios';

/**
 * إنشاء نسخة (instance) من axios بإعدادات افتراضية
 */
const api = axios.create({
  /**
   * الرابط الأساسي للـ API من ملف .env
   * (VITE_API_BASE_URL=https://localhost:7001/api)
   */
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * معترض (Interceptor) للاستجابات (Responses)
 * هذا الكود مهم جداً ليتعامل مع الهيكل الموحد للاستجابة (ApiResponse.cs)
 */
api.interceptors.response.use(
  (response) => {
    // السيرفر يرسل { success: true, data: {...}, message: "..." }
    // إذا كانت العملية ناجحة، قم بإرجاع الـ 'data' مباشرة
    if (response.data && response.data.success) {
      return response.data.data; // نرجع البيانات الفعلية مباشرة
    }

    // إذا كانت success = false ولكنها استجابة 2xx
    return Promise.reject(
      new Error(response.data.message || 'An error occurred but server responded 2xx')
    );
  },
  (error) => {
    // التعامل مع أخطاء السيرفر (4xx, 5xx)
    let errorMessage = 'An unknown error occurred';

    if (error.response && error.response.data) {
      // نستخدم الرسالة من الـ ApiResponse.cs إذا وُجدت
      errorMessage = error.response.data.message || error.response.data.title || 'Server error';
      // يمكنك أيضاً معالجة الأخطاء (errors) هنا إذا أردت
    } else if (error.request) {
      // الطلب تم إرساله ولكن لم يتم استقبال أي رد
      errorMessage = 'No response from server. Check network or server status.';
    } else {
      // خطأ أثناء إعداد الطلب
      errorMessage = error.message;
    }

    // إرجاع الخطأ ليتم التعامل معه في (catch)
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
