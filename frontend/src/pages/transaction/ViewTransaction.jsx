import { useState } from 'react'
import { useNavigate } from 'react-router'

import { getTransactionColumns } from '@/components/organisms/transaction/transactionsColumns.jsx'
import FormTableLayout from '@/components/templates/FormTableLayout.jsx'
import PageContainer from '@/components/templates/PageContainer.jsx'
import { useGetTransactions } from '@/hooks/transaction/useGetTransactions.js'

const ViewTransactions = () => {
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const { data: transaction } = useGetTransactions(pagination)

  const columns = getTransactionColumns(navigate)
  return (
    <PageContainer>
      <FormTableLayout
        className={'md:w-3/4 '}
        tableProps={{
          columns,
          data: transaction?.data,
          totalCount: transaction?.meta?.totalDocuments,
          pagination,
          setPagination,
        }}
      />
    </PageContainer>
  )
}
export default ViewTransactions
