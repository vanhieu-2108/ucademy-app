import { IconClock, IconEye, IconStar } from "@/components/icons";
import { ICourse } from "@/database/course.model";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

const CourseItem = ({ data }: { data: ICourse }) => {
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
  return (
    <div className="bg-white border dark:bg-grayDarker dark:border-opacity-10 border-gray-200 p-4 rounded-2xl">
      <Link href="#" className="block h-[180px] relative">
        <Image
          src={data.image}
          alt={slugify(data.title, { lower: true }) + "-image"}
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width: 640px) 300px, 100vw"
        />
        {/* <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">
          New
        </span> */}
      </Link>
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-3">{data.title}</h3>
        <div className="flex items-center gap-5 mb-5 text-xs text-gray-500 dark:text-grayDark">
          {courseInfo.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.icon("size-4")}
              <span>{item.title}</span>
            </div>
          ))}
          <span className="text-primary ml-auto text-base font-bold">
            {data.price.toLocaleString()}đ
          </span>
        </div>
        <Link
          href={`/course/${data.slug}`}
          className="flex items-center justify-center rounded-lg text-white font-semibold h-12 bg-primary mt-10"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
