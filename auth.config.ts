import type { NextAuthConfig } from 'next-auth';

/*
    auth.config.ts在项目的根目录创建一个导出authConfig对象的文件。
    该对象将包含 NextAuth.js 的配置选项。
    目前，它仅包含选项pages。
*/
 export const authConfig = {

/*
    可以使用该pages选项指定custom sign-in, sign-out, and error的路由。

    这不是必需的，但通过添加signIn: '/login'到我们的pages选项中，
    用户将被重定向到我们的自定义登录页面，而不是 NextAuth.js 默认页面。
*/
  
  pages: {
    signIn: '/login',
  },

  /*
    授权回调函数用于验证通过 Next.js 中间件访问页面的请求是否经过授权。
    它在请求完成之前被调用，接收一个包含 auth 和 request 属性的对象。
    auth 属性包含用户的会话信息，而 request 属性包含传入的请求信息。
  */
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      /*
        双感叹号（!!）被称为双重否定操作符，
        它们将任何值转换为对应的布尔值，
        即使该值是 null 或 undefined

        auth?.user 使用了可选链操作符 ?.，这表示如果 auth 不为 null 或 undefined，那么才会尝试访问 user 属性。

        整个表达式的作用是检查用户是否已经登录，
        如果 auth 对象中的 user 属性存在且不为 null 或 undefined，
        则 isLoggedIn 将被赋值为 true，否则为 false
      */
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

  // providers 列出 不同的 login options
  // Add providers with an empty array for now
  providers: [], 
} satisfies NextAuthConfig;