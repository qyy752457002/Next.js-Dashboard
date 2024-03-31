import type { NextAuthConfig } from 'next-auth';

/*
    auth.config.ts在项目的根目录创建一个导出authConfig对象的文件。
    该对象将包含 NextAuth.js 的配置选项。
    目前，它仅包含选项pages

    ---------------------------------------------------------------

    您可以使用该pages选项指定自定义登录、注销和错误页面的路由。

    这不是必需的，但通过添加signIn: '/login'到我们的pages选项中，
    用户将被重定向到我们的自定义登录页面，而不是 NextAuth.js 默认页面。
*/
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;