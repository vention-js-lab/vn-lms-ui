import { z } from 'zod';

export const courseStates = ['draft', 'published', 'archived'] as const;

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(5, 'Course title must be at least 5 characters.')
    .max(255, 'Course title must be at most 255 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.')
    .max(2000, 'Description must be at most 2000 characters.'),
  state: z.enum(courseStates),
});

export type CreateCourseFormValues = z.infer<typeof createCourseSchema>;

export const createCourseDefaultValues: CreateCourseFormValues = {
  title: '',
  description: '',
  state: 'draft',
};
