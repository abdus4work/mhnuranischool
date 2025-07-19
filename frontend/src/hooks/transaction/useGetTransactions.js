import { useQuery } from '@tanstack/react-query'

import { getTransactionRequest } from '@/api/transactionApi.js'

export const useGetTransactions = (filter) => {
  return useQuery({
    queryKey: ['getTransaction', filter.pageIndex, filter.pageSize],
    queryFn: () => getTransactionRequest(filter),
  })
}
