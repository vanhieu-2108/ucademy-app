import { TCourseUpdateContentParams } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "@/components/lesson/LessonItem";
import { ILesson } from "@/database/lesson.model";
import { IHistory } from "@/database/history.model";
const LessonContent = ({
  lectures,
  course,
  lessonDetail,
  url,
  histories,
}: {
  lectures: TCourseUpdateContentParams["lectures"];
  course?: string;
  lessonDetail?: ILesson;
  url?: boolean | undefined;
  histories: IHistory[];
}) => {
  return (
    <div className="flex max-h-[calc(100svh-50px)] flex-col gap-5 overflow-y-auto pb-20 lg:pb-0">
      {lectures.map((lecture) => (
        <Accordion
          type="single"
          className="w-full"
          key={lecture._id}
          collapsible
        >
          <AccordionItem value={lecture._id}>
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between gap-3 pr-5">
                <div className="line-clamp-1">{lecture.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-none !bg-transparent p-0">
              <div className="mt-2 flex flex-col gap-3">
                {lecture.lessons.map((lesson) => (
                  <LessonItem
                    lesson={lesson}
                    key={lesson._id}
                    url={
                      url ? `/${course}/lesson?slug=${lesson.slug}` : undefined
                    }
                    isActive={lessonDetail?.slug === lesson.slug}
                    isChecked={
                      url &&
                      histories.some(
                        (history) =>
                          history.lesson.toString() === lesson._id.toString(),
                      )
                    }
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
export default LessonContent;
