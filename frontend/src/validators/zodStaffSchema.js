import { z } from 'zod'

const zodStaffSchema = z.object({
  password: z.string().trim(),
  role: z.enum(['admin', 'teacher', 'student']),
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters long' })
    .max(50, { message: 'Full name must be at most 50 characters long' }),
  contactNumber: z
    .string()
    .min(10, { message: 'Contact number must be at least 10 characters long' })
    .max(15, { message: 'Contact number must be at most 15 characters long' })
    .regex(/^[\d\s+()-]*$/, {
      message: 'Contact number must contain only digits',
    }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .optional()
    .or(z.literal('')),
  address: z
    .string()
    .min(3, { message: 'Address must be at least 3 characters long' })
    .max(500, { message: 'Address must be at most 500 characters long' }),
  dateOfJoining: z
    .string()
    .refine(
      (date) => {
        const parsedDate = new Date(date)
        return !isNaN(parsedDate.getTime())
      },
      { message: 'Invalid date format' }
    )
    .refine(
      (date) => {
        const parsedDate = new Date(date)
        return parsedDate < new Date()
      },
      { message: 'Date must be in the past' }
    ),
  salary: z.number().positive('Salary must be a positive number'),
})

export default zodStaffSchema

export const updateStaffSchema = zodStaffSchema
  .omit({ password: true })
  .partial()
