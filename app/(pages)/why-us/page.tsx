"use client";
import WhyUsPopup from "@/app/common/popups/WhyUsPopup";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export type WhyUs = {
  _id: string;
  description: string;
};
export default function page() {
  const [user, setUser] = useState();
  const [whyUs, setWhyUs] = useState<WhyUs[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const token = getCookie("accessToken") as string;

  const getCurrentUser = async (token: string) => {
    try {
      const response = await axiosInstance.get("/auth/current-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      router.push("/sign-in");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/why-us", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWhyUs(response.data);
      } catch (error) {
        console.log("error fertchong courses");
      }
    };

    fetchData();
    getCurrentUser(token as string);
  }, []);
  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/why-us/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWhyUs((prev) => prev.filter((el) => el._id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const router = useRouter();

  return (
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 ">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative">
        <div>
          <h1 className="text-2xl font-bold mb-4">რატომ ჩვენ</h1>
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
            <WhyUsPopup
              setIsAddModalOpen={setIsAddModalOpen}
              isAddModalOpen={isAddModalOpen}
              whyUs={whyUs}
              setWhyUs={setWhyUs}
            />
          </div>
        )}
      </div>
      {whyUs.map((el) => (
        <div key={el._id} className=" flex flex-col gap-1">
          <div className="w-full bg-MainBg rounded-xl flex flex-col gap-4 p-3 my-3">
            <div className="max-w-[1000px] w-full">
            <p className="text-sm font-medium p-2">Description </p>
            <p className="text-base font-medium w-full bg-DarkGrey p-2 rounded-xl">{el.description} </p>
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
