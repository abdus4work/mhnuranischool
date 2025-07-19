import { lazy, Suspense } from 'react'

import ErrorBoundary from '@/components/common/ErrorBoundary.jsx'

const DataTable = lazy(()=>import('@/components/organisms/DataTable.jsx'));

export default function FormTableLayout({ formComp, tableProps, className }) {
  const { component: FormComponent, props: formProps } = formComp || {}
  return (
    <div className={`w-full md:w-2/3 overflow-x-auto flex flex-col gap-6 ${className}`}>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-10">
              Loading...
            </div>
          }>
          {FormComponent ? <FormComponent {...formProps} /> : null}
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-10">
              Loading...
            </div>
          }>
          <DataTable {...tableProps} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
