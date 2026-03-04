import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router';
import { useLoginMutation } from './use-login.mutation';
import { getErrorMessage } from '#/shared/lib/api-client';
import { getSafeRedirect } from '#/shared/utils/router.util';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginMutation = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values, {
      onSuccess: () => {
        const target = getSafeRedirect(searchParams.get('redirect'));
        navigate(target, { replace: true });
      },
    });
  }

  const errorMessage = loginMutation.isError ? getErrorMessage(loginMutation.error) : null;

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: loginMutation.isPending,
    errorMessage,
  };
}
