import { z } from 'zod'

export const transactionSchema = z.object({
  payee: z.string().length(24, 'User ID must be 24 characters long'),
  type: z.enum(['FEES', 'SALARY']),
  amount: z.number().min(1,'Amount must be at least 1').positive('Amount must be a positive number'),
  month: z
    .number()
    .int()
    .min(1, 'Month must be between 1 and 12')
    .max(12, 'Month must be between 1 and 12'),
  year: z.number().gte(2020, 'Year must be a valid year'),
  paymentDate: z.string(),
  paymentReference: z.string().min(2, 'Payment reference is required'),
  paymentMethod: z.enum(['CASH', 'BANK_TRANSFER', 'UPI']),
  notes: z.string().optional(),
})
