"use client";
import { TActiveLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ url = "/", children }: TActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = url === pathname;
  return (
    <Link
      href={url}
      className={`flex items-center gap-3 rounded-md p-3 text-base font-medium transition-all dark:text-grayDark ${
        isActive
          ? "svg-animate bg-primary font-semibold !text-white"
          : "hover:!bg-primary hover:!bg-opacity-10 hover:!text-primary"
      }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
