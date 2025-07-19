import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { updateStudentRequest } from '@/api/studentApi.js'

export const useUpdateStudent = () => {
  return useMutation({
    mutationFn: ({ id, data }) => updateStudentRequest(id, data),
    onSuccess: (data) => {
      console.log('Student updated successfully:', data)
      toast.success('Student updated successfully')
    },
    onError: (error) => {
      console.error('Error updating student:', error)
      toast.error('Failed to update student')
    },
  })
}
