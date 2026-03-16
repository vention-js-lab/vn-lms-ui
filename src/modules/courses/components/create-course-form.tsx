import { Alert, AlertDescription } from '#/shared/components/ui/alert';
import { Button } from '#/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/shared/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '#/shared/components/ui/field';
import { Input } from '#/shared/components/ui/input';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { type CreateCourseFormValues } from '../schemas/create-course.schema';
import RichTextEditable from '#/shared/components/rich-text/rich-text-editable';

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
    control,
  } = form;

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

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="create-course-form-description">Description</FieldLabel>

                  <RichTextEditable
                    id="create-course-form-description"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    disabled={isPending}
                    ariaInvalid={Boolean(fieldState.error)}
                  />

                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
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
