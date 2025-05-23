"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import { sideBar } from "@/app";
import Link from "next/link";
type MobileSidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function MobileSidebar({ isOpen, setIsOpen }:MobileSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full max-w-[350px] w-full rounded-xl bg-MainBg shadow-lg z-50 transform transition-transform duration-1000 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b  border-gray-700">
          <div className="flex gap-1">
              <h2 className="text-3xl font-semibold ">
                re:
              </h2>
              <h2 className="text-3xl font-semibold  rotate-180 mt-2 ">
                educate
              </h2>
            </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold rotate-45 hover:text-3xl transition-all ease-in-out duration-300"
          
          >
            +
          </button>
        </div>
         <div className="p-5 max-w-[350px] w-full">
               {sideBar.map((el) => (
          <Link
            href={el.route}
            key={el.id}
            className=" w-full shadow-md p-3 my-3 rounded-xl cursor-pointer hover:scale-110 transition-all ease-in-out duration-300  "
          >
            <p className="text-base font-medium max-400:text-sm">{el.title}</p>
          </Link>
        ))}
         </div>
      </div>
    </>
  );
}

