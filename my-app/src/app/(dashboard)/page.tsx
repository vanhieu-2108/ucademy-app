import CourseItem from "@/components/Course/CourseItem";
import { CourseGrid } from "@/components/common";
import Heading from "@/components/typography/Heading";
import createUser from "@/lib/actions/user.actions";

export default async function page() {
  const user = await createUser({
    clerkId: "clerk_123",
    email_address: "levanhieusona@gmail.com",
    username: "vanhieu",
  });
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </div>
  );
}
