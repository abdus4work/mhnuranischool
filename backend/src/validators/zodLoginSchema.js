import {z} from 'zod';

export const zodLoginSchema = z.object({
    username:z
    .string()
    .trim(),
    password:z
    .string()
    .trim()
})