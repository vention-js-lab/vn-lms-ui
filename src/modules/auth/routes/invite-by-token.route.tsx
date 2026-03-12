import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Alert, AlertDescription } from '#/shared/components/ui/alert';
import { Button } from '#/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/shared/components/ui/card';
import { Input } from '#/shared/components/ui/input';
import { Label } from '#/shared/components/ui/label';
import { ROUTES } from '#/shared/constants';
import { getError } from '#/shared/lib/api-client';
import loginBackground from '../assets/login.background.png';
import { authApi } from '../api';
import { useInviteByToken } from '../hooks/queries';
import Error from '#/shared/components/ui/error';
import { Spinner } from '#/shared/components/ui/spinner';
import { acceptInviteSchema, type AcceptInviteFormValues } from '#/shared/schemas';

export function InviteByTokenRoute() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const { data, isLoading, isError, error } = useInviteByToken(token);

  const form = useForm<AcceptInviteFormValues>({
    resolver: zodResolver(acceptInviteSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const acceptInviteMutation = useMutation({
    mutationFn: (values: AcceptInviteFormValues) => authApi.acceptInvite(token, values.password),
    onSuccess: (res) => {
      navigate(ROUTES.AUTH.LOGIN, {
        replace: true,
        state: { successMessage: res.message },
      });
    },
  });

  const onSubmit = handleSubmit((values) => {
    acceptInviteMutation.mutate(values);
  });

  const backendErrorMessage = acceptInviteMutation.isError ? getError(acceptInviteMutation.error, 'message') : null;

  if (!token) {
    return (
      <Error
        message="Invalid invite link. No token provided."
        navigateTo={ROUTES.AUTH.LOGIN}
        status="404"
        goBackText="Go back to login"
      />
    );
  }

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Validating invite</CardTitle>
            <div className="flex flex-row justify-between items-center">
              <Spinner height={40} width={40} />
              <CardDescription>Please wait while we verify your invitation link.</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <Error
        message={getError(error, 'message')}
        navigateTo={ROUTES.AUTH.LOGIN}
        status={getError(error, 'statusCode')}
        goBackText="Go back to login"
      />
    );
  }

  return (
    <section className="flex flex-row-reverse w-screen items-center justify-center">
      <div
        className="flex min-h-screen w-1/2 items-center justify-center bg-cover bg-center bg-no-repeat opacity-65"
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <CardTitle className="text-4xl text-white">Welcome to LMS Platform</CardTitle>
      </div>
      <div className="flex min-h-screen w-1/2 items-center justify-center bg-white">
        <Card className="w-full max-w-sm border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-center">Accept Invitation</CardTitle>
            <CardDescription className="text-center">Set your password to activate your account</CardDescription>
          </CardHeader>

          <CardContent>
            {backendErrorMessage && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{backendErrorMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input disabled id="firstName" readOnly value={data.first_name} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input disabled id="lastName" readOnly value={data.last_name} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input disabled id="email" readOnly value={data.email} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password (8+ characters)"
                    disabled={acceptInviteMutation.isPending}
                    {...register('password')}
                  />
                  {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>

                <Button className="w-full" disabled={!isValid || acceptInviteMutation.isPending} type="submit">
                  {acceptInviteMutation.isPending ? 'Loading...' : 'Accept'}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Link className="block w-full pl-2 text-sm underline-offset-4 hover:underline" to={ROUTES.AUTH.LOGIN}>
              Already have an account? Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
