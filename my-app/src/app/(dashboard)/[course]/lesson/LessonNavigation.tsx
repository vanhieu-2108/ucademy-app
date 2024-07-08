"use client";
import { IconLeft, IconRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ILesson } from "@/database/lesson.model";
import { useRouter } from "next/navigation";
const LessonNavigation = ({
  nextLesson,
  prevLesson,
  course,
}: {
  nextLesson: ILesson | undefined;
  prevLesson: ILesson | undefined;
  course: string;
}) => {
  const router = useRouter();
  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-1"
        onClick={() =>
          router.push(`/${course}/lesson?slug=${prevLesson?.slug}`)
        }
        disabled={!prevLesson}
      >
        <IconLeft />
      </Button>
      <Button
        className="size-10 p-1"
        onClick={() =>
          router.push(`/${course}/lesson?slug=${nextLesson?.slug}`)
        }
        disabled={!nextLesson}
      >
        <IconRight />
      </Button>
    </div>
  );
};

export default LessonNavigation;
