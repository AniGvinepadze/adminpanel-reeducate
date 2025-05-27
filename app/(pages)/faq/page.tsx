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
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 max-[500px]:p-3">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative max-[1050px]:flex-col max-[1050px]:p-0 max-[1050px]:my-4">
        <div className="flex justify-between max-w-[1000px] w-full max-[700px]:flex-col">
          <div>
            <h1 className="text-2xl font-bold mb-4 max-[450px]:text-xl max-[400px]:text-lg">
              ხშირად დასმული კითხვები
            </h1>
          </div>
          <div className="w-full">
            <button
              className="bg-MainBg rounded-xl flex justify-center w-full my-3 gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[500px]:py-1 max-[400px]:px-4
       "
              onClick={() => setIsAddModalOpen((prev) => !prev)}
            >
              <p className="max-[500px]: text-2xl max-[400px]:text-lg">+</p>
              <p className=" mt-1 max-[400px]:mt-[2px]">დამატება</p>
            </button>
          </div>
        </div>
        {isAddModalOpen && (
          <div className="max-w-[600px] w-full  absolute left-1/2 top-20 translate-x-[-50%] max-[1100px]:translate-x-[-60%] max-[800px]:translate-x-[-50%] max-[700px]:w-[400px] max-[700px]:translate-x-[-50%]  max-[450px]:max-w-[300px]">
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
              <p className="text-base font-medium w-full bg-DarkGrey p-2 rounded-xl">
                {el.question}{" "}
              </p>
            </div>
            <div className="max-w-[1000px] w-full">
              <p className="text-sm font-medium p-2">Answer </p>
              <p className="text-base font-medium w-full bg-DarkGrey p-2 rounded-xl">
                {el.answer}{" "}
              </p>
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
