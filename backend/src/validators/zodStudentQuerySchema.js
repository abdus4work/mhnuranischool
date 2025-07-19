import { z } from 'zod';

export const zodStudentQuerySchema = z.object({
  roll: z.string().max(3).optional(),
  class: z.enum(['Nursery', 'Lower', 'Upper', 'One', 'Two', 'Three']).optional(),
  sec: z.enum(['A', 'B', 'C', 'D']).optional(),
  page:z.string().optional(),
  limit:z.string().optional()
});
