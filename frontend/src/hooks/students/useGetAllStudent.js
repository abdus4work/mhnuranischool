import { useQuery } from '@tanstack/react-query'

import { getAllStudentRequest } from '@/api/studentApi.js'

export const useGetAllStudent = (filter) => {
  const result = useQuery({
    queryKey: ['students', filter.pageIndex, filter.pageSize],
    queryFn: () => getAllStudentRequest(filter),
  })
  return result
}
