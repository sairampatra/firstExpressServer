import {z}from 'zod'
export const zodSignupSchema = z.object({
    username: z.string().min(1, 'User name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})