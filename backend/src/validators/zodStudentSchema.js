import { z } from 'zod';

export const zodStudentCreateSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
  fullName: z
    .string()
    .trim()
    .min(3, 'Full name must be at least 3 characters long')
    .max(50, 'Full name must be at most 50 characters long'),

  class: z.enum(['Nursery', 'Lower', 'Upper', 'One', 'Two', 'Three']),

  section: z.enum(['A', 'B', 'C', 'D', 'E']),

  rollNumber: z
    .string()
    .trim()
    .min(2, 'Roll number must be at least 2 characters long')
    .max(10)
    .regex(
      /^[a-zA-Z0-9]+$/,
      'Roll number can only contain letters and numbers'
    ),

  guardianName: z
    .string()
    .trim()
    .min(3, 'Guardian name must be at least 3 characters long')
    .max(50, 'Guardian name must be at most 50 characters long'),

  guardianContact: z
    .string()
    .trim()
    .min(10, 'Must be at least 10 digits')
    .max(15, 'Must be at most 15 digits')
    .regex(/^[\d\s+()-]*$/, 'Contact must only contain digits'),

  address: z
    .string()
    .trim()
    .min(3, 'Address must be at least 3 characters long')
    .max(500, 'Address must be at most 500 characters long'),

  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters long')
    .max(50, 'Email must be at most 50 characters long')
    .optional()
    .or(z.literal('')),

  dateOfBirth: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, 'Invalid date format')
    .refine((date) => {
      const parsedDate = new Date(date);
      return parsedDate < new Date();
    }, 'Date must be in the past'),
  admissionDate: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, 'Invalid date format')
    .refine((date) => {
      const parsedDate = new Date(date);
      return parsedDate < new Date();
    }, 'Date must be in the past')
    .optional()
    .or(z.literal('')),
  academicYear: z.string().refine(
    (year) => {
      const parsedYear = parseInt(year, 10);
      const currentYear = new Date().getFullYear();
      return parsedYear >= currentYear - 5 && parsedYear <= currentYear + 5;
    },
    {
      message: 'Academic year must be within 5 years of the current year'
    }
  ),
  monthlyFees: z.number().positive('Monthly fees must be a positive number')
});

export const zodStudentUpdateSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Full name must be at least 3 characters long')
    .max(50, 'Full name must be at most 50 characters long')
    .optional(),
  guardianName: z
    .string()
    .trim()
    .min(3, 'Guardian name must be at least 3 characters long')
    .max(50, 'Guardian name must be at most 50 characters long')
    .optional(),

  guardianContact: z
    .string()
    .trim()
    .min(10, 'Must be at least 10 digits')
    .max(15, 'Must be at most 15 digits')
    .regex(/^[\d\s+()-]*$/, 'Contact must only contain digits')
    .optional(),

  address: z
    .string()
    .trim()
    .min(3, 'Address must be at least 3 characters long')
    .max(500, 'Address must be at most 500 characters long')
    .optional(),

  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters long')
    .max(50, 'Email must be at most 50 characters long')
    .optional()
    .or(z.literal('')),

  admissionDate: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, 'Invalid date format')
    .refine((date) => {
      const parsedDate = new Date(date);
      return parsedDate < new Date();
    }, 'Date must be in the past')
    .optional()
    .or(z.literal('')),

  academicYear: z
    .string()
    .refine(
      (year) => {
        const parsedYear = parseInt(year, 10);
        const currentYear = new Date().getFullYear();
        return parsedYear >= currentYear - 5 && parsedYear <= currentYear + 5;
      },
      {
        message: 'Academic year must be within 5 years of the current year'
      }
    )
    .optional()
});
