"use client";
import { ILesson } from "@/database/lesson.model";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { updateLesson } from "@/lib/actions/lesson.actions";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { editorOptions } from "@/constants";
import { useTheme } from "next-themes";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.coerce.number().positive().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateLesson({
        lessonId: lesson._id,
        updateData: values as any,
      });
      if (res?.success) {
        toast.success("Cập nhật bài học thành công");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  const { theme } = useTheme();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn</FormLabel>
                <FormControl>
                  <Input placeholder="bai-1-tong-quan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời lượng</FormLabel>
                <FormControl>
                  <Input placeholder="bai-1-tong-quan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/abcdefxyz"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div></div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-start-1 -col-end-1">
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    {...editorOptions(field, theme)}
                    initialValue={lesson.content}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-end gap-5">
          <Button type="submit">Cập nhật</Button>
          <Link href="/" className="text-sm text-slate-600">
            Xem trước
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LessonItemUpdate;
