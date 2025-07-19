import { useQuery } from '@tanstack/react-query'

import { getFeesByStudentIdRequest } from '@/api/feesApi.js'

export const useGetStudentFees = (studentId) => {
  return useQuery({
    queryKey: ['studentFees', studentId],
    queryFn: () => getFeesByStudentIdRequest(studentId),
    enabled: !!studentId,
  })
}
