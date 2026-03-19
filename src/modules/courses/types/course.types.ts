export type CourseState = 'draft' | 'published' | 'archived';

export type CreateCourseRequest = {
  title: string;
  description: string;
  state?: CourseState;
};

export type CreateCourseResponse = {
  id: number;
  title: string;
  description: string;
  state: CourseState;
  creator_id: string;
  created_at: string;
  updated_at: string;
};
