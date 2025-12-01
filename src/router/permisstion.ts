import router from "@/router/index.ts"
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";



router.beforeEach(async (to: any, from: any, next: any) => {
  const stuInfoStore = useStuInfoStore();
  const token = stuInfoStore.token
  const username = stuInfoStore.stuInfo.username;
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await stuInfoStore.getStuInfo()
          next({ ...to })
        } catch (error) {
          await stuInfoStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
