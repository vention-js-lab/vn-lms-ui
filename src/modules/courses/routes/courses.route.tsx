import { Link } from 'react-router';
import { Button } from '#/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/shared/components/ui/card';
import { ROUTES } from '#/shared/constants';

export function CoursesRoute() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>
            Course listing is not wired yet, but you can already create new courses from this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm">
            Start by creating your first course and we’ll bring the rest of the flow around it.
          </p>
          <Button asChild>
            <Link to={ROUTES.COURSES.CREATE}>Create Course</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
