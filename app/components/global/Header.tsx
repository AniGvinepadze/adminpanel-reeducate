import { logo } from "@/app/assets";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="max-w-[1440px] w-full m-auto">
      <div className=" w-full m-auto flex justify-between py-4 px-7 bg-[#212121] shadow-xl rounded-xl">
        <div>
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={30}
            className="rounded-xl max-600:max-w-[70px]"
          />
        </div>
        <div className="flex">
          <button className="bg-[#151515]  text-base font-medium flex items-center px-7 rounded-xl border-2 border-[#151515] hover:bg-transparent transition-all ease-in-out duration-300 hover:scale-105 max-400:px-4 ">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
