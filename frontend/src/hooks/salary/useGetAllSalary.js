import { getAllSalariesRequest } from '@/api/salaryApi.js'
import { useQuery } from '@tanstack/react-query'


export const useGetAllSalary = (filter)=>{
  return useQuery({
    queryKey: ['salary', filter.pageIndex, filter.pageSize],
    queryFn: ()=>getAllSalariesRequest(filter),
  })
}