import { lazy, Suspense } from 'react'

import ErrorBoundary from '@/components/common/ErrorBoundary.jsx'
import  DataTable from '@/components/organisms/DataTable.jsx'
import { DueGenerateForm } from '@/components/organisms/DueGenerateForm.jsx'

const FeesSearchForm = lazy(
  () => import('@/components/organisms/FeesSearchForm.jsx')
)

export const FeesPageTemplate = ({ dueForm, searchForm, tableProps }) => {
  return (
    <div className="md:p-4 h-full flex flex-col gap-10 ">
      <div>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <DueGenerateForm
            className={'md:grid-cols-8'}
              form={dueForm.form}
              onSubmit={dueForm.onGenerate}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <FeesSearchForm
              form={searchForm.form}
              onSubmit={searchForm.onSearch}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className='w-full  overflow-x-auto'>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            {/* <FeesTable /> */}
            <DataTable
              data={tableProps.data}
              columns={tableProps.columns}
              pagination={tableProps.pagination}
              setPagination={tableProps.setPagination}
              totalCount={tableProps.totalCount}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}
