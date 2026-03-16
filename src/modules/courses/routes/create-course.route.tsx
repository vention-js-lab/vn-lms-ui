import { CreateCourseForm } from '../components/create-course-form';
import { useCreateCourseForm } from '../hooks';

export function CreateCourseRoute() {
  const { form, onSubmit, isPending, errorMessage } = useCreateCourseForm();

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <CreateCourseForm form={form} onSubmit={onSubmit} isPending={isPending} errorMessage={errorMessage} />
    </section>
  );
}
