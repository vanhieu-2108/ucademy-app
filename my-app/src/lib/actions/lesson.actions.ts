"use server";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson, { ILesson } from "@/database/lesson.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateLessonParams, TUpdateLessonParams } from "@/types";
import { revalidatePath } from "next/cache";

export async function createLesson(params: TCreateLessonParams) {
  try {
    connectToDatabase();
    const findLecture = await Lecture.findById(params.lecture);
    const findCourse = await Course.findById(params.course);
    if (!findLecture || !findCourse) return;
    const newLesson = await Lesson.create(params);
    findLecture.lessons.push(newLesson._id);
    await findLecture.save();
    if (!newLesson) return;
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateLesson(params: TUpdateLessonParams) {
  try {
    connectToDatabase();
    const res = await Lesson.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true },
    );
    if (!res) return;
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getLessonBySlug({
  slug,
  course,
}: {
  slug: string;
  course: string;
}): Promise<ILesson | undefined> {
  try {
    connectToDatabase();
    const findLesson = await Lesson.findOne({
      slug,
      course,
    }).select("title video_url content");
    return findLesson;
  } catch (error) {
    console.log(error);
  }
}

export async function findAllLesson({
  course,
}: {
  course: string;
}): Promise<ILesson[] | undefined> {
  try {
    connectToDatabase();
    const lessons = await Lesson.find({ course }).select(
      "title video_url content slug",
    );
    return JSON.parse(JSON.stringify(lessons)) as any[];
  } catch (error) {
    console.log(error);
  }
}
