import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { getError } from '#/shared/lib/api-client';
import { createCourseDefaultValues, createCourseSchema, type CreateCourseFormValues } from '../schemas/create-course.schema';
import { useCreateCourseMutation } from './use-course-mutations';
import { ROUTES } from '#/shared/constants';

export function useCreateCourseForm() {
  const navigate = useNavigate();
  const createCourseMutation = useCreateCourseMutation();

  const form = useForm<CreateCourseFormValues>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: createCourseDefaultValues,
  });

  function onSubmit(values: CreateCourseFormValues) {
    createCourseMutation.mutate(values, {
      onSuccess: (course) => {
        toast.success(`Course created: ${course.title}`);
        form.reset(createCourseDefaultValues);
        navigate(ROUTES.COURSES.ROOT, { replace: true });
      },
    });
  }

  const errorMessage = createCourseMutation.isError ? getError(createCourseMutation.error, 'message') : null;

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: createCourseMutation.isPending,
    errorMessage,
  };
}
