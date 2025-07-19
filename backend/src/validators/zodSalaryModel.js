import { z } from 'zod';

import { transactionSchema } from './paymentSchema.js';

export const salarySchema = z.object({
  staffId: z.string().length(24, 'Staff ID must be 24 characters long'),
  payment: transactionSchema,
});
