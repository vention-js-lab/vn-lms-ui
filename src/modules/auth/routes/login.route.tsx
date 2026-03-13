import { Alert, AlertDescription } from '#/shared/components/ui/alert';
import { Button } from '#/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/shared/components/ui/card';
import { Input } from '#/shared/components/ui/input';
import { Label } from '#/shared/components/ui/label';
import { Link } from 'react-router';
import { useLoginForm } from '#/modules/auth/hooks/use-login-form.hook';
import loginBackground from '#/modules/auth/assets/login.background.png';
import { ROUTES } from '#/shared/constants';

export function LoginRoute() {
  const { form, onSubmit, isPending, errorMessage } = useLoginForm();
  const {
    register,
    formState: { errors, isValid },
  } = form;

  return (
    <section className="flex w-screen items-center justify-center">
      <div
        className="flex min-h-screen w-1/2 items-center justify-center bg-cover bg-center bg-no-repeat opacity-65"
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <CardTitle className="text-4xl text-white">Welcome to LMS Platform</CardTitle>
      </div>
      <div className="flex min-h-screen w-1/2 items-center justify-center bg-white">
        <Card className="w-full max-w-sm border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to your LMS account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" {...register('email')} disabled={isPending} />
                  {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to={ROUTES.AUTH.FORGOT_PASSWORD} className="inline-block text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••" {...register('password')} disabled={isPending} />
                  {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={!isValid || isPending}>
                  {isPending ? 'Signing in...' : 'Login'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Link to={ROUTES.AUTH.RESEND_INVITE} className="block w-full pl-2 text-sm underline-offset-4 hover:underline">
              Resend an invite
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
