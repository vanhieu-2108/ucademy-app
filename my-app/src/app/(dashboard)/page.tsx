import CourseItem from "@/components/Course/CourseItem";
import { CourseGrid } from "@/components/common";
import Heading from "@/components/common/Heading";
import { getAllCourses } from "@/lib/actions/course.actions";
export default async function page() {
  const courses = (await getAllCourses()) || [];
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses.map.length > 0 &&
          courses.map((course) => (
            <CourseItem key={course.slug} data={course} />
          ))}
      </CourseGrid>
    </div>
  );
}
