"use server";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateLectureParams, TUpdateLectureParams } from "@/types";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLectureParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {}
}

export async function updateLecture(params: TUpdateLectureParams) {
  try {
    connectToDatabase();
    const res = await Lecture.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true,
      },
    );
    if (!res) return;
    revalidatePath(params.updateData.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
