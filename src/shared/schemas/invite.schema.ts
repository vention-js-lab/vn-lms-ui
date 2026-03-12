import { z } from 'zod';
import { UserRole } from '../enums';

export const createInviteSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  role: z.enum(UserRole, 'Please select a valid role'),
});

export const acceptInviteSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type AcceptInviteFormValues = z.infer<typeof acceptInviteSchema>;
export type CreateInviteFormValues = z.infer<typeof createInviteSchema>;
