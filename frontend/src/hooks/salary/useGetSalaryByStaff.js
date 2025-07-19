import { useQuery } from '@tanstack/react-query'

import { getSalaryRequest } from '@/api/salaryApi.js'

export const useGetSalaryByStaff = (staffId) => {
  return useQuery({
    queryKey: ['salary', staffId],
    queryFn: () => getSalaryRequest(staffId),
    enabled: !!staffId,
  })
}
