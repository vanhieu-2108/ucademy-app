import { IconClock, IconEye, IconStar } from "@/components/icons";
import { ICourse } from "@/database/course.model";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

const CourseItem = ({
  data,
  cta,
  url = "",
}: {
  data: ICourse;
  cta?: string;
  url?: string;
}) => {
  const courseInfo = [
    {
      title: data.views,
      icon: (className?: string) => <IconEye className={className} />,
    },
    {
      title: data.rating[0],
      icon: (className?: string) => <IconStar className={className} />,
    },
    {
      title: "30h25p",
      icon: (className?: string) => <IconClock className={className} />,
    },
  ];
  const courseUrl = url ? url : `/course/${data.slug}`;
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 dark:border-opacity-10 dark:bg-grayDarker">
      <Link href={courseUrl} className="relative block h-[180px]">
        <Image
          src={data.image}
          alt={slugify(data.title, { lower: true }) + "-image"}
          width={300}
          height={200}
          className="h-full w-full rounded-lg object-cover"
          sizes="@media (min-width: 640px) 300px, 100vw"
        />
        {/* <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">
          New
        </span> */}
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="mb-3 line-clamp-2 text-lg font-bold">{data.title}</h3>
        <div className="mt-auto">
          <div className="mb-5 flex items-center gap-5 text-xs text-gray-500 dark:text-grayDark">
            {courseInfo.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon("size-4")}
                <span>{item.title}</span>
              </div>
            ))}
            <span className="ml-auto text-base font-bold text-primary">
              {data.price.toLocaleString()}đ
            </span>
          </div>
          <Link
            href={courseUrl}
            className="mt-10 flex h-12 items-center justify-center rounded-lg bg-primary font-semibold text-white"
          >
            {!cta ? "Xem chi tiết" : cta}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
