import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

// 这是一个异步函数组件，用于呈现客户页面
export default async function CustomersPage({
  // 接受一个名为 searchParams 的属性，它是一个可选对象
  searchParams,
}: {
  searchParams?: {
    // searchParams 对象中有一个可选属性 query，表示搜索查询字符串
    query?: string;
  };
}) {

  // 从 searchParams 对象中获取 query 属性，如果不存在则默认为空字符串
  const query = searchParams?.query || '';
    return (
      // 在加载 CustomersTable 组件时显示一个加载中的提示
      <Suspense fallback={<p>Loading...</p>}>
        {/* 将 query 作为 prop 传递给 CustomersTable 组件 */}
        <CustomersTable query={query}/>
      </Suspense>
    )
}
