import { sideBar } from "@/app";
import Link from "next/link";
import React from "react";

export default function SideBar() {
  return (
    <div className="max-w-[350px] w-full ">
      <div className="flex flex-col items-center">
        {sideBar.map((el) => (
          <Link
            href={el.route}
            key={el.id}
            className="bg-MainBg w-full shadow-md p-3 my-3 rounded-xl cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
          >
            <p className="text-base font-medium ">{el.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
