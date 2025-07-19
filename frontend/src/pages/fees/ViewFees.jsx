import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { getFeesColumns } from '@/components/organisms/feesColumns.jsx'
import { FeesPageTemplate } from '@/components/templates/FeesPageTemplate.jsx'
import { useGenerateFees } from '@/hooks/fees/useGenerateFees.js'
import { useGetAllFees } from '@/hooks/fees/useGetAllFees.js'

export const ViewFees = () => {
  const navigate = useNavigate()
  const dueForm = useForm({
    defaultValues: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
  })

  const feesSearchForm = useForm({
    defaultValues: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      class: '',
      section: '',
      rollNumber: '',
      status: 'due',
    },
  })

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const feesRecords = useGetAllFees({
    ...feesSearchForm.watch(),
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  })
  const columns = getFeesColumns(navigate)

  const onGenerate = (data) => {
    console.log(data)
    generateDueFees.mutate(data)
  }

  const onSearch = () => {
    feesRecords.refetch()
  }
  const generateDueFees = useGenerateFees()

  useEffect(() => {
    feesRecords.refetch()
    console.log(feesRecords.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize])

  return (
    <FeesPageTemplate
      dueForm={{ form: dueForm, onGenerate }}
      searchForm={{ form: feesSearchForm, onSearch }}
      tableProps={{
        pagination: pagination,
        setPagination: setPagination,
        columns,
        data: feesRecords.data?.data,
        totalCount: feesRecords.data?.meta?.totalDocuments || 0,
      }}
    />
  )
}
