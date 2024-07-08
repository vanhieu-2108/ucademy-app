"use client";
import Heading from "@/components/common/Heading";
import {
  IconAdd,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from "@/components/icons";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassNames, courseStatus } from "@/constants";
import { ICourse } from "@/database/course.model";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enum";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
const IconArrowLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);
const IconArrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 19.5l7.5-7.5-7.5-7.5"
    />
  </svg>
);
const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Không thể hoàn tác sau khi xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Cập nhật trạng thái thành công");
      }
    });
  };
  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: "Bạn có chắc chắn muốn thay đổi trạng thái?",
        text: "Bạn có thể hoàn tác sau khi thay đổi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status: ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link
        href="/manage/course/new"
        className="flexCenter fixed bottom-14 right-5 size-10 animate-bounce rounded-full bg-primary text-white"
      >
        <IconAdd />
      </Link>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading classname="mb-2 lg:mb-5">Quản lý khóa học</Heading>
        <div className="w-full lg:w-[300px]">
          <Input placeholder="Tìm kiếm khóa học..." />
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((course) => {
              const courseStatusItem = courseStatus.find(
                (item) => item.value === course.status,
              );
              return (
                <TableRow key={course.slug}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt=""
                        src={course.image}
                        width={80}
                        height={80}
                        className="size-16 flex-shrink-0 rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="whitespace-nowrap text-sm font-bold lg:text-base">
                          {course.title}
                        </h3>
                        <h4 className="text-xs text-slate-500 lg:text-sm">
                          {new Date(course.created_at).toLocaleDateString(
                            "vi-VN",
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-bold lg:text-base">
                      {course.price.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      className={cn(
                        commonClassNames.status,
                        courseStatusItem?.className,
                      )}
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                    >
                      {courseStatusItem?.title}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={`/manage/course/update-content?slug=${course.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconStudy />
                      </Link>
                      <Link
                        href={`/course/${course.slug}`}
                        target="_blank"
                        className={commonClassNames.action}
                      >
                        <IconEye />
                      </Link>
                      <Link
                        href={`/manage/course/update?slug=${course.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course.slug)}
                        className={commonClassNames.action}
                      >
                        <IconDelete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="mt-5 flex justify-end gap-3">
        <button className={commonClassNames.paginationButton}>
          {IconArrowLeft}
        </button>
        <button className={commonClassNames.paginationButton}>
          {IconArrowRight}
        </button>
      </div>
    </>
  );
};

export default CourseManage;
