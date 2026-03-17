import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '#/shared/components/ui/alert';
import { Button } from '#/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/shared/components/ui/card';
import { Input } from '#/shared/components/ui/input';
import { Label } from '#/shared/components/ui/label';
import { getError } from '#/shared/lib/api-client';
import { authApi } from '#/modules/auth/api';
import { createInviteSchema, type CreateInviteFormValues } from '#/shared/schemas';
import toast from 'react-hot-toast';

export default function InviteManagementRoute() {
  const form = useForm<CreateInviteFormValues>({
    resolver: zodResolver(createInviteSchema),
    mode: 'onChange',
    defaultValues: { firstName: '', lastName: '', email: '', role: 'student' },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const inviteMutation = useMutation({
    mutationFn: (values: CreateInviteFormValues) => authApi.createInvite(values),
    onSuccess: (_res, vars) => {
      toast.success(`Invite sent to ${vars.email}`);
      reset();
    },
    onError: (error) => {
      const message = getError(error, 'message');
      toast.error(message);
    },
  });

  const backendError = inviteMutation.isError ? getError(inviteMutation.error, 'message') : null;

  const onSubmit = handleSubmit((values) => inviteMutation.mutate(values));

  return (
    <section className="flex w-screen flex-row-reverse items-center justify-center bg-white">
      <div className="flex min-h-screen w-full items-center justify-center bg-white md:w-1/2">
        <Card className="w-full max-w-sm border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold"> Invite Management </CardTitle>
            <CardDescription className="text-center"> Create and send invitations to new team members </CardDescription>
          </CardHeader>

          <CardContent>
            {backendError && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{backendError} </AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-8">
                <div className="grid gap-2">
                  <Label htmlFor="firstName"> First Name </Label>
                  <Input id="firstName" placeholder="Enter first name" {...register('firstName')} />
                  {errors.firstName && <p className="text-destructive text-sm"> {errors.firstName.message} </p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastName"> Last Name </Label>
                  <Input id="lastName" placeholder="Enter last name" {...register('lastName')} />
                  {errors.lastName && <p className="text-destructive text-sm"> {errors.lastName.message} </p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email"> Email </Label>
                  <Input id="email" type="email" placeholder="Enter email" {...register('email')} />
                  {errors.email && <p className="text-destructive text-sm"> {errors.email.message} </p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role"> Role </Label>
                  <select
                    id="role"
                    aria-label="Role"
                    className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none"
                    {...register('role')}
                  >
                    <option value="student">Student</option>
                    <option value="hr">HR</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors.role && <p className="text-destructive text-sm"> {errors.role.message} </p>}
                </div>

                <Button className="w-full" disabled={!isValid || inviteMutation.isPending} type="submit">
                  {inviteMutation.isPending ? 'Creating...' : 'Create Invite'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
