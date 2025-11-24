import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import skillsApi from '@/services/api/skills.js'; // استيراد الـ service

/**
 * تعريف Pinia Store لإدارة بيانات "Skills"
 */
export const useSkillsStore = defineStore('skills', () => {
  // --- State (الحالة) ---

  /**
   * قائمة المهارات (للعرض العام).
   * @type {import('vue').Ref<SkillListDto[]>}
   */
  const skills = ref([]);

  /**
   * لتتبع حالة تحميل البيانات من الـ API.
   * @type {import('vue').Ref<boolean>}
   */
  const isLoading = ref(false);

  /**
   * لتخزين أي رسالة خطأ تحدث أثناء جلب البيانات.
   * @type {import('vue').Ref<string | null>}
   */
  const error = ref(null);

  // --- Getters (المشتقات) ---

  /**
   * Getter محسوب للتحقق مما إذا كانت البيانات قد تم تحميلها.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const hasData = computed(() => skills.value.length > 0);

  /**
   * Getter محسوب لتجميع المهارات حسب الفئة (Category)
   * @returns {Object<string, SkillListDto[]>}
   * Example: { 'Frontend': [skill1, skill2], 'Backend': [skill3] }
   */
  const groupedSkills = computed(() => {
    if (!hasData.value) {
      return {};
    }

    // نستخدم .reduce() لإنشاء object جديد مفاتيحه هي أسماء الفئات
    return skills.value.reduce((acc, skill) => {
      // لو المهارة ملهاش category، نحطها في "متنوع"
      const category = skill.category || 'متنوع';

      // لو الـ category ده مش موجود في الـ object بتاعنا، ننشئ له array
      if (!acc[category]) {
        acc[category] = [];
      }

      // نضيف المهارة للـ array بتاع الـ category بتاعها
      acc[category].push(skill);
      return acc;
    }, {}); // القيمة الأولية هي object فاضي
  });

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) المهارات النشطة من الـ API وتحديث الحالة.
   */
  async function fetchActiveSkills() {
    if (hasData.value) {
      return; // البيانات موجودة بالفعل
    }

    isLoading.value = true;
    error.value = null;

    try {
      const data = await skillsApi.getActive();
      skills.value = data;
    } catch (err) {
      // الـ interceptor سيعالج الخطأ
      error.value = err.message || 'Failed to fetch skills.';
    } finally {
      isLoading.value = false;
    }
  }

  // --- Return (الإرجاع) ---

  return {
    // State
    skills,
    isLoading,
    error,

    // Getters
    hasData,
    groupedSkills, // <-- إرجاع الـ getter الجديد

    // Actions
    fetchActiveSkills,
  };
});
