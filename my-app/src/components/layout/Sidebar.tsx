"use client";
import { ActiveLink } from "@/components/common";
import { ModeToggle } from "@/components/common/ModeToggle";
import { IconMember } from "@/components/icons";
import { menuItems } from "@/constants";
import { TMenuItem } from "@/types";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="hidden p-5 border-r borderDarkMode bgDarkMode bg-white lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px]">
      <Link href="/" className="font-bold text-3xl inline-block mb-5">
        <span className="text-primary">U</span>
        cademy
      </Link>
      <ul className="flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          ></MenuItem>
        ))}
      </ul>
      <div className="mt-auto flex justify-end gap-4">
        <ModeToggle />
        {!userId ? (
          <Link
            href="/sign-in"
            className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1"
          >
            <IconMember />
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};
export function MenuItem({ url = "/", title = "", icon, onlyIcon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
