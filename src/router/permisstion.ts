import router from "@/router/index.ts"
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";



router.beforeEach(async (to, from, next) => {
  const stuInfoStore = useStuInfoStore();
  const {stuInfo}=stuInfoStore;
  const {userInfo}=stuInfo
  const token = stuInfoStore.token;
  const username = userInfo.username;
  const userRole = userInfo.role_type;

  // 登录页
  if (to.path === '/login') {
    if (token) {
      await stuInfoStore.getStuInfo();
      // 已登录，跳首页
      next(getDefaultHomePath(userRole));
    } else {
      next(); // 未登录，允许访问
    }
    return; // 关键：提前返回，不再执行下面
  }

  // 未登录
  if (!token) {
    next({ path: '/login', query: { redirect: to.path } });
    return;
  }

  // 已登录，但无用户信息（如刷新页面）
  if (!username) {
    try {
      await stuInfoStore.getStuInfo();
      const newRole = userInfo.role_type;
      if (!hasPermission(to, newRole)) {
        next(getDefaultHomePath(newRole));
      } else {
        next({ ...to }); // 重新进入当前路由
      }
    } catch (error) {
      await stuInfoStore.userLogout();
      next({ path: '/login', query: { redirect: to.path } });
    }
    return; // 👈 异步分支结束
  }

  //  已登录 + 有用户信息 → 做权限校验
  if (!hasPermission(to, userRole)) {
    console.log('无权限')
    next(getDefaultHomePath(userRole));
  } else {
    console.log('有权限')
    next();
  }
  // 注意：这里不需要 return，因为是最后一步
});

//  判断是否有权限访问该路由
function hasPermission(route: any, userRole: string | undefined): boolean {
  const allowedRoles = route.meta?.roles as string[] | undefined;
  console.log('allowedRoles', allowedRoles);
  // 如果没配置 roles，默认允许（或根据业务设为 false）
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }
  // 用户未登录或无角色
  if (!userRole) return false;
  // 角色在允许列表中
  return allowedRoles.includes(userRole);
}

// 👇 根据角色返回默认首页
function getDefaultHomePath(role: string | undefined): string {
  if (role === 'counselor') {
    return '/home'; // 假设老师和学生共用 /home，或改成 /teacher/home
  } else if (role === 'student') {
    return '/home';
  } else {
    return '/home'; // 默认 fallback
  }
}
