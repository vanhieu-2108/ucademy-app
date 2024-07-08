import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";
import { ILesson } from "@/database/lesson.model";

export type TActiveLinkProps = {
  url: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export type TMenuItem = {
  url: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
};

export type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

export type TCreateCourseParams = {
  title: string;
  slug: string;
  author: string;
};

export type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
};

export interface TCourseUpdateContentParams extends Omit<ICourse, "lectures"> {
  lectures: (Omit<ILecture, "lessons"> & {
    lessons: ILesson[];
  })[];
}

export type TCreateLectureParams = {
  title?: string;
  order?: string;
  course: string;
  path?: string;
};

export type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: string;
    _destroy?: boolean;
    path?: string;
  };
};

// Lesson
export type TCreateLessonParams = {
  lecture: string;
  course: string;
  title?: string;
  order?: string;
  path?: string;
  slug?: string;
};

export type TUpdateLessonParams = {
  lessonId: string;
  updateData: {
    title?: string;
    slug?: string;
    duration?: string;
    video_url?: string;
    content?: string;
  };
  path?: string;
};
