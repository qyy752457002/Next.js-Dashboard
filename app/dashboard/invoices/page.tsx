import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices',
};
 
// 这是一个异步函数组件，用于呈现页面
export default async function Page({
  // 接受一个名为 searchParams 的属性，它是一个可选对象
  searchParams,
}: {
  searchParams?: {
    // searchParams 对象中有两个可选属性: query 和 page，分别表示搜索查询字符串和当前页码
    query?: string;
    page?: string;
  };
}) {
  // 从 searchParams 对象中获取 query 属性，如果不存在则默认为空字符串
  const query = searchParams?.query || '';
  // 从 searchParams 对象中获取 page 属性，如果不存在或者无法转换为数字，则默认为第一页
  const currentPage = Number(searchParams?.page) || 1;
 
  // 获取发票的总页数
  const totalPages = await fetchInvoicesPages(query);
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        {/* 显示标题 */}
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* 搜索框 */}
        <Search placeholder="Search invoices..." />
        {/* 创建发票按钮 */}
        <CreateInvoice />
      </div>
      {/* 加载发票表格，显示加载占位符 */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      {/* 分页组件 */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
