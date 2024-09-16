import StudyCourses from "@/app/(dashboard)/study/StudyCourses";
import Heading from "@/components/common/Heading";
import { getUserCourse } from "@/lib/actions/user.actions";

export default async function page() {
  const courses = await getUserCourse();
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourses courses={courses || []} />
    </>
  );
}
