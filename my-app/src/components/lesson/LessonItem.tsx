import { IconPlay } from "@/components/icons";
import { ILesson } from "@/database/lesson.model";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LessonItem = ({
  lesson,
  url,
  isActive,
}: {
  lesson: ILesson;
  url?: string;
  isActive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "borderDarkMode bgDarkMode flex items-center gap-4 rounded-lg border p-3 text-sm font-medium",
        isActive ? "pointer-events-none font-semibold text-primary" : "",
      )}
    >
      <IconPlay className="size-5" />
      {url ? (
        <Link href={`${url}`} className="line-clamp-1">
          {lesson.title}
        </Link>
      ) : (
        <h4>{lesson.title}</h4>
      )}
      <span className="ml-auto flex-shrink-0 text-xs font-semibold">
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
