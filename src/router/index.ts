import { createRouter, createWebHistory } from 'vue-router'
import {createRoutes} from "@/router/routes.ts";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: createRoutes,
})

export default router
