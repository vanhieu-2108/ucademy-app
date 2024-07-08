import LessonNavigation from "@/app/(dashboard)/[course]/lesson/LessonNavigation";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLesson, getLessonBySlug } from "@/lib/actions/lesson.actions";
import Heading from "@/components/common/Heading";
import LessonContent from "@/components/lesson/LessonContent";

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string };
  searchParams: { slug: string };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  const courseId = findCourse?._id.toString();
  const lessonDetail = await getLessonBySlug({
    slug,
    course: courseId || "",
  });
  const lessonList = await findAllLesson({ course: courseId || "" });
  if (!findCourse || !lessonDetail || !lessonList) return null;
  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === lessonDetail.slug) || 0;
  const nextLesson = lessonList[currentLessonIndex + 1];
  const prevLesson = lessonList[currentLessonIndex - 1];
  const videoId = lessonDetail?.video_url?.split("v=")[1];
  const lectures = findCourse.lectures || [];
  return (
    <div className="grid min-h-screen gap-10 xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
      <div>
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
        <LessonContent
          lectures={lectures}
          course={course}
          lessonDetail={lessonDetail}
          url={true}
        />
      </div>
    </div>
  );
};

export default page;
