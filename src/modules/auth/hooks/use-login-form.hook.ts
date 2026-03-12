import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router';
import { useLoginMutation } from './use-login.mutation';
import { getError } from '#/shared/lib/api-client';
import { getSafeRedirect } from '#/shared/utils/router.util';
import { loginSchema, type LoginFormValues } from '#/shared/schemas';
import toast from 'react-hot-toast';

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
      onError: (error) => {
        const message = getError(error, 'message');
        toast.error(message);
      },
    });
  }

  const errorMessage = loginMutation.isError ? getError(loginMutation.error, 'message') : null;

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: loginMutation.isPending,
    errorMessage,
  };
}
