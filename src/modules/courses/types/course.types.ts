export type CourseState = 'draft' | 'published' | 'archived';

export type Course = {
  id: number;
  title: string;
  description: string;
  state: CourseState;
  creator_id?: string;
  creator?: { id: string; name?: string; email?: string };
  created_at: string;
  updated_at?: string;
};

export type CreateCourseRequest = {
  title: string;
  description: string;
  state?: CourseState;
};

export type CreateCourseResponse = Course;

export type ListCoursesParams = {
  page?: number;
  limit?: number;
  state?: CourseState;
  search?: string;
};

export type ListCoursesResponse =
  | Course[]
  | {
      items?: Course[];
      data?: Course[];
      results?: Course[];
      total?: number;
      page?: number;
      limit?: number;
      meta?: { total?: number; page?: number; limit?: number };
    };
