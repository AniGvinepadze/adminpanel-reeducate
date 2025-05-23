"use client";
import BlogsPopup from "@/app/common/popups/BlogsPopup";
import FaqPopup from "@/app/common/popups/FaqPopup";
import WhyUsPopup from "@/app/common/popups/WhyUsPopup";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export type FAQ = {
  _id: string;
  question: string;
  answer: string;
};
export default function page() {
  const [faq, setFaq] = useState<FAQ[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const token = getCookie("accessToken") as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/faq", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFaq(response.data);
      } catch (error) {
        console.log("error fertchong courses");
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/faq/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFaq((prev) => prev.filter((el) => el._id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const router = useRouter();

  return (
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 max-500:p-3">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative">
        <div>
          <h1 className="text-2xl font-bold mb-4">ხშირად დასმული კითხვები</h1>
        </div>
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-500:py-1 max-400:px-4
          "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
         <p className="max-500: text-2xl max-400:text-lg">+</p>
         <p className="max-500:hidden mt-1">დამატება</p>
        </button>
        {isAddModalOpen && (
          <div className="max-w-[600px] w-full  absolute left-1/2 translate-x-[-20%]">
            <FaqPopup
              setIsAddModalOpen={setIsAddModalOpen}
              isAddModalOpen={isAddModalOpen}
              faq={faq}
              setFaq={setFaq}
            />
          </div>
        )}
      </div>
        {faq.map((el) => (
        <div key={el._id} className=" flex flex-col gap-1">
          <div className="w-full bg-MainBg rounded-xl flex flex-col gap-4 p-3 my-3">
            <div className="max-w-[1000px] w-full">
            <p className="text-sm font-medium p-2">Question </p>
            <p className="text-base font-medium w-full bg-DarkGrey p-2 rounded-xl">{el.question} </p>
            </div>
            <div className="max-w-[1000px] w-full">
            <p className="text-sm font-medium p-2">Answer </p>
            <p className="text-base font-medium w-full bg-DarkGrey p-2 rounded-xl">{el.answer} </p>
            </div>
          </div>
          
          <button
            className=" bg-MainBg rounded-xl flex justify-center py-3 px-6  hover:scale-105 ease-in-out duration-300 transition-all"
            onClick={() => handleDelete(el._id)}
          >
            Delete
          </button>
          <button
            className=" bg-MainBg rounded-xl flex justify-center gap-4 py-3 px-6 my-1 hover:scale-105 ease-in-out duration-300 transition-all"
            onClick={() => router.push(`/why-us/${el._id}`)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
