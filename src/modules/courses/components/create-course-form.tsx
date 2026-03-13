import { Alert, AlertDescription } from '#/shared/components/ui/alert';
import { Button } from '#/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/shared/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '#/shared/components/ui/field';
import { Input } from '#/shared/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '#/shared/components/ui/input-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '#/shared/components/ui/select';
import type { UseFormReturn } from 'react-hook-form';
import { courseStates, type CreateCourseFormValues } from '../schemas/create-course.schema';

type CreateCourseFormProps = {
  form: UseFormReturn<CreateCourseFormValues>;
  onSubmit: ReturnType<UseFormReturn<CreateCourseFormValues>['handleSubmit']>;
  isPending: boolean;
  errorMessage: string | null;
};

export function CreateCourseForm({ form, onSubmit, isPending, errorMessage }: CreateCourseFormProps) {
  const {
    reset,
    formState: { errors },
    register,
  } = form;
  const description = form.watch('description');
  const state = form.watch('state');

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create Course</CardTitle>
        <CardDescription>Fill in the course details below.</CardDescription>
      </CardHeader>

      <CardContent>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form id="create-course-form" onSubmit={onSubmit}>
          <FieldGroup>
            <Field data-invalid={Boolean(errors.title)}>
              <FieldLabel htmlFor="create-course-form-title">Course Title</FieldLabel>
              <Input
                id="create-course-form-title"
                aria-invalid={Boolean(errors.title)}
                placeholder="Node.js Fundamentals"
                autoComplete="off"
                disabled={isPending}
                {...register('title')}
              />
              {errors.title && <FieldError errors={[errors.title]} />}
            </Field>

            <Field data-invalid={Boolean(errors.description)}>
              <FieldLabel htmlFor="create-course-form-description">Description</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="create-course-form-description"
                  placeholder="This course covers the basics of Node.js, modules, async flow, and APIs."
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={Boolean(errors.description)}
                  disabled={isPending}
                  {...register('description')}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">{description.length}/2000 characters</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.description && <FieldError errors={[errors.description]} />}
            </Field>

            <Field data-invalid={Boolean(errors.state)}>
              <FieldLabel htmlFor="create-course-form-state">State</FieldLabel>
              <Select
                value={state}
                onValueChange={(value) =>
                  form.setValue('state', value as CreateCourseFormValues['state'], { shouldDirty: true, shouldValidate: true })
                }
              >
                <SelectTrigger id="create-course-form-state" aria-invalid={Boolean(errors.state)} disabled={isPending}>
                  <SelectValue placeholder="Select course state" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectGroup>
                    {courseStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.state && <FieldError errors={[errors.state]} />}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => reset()} disabled={isPending}>
            Reset
          </Button>
          <Button type="submit" form="create-course-form" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Course'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
