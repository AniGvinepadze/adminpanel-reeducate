"use client";
import { logo } from "@/app/assets";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";


type HeaderProps = {
  onLogoClick: () => void;
};
export default function Header({ onLogoClick }: HeaderProps) {
  const router = useRouter();

  const signOut = () => {
    deleteCookie("accessToken");
    router.push("/sign-in");
  };

  return (
    <div className="max-w-[1440px] w-full m-auto">
      <div className=" w-full m-auto flex justify-between py-4 px-7 bg-[#212121] shadow-xl rounded-xl">
        <div  onClick={onLogoClick}  className="cursor-pointer hover:scale-110 ease-in-out duration-300 transition-all">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={30}
            className="rounded-xl max-[600px]:max-w-[70px]"
          />
        </div>
        <div className="flex">
          <button
            className="bg-[#151515]  text-base font-medium flex items-center px-7 rounded-xl border-2 border-[#151515] hover:bg-transparent transition-all ease-in-out duration-300 hover:scale-105 max-[400px]:px-4 "
            onClick={signOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
