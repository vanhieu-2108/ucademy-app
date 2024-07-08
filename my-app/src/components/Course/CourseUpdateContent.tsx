"use client";
import { IconCheck, IconClose, IconDelete, IconEdit } from "@/components/icons";
import LessonItemUpdate from "@/components/lesson/LessonItemUpdate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { commonClassNames } from "@/constants";
import { ILecture } from "@/database/lecture.model";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { createLesson, updateLesson } from "@/lib/actions/lesson.actions";
import { cn } from "@/lib/utils";
import { TCourseUpdateContentParams } from "@/types";
import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";

const CourseUpdateContent = ({
  course,
}: {
  course: TCourseUpdateContentParams;
}) => {
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");
  const lectures = course.lectures;
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: String(lectures.length + 1),
        path: `/manage/course/update-content?slug=${course.slug}`,
      });
      if (res?.success) {
        toast.success("Thêm chương mới thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    e.stopPropagation();
    try {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa chương này?",
        text: "Bạn có thể khôi phục lại sau này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        const res = await updateLecture({
          lectureId,
          updateData: {
            _destroy: true,
            path: `/manage/course/update-content?slug=${course.slug}`,
          },
        });
        if (res?.success) {
          toast.success("Xóa chương thành công!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateLecture = async (lectureId: string, title: string) => {
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Cập nhật chương thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        path: `/manage/course/update-content?slug=${course.slug}`,
        lecture: lectureId,
        course: courseId,
        title: "Tiêu đề bài học",
        slug: `tieu-de-bai-hoc-moi-${new Date().getTime().toString().slice(-3)}`,
      });
      if (res?.success) {
        toast.success("Thêm bài học thành công");
        return;
      }
      toast.error("Thêm bài học thất bại");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        path: `/manage/course/update-content?slug=${course.slug}`,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[*+~.()'"!:@]/g,
          }),
        },
      });
      if (res?.success) {
        toast.success("Cập nhật bài học thành công");
        return;
      }
      toast.error("Cập nhật bài học thất bại");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {};

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture) => (
          <div key={lecture._id}>
            <Accordion
              type="single"
              className="w-full"
              collapsible={!lectureEdit}
            >
              <AccordionItem value={lecture._id}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between gap-3 pr-5">
                    {lecture._id === lectureIdEdit ? (
                      <>
                        <Input
                          placeholder="Tên Chương"
                          defaultValue={lecture.title}
                          onChange={(e) => {
                            setLectureEdit(e.target.value);
                          }}
                        />
                        <div className="flex gap-2">
                          <span
                            className={cn(
                              commonClassNames.action,
                              "text-green-500",
                            )}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await handleUpdateLecture(
                                lecture._id,
                                lectureEdit,
                              );
                              setLectureIdEdit("");
                              setLectureEdit("");
                            }}
                          >
                            <IconCheck />
                          </span>
                          <span
                            className={cn(
                              commonClassNames.action,
                              "text-red-500",
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEdit("");
                            }}
                          >
                            <IconClose />
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{lecture.title}</div>
                        <div className="flex gap-2">
                          <span
                            className={cn(
                              commonClassNames.action,
                              "text-blue-500",
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEdit(lecture._id);
                              setLectureEdit(lecture.title);
                            }}
                          >
                            <IconEdit />
                          </span>
                          <span
                            className={cn(
                              commonClassNames.action,
                              "text-red-500",
                            )}
                            onClick={(e) => handleDeleteLecture(e, lecture._id)}
                          >
                            <IconDelete />
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none !bg-transparent">
                  <div className="flex flex-col gap-5">
                    {lecture.lessons.map((lesson) => (
                      <Accordion
                        collapsible={!lessonEdit}
                        type="single"
                        key={lesson._id}
                      >
                        <AccordionItem value={lesson._id}>
                          <AccordionTrigger>
                            <div className="flex w-full items-center justify-between gap-3 pr-5">
                              {lesson._id === lessonIdEdit ? (
                                <>
                                  <Input
                                    placeholder="Tên Chương"
                                    defaultValue={lesson.title}
                                    onChange={(e) => {
                                      setLessonEdit(e.target.value);
                                    }}
                                  />
                                  <div className="flex gap-2">
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-green-500",
                                      )}
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        await handleUpdateLesson(e, lesson._id);
                                        setLessonIdEdit("");
                                        setLessonEdit("");
                                      }}
                                    >
                                      <IconCheck />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-red-500",
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit("");
                                      }}
                                    >
                                      <IconClose />
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>{lesson.title}</div>
                                  <div className="flex gap-2">
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-blue-500",
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit(lesson._id);
                                        setLessonEdit(lesson.title);
                                      }}
                                    >
                                      <IconEdit />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-red-500",
                                      )}
                                      onClick={(e) =>
                                        handleDeleteLesson(e, lesson._id)
                                      }
                                    >
                                      <IconDelete />
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <LessonItemUpdate lesson={lesson} />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              className="ml-auto mt-5 block w-fit"
              onClick={() => handleAddNewLesson(lecture._id, course._id)}
            >
              Thêm bài học
            </Button>
          </div>
        ))}
      </div>
      <Button className="mt-5" onClick={handleAddNewLecture}>
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
