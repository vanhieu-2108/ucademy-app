import Sidebar, { MenuItem } from "@/components/layout/Sidebar";
import { menuItems } from "@/constants";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="wrapper block h-screen pb-20 lg:grid lg:grid-cols-[300px,minmax(0,1fr)] lg:pb-0">
      <Sidebar />
      <ul className="bordet-t borderDarkMode bgDarkMode fixed bottom-0 left-0 z-50 flex h-16 w-full justify-center gap-5 p-3 lg:hidden">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
            onlyIcon
          ></MenuItem>
        ))}
      </ul>
      <div className="hidden lg:block"></div>
      <main className="p-5">{children}</main>
    </div>
  );
};

export default layout;
