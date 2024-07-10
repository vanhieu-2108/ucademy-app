"use client";
import { IconPlay } from "@/components/icons";
import { ILesson } from "@/database/lesson.model";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { createHistory } from "@/lib/actions/history.actions";
const LessonItem = ({
  lesson,
  url,
  isActive = false,
  isChecked = false,
}: {
  lesson: ILesson;
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: lesson.course.toString(),
        lesson: lesson._id,
        checked,
        path: url || "/",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={cn(
        "borderDarkMode bgDarkMode flex items-center gap-4 rounded-lg border p-3 text-sm font-medium",
        isActive ? "font-semibold text-primary" : "",
      )}
    >
      {url && (
        <Checkbox
          defaultChecked={isChecked}
          className="flex-shrink-0"
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}
      <IconPlay className="size-5" />
      {url ? (
        <Link
          href={`${url}`}
          className={cn("line-clamp-1", isActive && "pointer-events-none")}
        >
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
