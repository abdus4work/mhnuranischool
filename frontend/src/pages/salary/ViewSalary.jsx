import { lazy, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import ErrorBoundary from '@/components/common/ErrorBoundary.jsx'
import { DueGenerateForm } from '@/components/organisms/DueGenerateForm.jsx'
import { getSalaryColumns } from '@/components/organisms/salaryColumns.jsx'
import FormTableLayout from '@/components/templates/FormTableLayout.jsx'
import PageContainer from '@/components/templates/PageContainer.jsx'
import { useGetAllSalary } from '@/hooks/salary/useGetAllSalary.js'
import { useGenerateSalary } from '@/hooks/salary/useGenerateSalary.js'

const SalarySearchForm = lazy(
  () => import('@/components/organisms/SalarySearchForm.jsx')
)

const ViewSalary = () => {
  const navigate = useNavigate()

  const dueForm = useForm({
    defaultValues: {
      month:new Date().getMonth(),
      year: new Date().getFullYear(),
    },
  })

  const searchForm = useForm({
    defaultValues: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      employeeId: '',
      status: 'due',
    },
  })

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const { data: salaryData, refetch: salaryRefetch } = useGetAllSalary({
    ...searchForm.watch(),
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  })

  const {mutate: generateDueSalary} = useGenerateSalary()

  const onSearch = () => {
    // Handle search logic here
    salaryRefetch()
    // You can use the data to filter or fetch specific salary records
    // For example, you might want to call an API with the search parameters
  }

  const onGenerate = (data) => {
    console.log('Generating salary for:', data)
    generateDueSalary(data)
  }

  const columns = getSalaryColumns(navigate)
  return (
    <PageContainer>
      <div className='w-full md:w-3/4 mb-4'>
        <ErrorBoundary>
        <DueGenerateForm
        className={'md:grid-cols-5'}
          form={dueForm}
          onSubmit={onGenerate}
        />
      </ErrorBoundary>
      </div>
      <FormTableLayout
        formComp={{
          component: SalarySearchForm,
          props: {
            form: searchForm,
            onSubmit: onSearch,
          },
        }}
        className={'w-full md:w-3/4'}
        tableProps={{
          columns,
          data: salaryData?.data || [], // Assuming you will fetch salary data and pass it here
          totalCount: salaryData?.meta?.totalDocuments || 0, // Replace with actual total count of salary records
          pagination,
          setPagination,
        }}
      />
    </PageContainer>
  )
}
export default ViewSalary
