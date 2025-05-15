import { sideBar } from "@/app";
import Link from "next/link";
import React from "react";

export default function SideBar() {
  return (
    <div className="max-w-[350px] w-full max-700:max-w-full">
      <div className="grid grid-cols-1 items-center max-700:grid-cols-3 gap-1 max-500:grid-cols-2">
        {sideBar.map((el) => (
          <Link
            href={el.route}
            key={el.id}
            className="bg-MainBg w-full shadow-md p-3 my-3 rounded-xl cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 max-700:my-1 "
          >
            <p className="text-base font-medium max-400:text-sm">{el.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
