import { useQuery } from '@tanstack/react-query'

import { getAllStaffsRequest } from '@/api/staffApi.js'

export const useGetAllStaffs = (filter) => {
  return useQuery({
    queryKey: ['staffs', filter.pageIndex, filter.pageSize],
    queryFn: () => getAllStaffsRequest(filter),
  })
}
