import { useQuery } from '@tanstack/react-query'

import { getAllFeesRequest } from '@/api/feesApi.js'

export const useGetAllFees = (filter) => {
  return useQuery({
    queryKey: ['fees', filter.pageIndex, filter.pageSize],
    queryFn: () => getAllFeesRequest(filter),
  })
}
