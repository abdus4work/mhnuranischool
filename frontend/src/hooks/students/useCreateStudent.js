import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createStudentRequest } from '@/api/studentApi.js'

export const useCreateStudent = () => {
  const mutation = useMutation({
    mutationFn: createStudentRequest,
    onSuccess: (response) => {
      console.log('Successfully student created', response)
      toast.success('Student Successfully created')
    },
    onError: (error) => {
      console.log(error)
      toast.error(error?.message)
    },
  })
  return mutation
}
