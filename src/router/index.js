import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'الرئيسية'
      }
    },
    // يمكنك إضافة routes إضافية هنا لاحقاً:
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
      meta: {
        title: 'المشاريع'
      }
    },
    {
      path: '/project/:id',
      name: 'project-details',
      component: () => import('@/views/ProjectDetailsView.vue'),
      meta: {
        title: 'تفاصيل المشروع'
      }
    },
    // {
    //   path: '/contact',
    //   name: 'contact',
    //   component: () => import('@/views/ContactView.vue'),
    //   meta: {
    //     title: 'التواصل'
    //   }
    // }
  ],
  // Scroll behavior for smooth navigation
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // Scroll to hash (e.g., #projects)
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      // Restore scroll position when using browser back/forward
      return savedPosition
    } else {
      // Scroll to top on new navigation
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Navigation guard for page titles
router.beforeEach((to, from, next) => {
  // Set document title
  const baseTitle = 'Portfolio'
  document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle

  next()
})

export default router
