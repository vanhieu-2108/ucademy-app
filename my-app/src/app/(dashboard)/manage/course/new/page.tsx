import Heading from "@/components/common/Heading";
import CourseAddNew from "@/components/Course/CourseAddNew";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserInfo({ userId });
  if (!mongoUser) return null;
  return (
    <>
      <Heading>Tạo khóa học mới</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))} />
    </>
  );
};

export default page;
