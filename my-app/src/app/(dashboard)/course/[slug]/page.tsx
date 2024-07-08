import PageNotFound from "@/app/not-found";
import { IconMember, IconPlay, IconStudy } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { showCourseLevel } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enum";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "@/components/lesson/LessonItem";
import LessonContent from "@/components/lesson/LessonContent";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const data = await getCourseBySlug({
    slug: params.slug,
  });
  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />;
  const videoId = data.intro_url.split("v=")[1];
  const lectures = data.lectures || [];
  return (
    <div className="grid min-h-screen gap-10 lg:grid-cols-[2fr,1fr]">
      <div>
        <div className="relative mb-5 aspect-video">
          {data.intro_url ? (
            <>
              <iframe
                width="1404"
                height="480"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Hoàng Hôn Nhớ | Anh Tú | Nhớ thương đúng người gọi là nhớ thương, dẫu cuối cùng chỉ là sát thương…"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="h-full w-full object-fill"
                allowFullScreen
              ></iframe>
            </>
          ) : (
            <Image
              src={data.image}
              alt=""
              fill
              className="h-full w-full rounded-lg object-cover opacity-80"
            />
          )}
        </div>
        <h1 className="mb-5 text-3xl font-bold">{data.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.desc}</div>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="mb-10 grid grid-cols-4 gap-5">
            <BoxInfo title="Bài học">100</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views.toLocaleString()}</BoxInfo>
            <BoxInfo title="Trình độ">{showCourseLevel(data.level)}</BoxInfo>
            <BoxInfo title="Thời lượng">100h45ph</BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title="Nội dung khóa học">
          <LessonContent lectures={lectures} />
        </BoxSection>
        <BoxSection title="Yêu cầu">
          <div className="mb-10 leading-normal">
            {data.info.requirements.map((r, index) => (
              <div key={index} className="mb-3 flex items-center gap-2">
                <span className="flex size-5 flex-shrink-0 items-center justify-center rounded bg-primary p-1 text-white">
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Lợi ích">
          <div className="mb-10 leading-normal">
            {data.info.benefits.map((b, index) => (
              <div key={index} className="mb-3 flex items-center gap-2">
                <span className="flex size-5 flex-shrink-0 items-center justify-center rounded bg-primary p-1 text-white">
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Câu hỏi thường gặp">
          <div className="mb-10 leading-normal">
            {data.info.qa.map((qa, index) => (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={qa.question}>
                  <AccordionTrigger>{qa.question}</AccordionTrigger>
                  <AccordionContent>{qa.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </BoxSection>
      </div>
      <div className="bgDarkMode rounded-lg p-5">
        <div className="mb-5 flex items-center gap-2">
          <strong className="text-xl font-bold text-primary">
            {data.price.toLocaleString()} đ
          </strong>
          <span className="text-sm text-slate-400 line-through">
            {data.sale_price.toLocaleString()} đ
          </span>
          <span className="ml-auto inline-block rounded-lg bg-primary bg-opacity-10 px-3 py-1 text-sm font-semibold dark:bg-primary/50">
            {Math.floor((data.price / data.sale_price) * 100)} %
          </span>
        </div>
        <h3 className="mb-2 text-sm font-bold">Khóa học bao gồm có</h3>
        <ul className="mb-5 flex flex-col gap-3 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>30h học</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video Full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconMember className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconStudy className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>
        <Button variant={"primary"} className="w-full">
          Mua khóa học
        </Button>
      </div>
    </div>
  );
};

function BoxInfo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bgDarkMode rounded-lg p-5">
      <h4 className="text-sm font-normal text-slate-400">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

export default page;
