import { z } from 'zod';

import { transactionSchema } from './paymentSchema.js';

export const zodStudentFeesSchema = z.object({
  studentId: z.string().length(24),
  payment: transactionSchema
});


