import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '#/shared/components/ui/button';
import { Card, CardContent } from '#/shared/components/ui/card';
import { Label } from '#/shared/components/ui/label';
import { Spinner } from '#/shared/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '#/shared/components/ui/alert';
import { ROUTES } from '#/shared/constants';
import { getError } from '#/shared/lib/api-client';
import { useAuth } from '#/shared/providers/auth';
import { UserRole } from '#/shared/enums';
import { useCoursesQuery } from '../hooks';
import type { Course, CourseState, ListCoursesResponse } from '../types';

const PAGE_SIZE = 10;
const STATE_LABELS: Record<CourseState, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

const STATE_STYLES: Record<CourseState, string> = {
  draft: 'bg-amber-100 text-amber-700',
  published: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-slate-200 text-slate-700',
};

type NormalizedCourses = {
  items: Course[];
  total?: number;
  page: number;
  limit: number;
};

function normalizeCoursesResponse(
  data: ListCoursesResponse | undefined,
  fallbackPage: number,
  fallbackLimit: number,
): NormalizedCourses {
  if (!data) {
    return { items: [], page: fallbackPage, limit: fallbackLimit };
  }

  if (Array.isArray(data)) {
    return { items: data, page: fallbackPage, limit: fallbackLimit };
  }

  const items = data.items ?? data.data ?? data.results ?? [];
  const meta = data.meta ?? {};

  return {
    items,
    total: data.total ?? meta.total,
    page: data.page ?? meta.page ?? fallbackPage,
    limit: data.limit ?? meta.limit ?? fallbackLimit,
  };
}

function getCreatorLabel(course: Course): string {
  if (course.creator?.name) {
    return course.creator.name;
  }

  if (course.creator?.email) {
    return course.creator.email;
  }

  return course.creator_id ?? 'Unknown';
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function CoursesRoute() {
  const auth = useAuth();
  const [stateFilter, setStateFilter] = useState<CourseState | 'all'>('all');
  const [page, setPage] = useState(1);

  const handleStateFilterChange = (value: CourseState | 'all') => {
    setStateFilter(value);
    setPage(1);
  };

  const params = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      ...(stateFilter !== 'all' ? { state: stateFilter } : {}),
    }),
    [page, stateFilter],
  );

  const coursesQuery = useCoursesQuery(params);
  const normalized = useMemo(() => normalizeCoursesResponse(coursesQuery.data, page, PAGE_SIZE), [coursesQuery.data, page]);

  const courses = normalized.items;
  const totalPages = normalized.total ? Math.max(1, Math.ceil(normalized.total / normalized.limit)) : null;
  const canGoBack = page > 1;
  const canGoForward = totalPages ? page < totalPages : courses.length === normalized.limit;

  const isTeacher = auth.user?.role === UserRole.INSTRUCTOR || auth.user?.role === UserRole.ADMIN;
  const createCoursePath = `${ROUTES.COURSES.ROOT}/${ROUTES.COURSES.CREATE}`;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Courses</h1>
          <p className="text-muted-foreground text-sm">Browse and manage the courses you have access to.</p>
        </div>
        {isTeacher && (
          <Button asChild>
            <Link to={createCoursePath}>Create Course</Link>
          </Button>
        )}
      </header>

      <div className="grid gap-4 md:grid-cols-[1fr_220px] md:items-end">
        <div className="space-y-2">
          <Label htmlFor="course-state">State</Label>
          <select
            id="course-state"
            value={stateFilter}
            onChange={(event) => handleStateFilterChange(event.target.value as CourseState | 'all')}
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs focus-visible:ring-[3px]"
          >
            <option value="all">All states</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {coursesQuery.isError && (
        <Alert variant="destructive">
          <AlertTitle>Unable to load courses</AlertTitle>
          <AlertDescription>{getError(coursesQuery.error, 'message')}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-muted-foreground border-b text-xs uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Title
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Creator
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    State
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {coursesQuery.isLoading && (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center">
                      <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                        <Spinner />
                        Loading courses...
                      </div>
                    </td>
                  </tr>
                )}

                {!coursesQuery.isLoading && courses.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-muted-foreground px-4 py-10 text-center text-sm">
                      No courses found. Try adjusting your filters.
                    </td>
                  </tr>
                )}

                {courses.map((course) => (
                  <tr key={course.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3">
                      <Link to={`${ROUTES.COURSES.ROOT}/${course.id}`} className="text-foreground font-medium hover:underline">
                        {course.title}
                      </Link>
                    </td>
                    <td className="text-muted-foreground px-4 py-3">{getCreatorLabel(course)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${STATE_STYLES[course.state]}`}
                      >
                        {STATE_LABELS[course.state]}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-4 py-3">{formatDate(course.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span>
          Page {page}
          {totalPages ? ` of ${totalPages}` : ''}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={!canGoBack}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={!canGoForward}>
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
