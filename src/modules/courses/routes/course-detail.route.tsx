import { useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/components/ui/card';

export function CourseDetailRoute() {
  const { courseId } = useParams();

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Details for course <span className="text-foreground font-medium">{courseId}</span> will appear here.
        </CardContent>
      </Card>
    </section>
  );
}
