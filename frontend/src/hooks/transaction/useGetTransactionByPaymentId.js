import { useQuery } from '@tanstack/react-query'

import { getTransactionByPaymentIdRequest } from '@/api/transactionApi.js'

export const useGetTransactionByPaymentId = (paymentId) => {
  return useQuery({
    queryKey: ['getTransactionByPaymentId', paymentId],
    queryFn: () => getTransactionByPaymentIdRequest(paymentId),
    enabled: !!paymentId, // Only run the query if paymentId is provided
  })
}
