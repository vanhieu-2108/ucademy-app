"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import slugify from "slugify";
import { createCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/database/user.model";
const formSchema = z.object({
  title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự"),
  slug: z.string().optional(),
});
export default function CourseAddNew({ user }: { user: IUser }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug || slugify(values.title, { lower: true, locale: "vi" }),
        author: user._id,
      };
      const res = await createCourse(data);
      if (!res?.success) {
        toast.error(res?.message);
        return;
      }
      toast.success("Tạo khóa học thành công");
      if (res?.data) {
        router.push(`/manage/course/update?slug=${res.data.slug}`);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <div className="mt-10 grid grid-cols-2 gap-8 mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học *</FormLabel>
                <FormControl>
                  <Input placeholder="Tên khóa học" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn khóa học</FormLabel>
                <FormControl>
                  <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          isLoading={isSubmitting}
          type="submit"
          variant="primary"
          className="w-[120px]"
          disabled={isSubmitting}
        >
          Tạo khóa học
        </Button>
      </form>
    </Form>
  );
}
