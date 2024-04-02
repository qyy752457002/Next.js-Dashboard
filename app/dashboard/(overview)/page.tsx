import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

/*

  这段代码是使用React中的`Suspense`组件和`fallback`属性进行代码分割（Code Splitting）的一种常见方式。
  下面是对代码的解释：

  1. `<Suspense>`：`Suspense`是React提供的一个组件，用于处理异步加载的组件或数据。

                    它允许你在加载数据或组件时显示一个后备（fallback）内容，
                    以避免用户看到空白页面或加载状态。

  2. `fallback={<CardsSkeleton />}`：`fallback`是`Suspense`组件的一个属性，用于指定加载数据或组件时显示的后备内容。

                                      在这里，`<CardsSkeleton />`是一个占位符组件，
                                      用于在加载数据时显示加载状态或占位符。

                                      当`<CardWrapper />`组件加载时，
                                      如果数据尚未准备好，将会显示`<CardsSkeleton />`组件。

  3. `<CardWrapper />`：这是要异步加载的主要组件，可能是一个比较大或者耗时的组件。

                        在使用`Suspense`时，你可以将一些耗时较长的组件进行代码分割，
                        只在需要时再进行加载，以提高页面加载性能和用户体验。

  总之，这段代码的作用是在加载`<CardWrapper />`组件时显示一个加载状态的占位符`<CardsSkeleton />`，
  以提高用户体验并避免空白页面的出现。

*/
 
// 这是一个异步函数组件，用于呈现页面
export default async function Page() {
  
  return (
    // 页面的主要内容部分
    <main>
      {/* 页面标题 */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {/* 卡片区域 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* 加载 CardWrapper 组件，显示加载占位符 */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      {/* 统计图表和最新发票区域 */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* 加载 RevenueChart 组件，显示加载占位符 */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        {/* 加载 LatestInvoices 组件，显示加载占位符 */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}