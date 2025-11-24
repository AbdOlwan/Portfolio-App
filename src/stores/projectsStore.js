import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import projectsApi from '@/services/api/projects.js'; // استيراد الـ service

/**
 * تعريف Pinia Store لإدارة بيانات "Projects"
 */
export const useProjectsStore = defineStore('projects', () => {
  // --- State (الحالة) ---

  /**
   * قائمة المشاريع النشطة.
   * @type {import('vue').Ref<ProjectListDto[]>}
   */
  const projects = ref([]);

  /**
   * قائمة المشاريع المميزة.
   * @type {import('vue').Ref<ProjectListDto[]>}
   */
  const featuredProjects = ref([]);

  /**
   * المشروع المحدد حالياً (لصفحة التفاصيل مثلاً).
   * @type {import('vue').Ref<ProjectDto | null>}
   */
  const selectedProject = ref(null);

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
   * Getter للتحقق مما إذا كانت المشاريع النشطة قد تم تحميلها.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const hasActiveData = computed(() => projects.value.length > 0);

  /**
   * Getter للتحقق مما إذا كانت المشاريع المميزة قد تم تحميلها.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const hasFeaturedData = computed(() => featuredProjects.value.length > 0);

  // --- Actions (الإجراءات) ---

  /**
   * جلب (fetch) المشاريع النشطة من الـ API وتحديث الحالة.
   */
  async function fetchActiveProjects() {
    if (hasActiveData.value) {
      return; // البيانات موجودة بالفعل
    }

    isLoading.value = true;
    error.value = null;

    try {
      const data = await projectsApi.getActive();
      projects.value = data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch active projects.';
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * جلب (fetch) المشاريع المميزة من الـ API وتحديث الحالة.
   */
  async function fetchFeaturedProjects() {
    if (hasFeaturedData.value) {
      return; // البيانات موجودة بالفعل
    }

    // يمكننا استخدام نفس isLoading أو فصلهم
    isLoading.value = true;
    error.value = null; // يمكن أيضاً فصل رسائل الخطأ

    try {
      const data = await projectsApi.getFeatured();
      featuredProjects.value = data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch featured projects.';
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * جلب (fetch) تفاصيل مشروع واحد عن طريق ID.
   * @param {number} id
   */
  async function fetchProjectById(id) {
    isLoading.value = true;
    error.value = null;
    selectedProject.value = null;

    try {
      const data = await projectsApi.getById(id);
      selectedProject.value = data;
    } catch (err) {
      error.value = err.message || `Failed to fetch project with id ${id}.`;
    } finally {
      isLoading.value = false;
    }
  }

  // --- Return (الإرجاع) ---

  return {
    // State
    projects,
    featuredProjects,
    selectedProject,
    isLoading,
    error,

    // Getters
    hasActiveData,
    hasFeaturedData,

    // Actions
    fetchActiveProjects,
    fetchFeaturedProjects,
    fetchProjectById,
  };
});
