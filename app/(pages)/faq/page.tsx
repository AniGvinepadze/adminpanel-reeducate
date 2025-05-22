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
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 ">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative">
        <div>
          <h1 className="text-2xl font-bold mb-4">ხშირად დასმული კითხვები</h1>
        </div>
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium
          "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
          + დამატება
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
        <div key={el._id} className="flex justify-between gap-3">
          <div className="w-full bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-10 my-3">
            <p className="text-base font-medium">{el.question}</p>
            <p className="text-base font-medium">{el.answer}</p>
          
          </div>
          <button
            className=" bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 my-3 hover:scale-110 ease-in-out duration-300 transition-all"
            onClick={() => handleDelete(el._id)}
          >
            Delete
          </button>
          <button
            className=" bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 my-3 hover:scale-110 ease-in-out duration-300 transition-all"
            onClick={() => router.push(`/blog/${el._id}`)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
