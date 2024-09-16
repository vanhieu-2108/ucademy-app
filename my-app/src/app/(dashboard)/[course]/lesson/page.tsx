import LessonNavigation from "@/app/(dashboard)/[course]/lesson/LessonNavigation";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLesson } from "@/lib/actions/lesson.actions";
import Heading from "@/components/common/Heading";
import LessonContent from "@/components/lesson/LessonContent";
import { getHistory } from "@/lib/actions/history.actions";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import PageNotFound from "@/app/not-found";
import LessonSaveURl from "@/app/(dashboard)/[course]/lesson/LessonSaveURl";

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string };
  searchParams: { slug: string };
}) => {
  const { userId } = auth();
  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />;
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  const courseId = findCourse?._id.toString() || "";
  if (!findUser.courses.includes(courseId as any)) return <PageNotFound />;
  const lessonList = await findAllLesson({ course: courseId || "" });
  const lessonDetail = lessonList?.find((el) => el.slug === slug);
  if (!findCourse || !lessonList || !lessonDetail) return null;
  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === slug) || 0;
  const nextLesson = lessonList[currentLessonIndex + 1];
  const prevLesson = lessonList[currentLessonIndex - 1];
  const videoId = lessonDetail?.video_url?.split("v=")[1];
  const lectures = findCourse.lectures || [];
  const histories = await getHistory({ course: courseId });
  const completePercentage =
    ((histories?.length || 0) / lessonList.length) * 100;
  return (
    <div className="grid min-h-screen gap-10 xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
      <div>
        <LessonSaveURl url={`/${course}/lesson?slug=${slug}`} course={course} />
        <div className="relative mb-5 aspect-video">
          <iframe
            width="1404"
            height="480"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Ổ QUỶ REMAKE Bởi #CoEmMuzik | Làm Beat Cùng Thái Sơn Beatbox"
            allowFullScreen
            className="h-full w-full object-fill"
          ></iframe>
        </div>
        <div className="mb-5 flex items-center justify-between">
          <LessonNavigation
            course={course}
            nextLesson={nextLesson}
            prevLesson={prevLesson}
          />
        </div>
        <Heading classname="mb-10">{lessonDetail.title}</Heading>
        <div className="bgDarkMode borderDarkMode entry-content rounded-lg border p-5">
          <div
            dangerouslySetInnerHTML={{
              __html: lessonDetail.content
                ? lessonDetail.content
                : "no-content",
            }}
          ></div>
        </div>
      </div>
      <div>
        <div className="sticky right-0 top-5">
          <div className="flex items-center gap-4">
            <div className="borderDarkMode bgDarkMode mb-2 h-3 w-full gap-4 rounded-full border">
              <div
                className="bg-gradient h-full w-0 rounded-full transition-all duration-300"
                style={{
                  width: `${completePercentage}%`,
                }}
              />
            </div>
            <span className="mb-2 text-base font-medium">{`${completePercentage}%`}</span>
          </div>
          <LessonContent
            lectures={lectures}
            course={course}
            lessonDetail={lessonDetail}
            url={true}
            histories={histories ? histories : []}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
