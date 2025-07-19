import { z } from 'zod';

export const transactionSchema = z.object({
  payee: z.string().length(24, 'User ID must be 24 characters long'),
  type: z.enum(['FEES', 'SALARY']),
  amount: z.number().positive('Amount must be a positive number'),
  month: z
    .number()
    .int()
    .min(1, 'Month must be between 1 and 12')
    .max(12, 'Month must be between 1 and 12'),
  year: z.number().gte(2020, 'Year must be a valid year'),
  paymentDate: z.string().refine((date, ctx) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid date format'
      });
      return false;
    }
    if (dateObj > new Date()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Payment date cannot be in the future'
      });
      return false;
    }
    return true;
  }),
  paymentReference: z.string().min(2, 'Payment reference is required'),
  paymentMethod: z.enum(['CASH', 'BANK_TRANSFER', 'UPI']),
  notes: z.string().optional()
});
