"use client";
import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/Course/CourseItem";
import { lastLessonKey } from "@/constants";
import { ICourse } from "@/database/course.model";

const StudyCourses = ({ courses }: { courses: ICourse[] }) => {
  if (!courses || courses.length <= 0) return null;
  let lastLesson: any[] = [];
  lastLesson = JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || [];
  return (
    <CourseGrid>
      {courses &&
        courses.map.length > 0 &&
        courses.map((course) => {
          const url =
            lastLesson.find((el: any) => el.course === course.slug)?.lesson ||
            "";
          return (
            <CourseItem
              key={course.slug}
              data={course}
              cta="Học tiếp"
              url={url}
            />
          );
        })}
    </CourseGrid>
  );
};

export default StudyCourses;
