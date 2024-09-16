"use client";

import { lastLessonKey } from "@/constants";
import { useEffect } from "react";

const LessonSaveURl = ({ url, course }: { url: string; course: string }) => {
  useEffect(() => {
    let results: any =
      JSON.parse(localStorage.getItem(lastLessonKey) || "[]") || [];
    const item = {
      course,
      lesson: url,
    };
    results = results.filter((el: any) => el.course !== course);
    results.push(item);
    localStorage.setItem(lastLessonKey, JSON.stringify(results));
  }, [url, course]);
  return null;
};

export default LessonSaveURl;
