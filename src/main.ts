import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import { useAuthStore } from '~/stores/auth'
import { createPinia } from 'pinia';
import ToastPlugin from 'vue-toast-notification';
import App from './App.vue'
import '~/assets/css/main.css'
import 'vue3-easy-data-table/dist/style.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const routes = setupLayouts(generatedRoutes)
const pinia = createPinia();

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition)
        return savedPosition

      else
        return { top: 0 }
    },
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(ctx))

    pinia.use(({ store }) => {
      store.$router = markRaw(ctx.router)
    });

    ctx.app.use(pinia)
    ctx.app.use(ToastPlugin);
    
    ctx.router.beforeEach(async (to) => {
      const publicPages = ['/login', '/register'];

      const authRequired = !publicPages.includes(to.path);
      const auth = useAuthStore()

      if(authRequired && !auth.user){
        auth.returnUrl = to.fullPath

        return '/login'
      }

      if(publicPages.includes(to.path) && auth.user){
        return '/'
      }

    })
  },
)
