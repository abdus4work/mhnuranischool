import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { generateDueSalaryRequest } from '@/api/salaryApi.js'

export const useGenerateSalary = () => {
  return useMutation({
    mutationFn: generateDueSalaryRequest,
    onSuccess: (data) => {
      console.log('Salary generated successfully:', data)
      toast.success('Salary generated successfully!')
    },
    onError: (error) => {
      console.error('Error generating salary:', error)
      toast.error('Failed to generate salary. Please try again.')
    },
  })
}
