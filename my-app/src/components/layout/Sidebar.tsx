import { ActiveLink } from "@/components/common";
import { ModeToggle } from "@/components/common/ModeToggle";
import { menuItems } from "@/constants";
import { TMenuItem } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
const Sidebar = () => {
  return (
    <aside className="p-5 border-r dark:bg-grayDarker dark:border-opacity-10 border-r-gray-200 bg-white flex flex-col">
      <Link href="/" className="font-bold text-3xl inline-block mb-5">
        <span className="text-primary">U</span>
        cademy
      </Link>
      <ul className="flex flex-col gap-2">
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
        <UserButton />
      </div>
    </aside>
  );
};
function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
