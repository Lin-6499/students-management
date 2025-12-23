import { createRouter, createWebHistory } from 'vue-router'
import {baseRouters} from "@/router/baseRouters.ts";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRouters,
})
export function resetRouter(){
  const staticRouters=['Login']
  router.getRoutes().forEach(item=>{
    if (!staticRouters.includes(item.name as string)){
      router.removeRoute(item.name!)
    }
  })
}
export default router
