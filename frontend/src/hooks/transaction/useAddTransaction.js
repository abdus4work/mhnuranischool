import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { addTransactionRequest } from '@/api/transactionApi.js'

export const useAddTransaction = (setOpenDialog) => {
  return useMutation({
    mutationFn: addTransactionRequest,
    onSuccess: () => {
      toast.success('Transaction added successfully', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
        setOpenDialog(true) 
    },
    onError: (error) => {
      console.error('Error adding transaction:', error)
      toast.error('Failed to add transaction', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
    },
  })
}
