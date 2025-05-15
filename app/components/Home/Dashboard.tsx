"use client";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import DashboardPopup from "./DashboardPopup";
import Image from "next/image";
import { deleteIcon } from "@/app/assets";

export type Courses = {
  _id: string;
  name: string;
  img: string;
  category: string;
  link: string;
};

export default function Dashboard() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addCourse, setAddCourse] = useState<Courses[]>([]);

  const token = getCookie("accessToken") as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.log("error fertchong courses");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  return (
    <div className=" bg-DarkGrey h-[600px] w-full rounded-xl shadow-lg p-7 ">
      <div className="w-full max-w-[1000px] flex justify-end p-3 relative">
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium
          "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
          + add
        </button>
      </div>
      {isAddModalOpen && (
        <div
          className="
    max-w-[600px] w-full  absolute
    left-1/2
    translate-x-[-20%]
  
   "
        >
          <DashboardPopup
            setIsAddModalOpen={setIsAddModalOpen}
            isAddModalOpen={isAddModalOpen}
            courses={courses}
            setCourses={setCourses}
          />
        </div>
      )}

      {courses.map((el) => (
        <div key={el._id} className="flex justify-between gap-3">
          <div className="w-full bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-10 my-3">
            <p className="text-base font-medium">{el.name}</p>
            <p className="text-base font-medium">{el.category}</p>
            <p className="text-base font-medium">{el.img}</p>
            <p className="text-base font-medium">{el.link}</p>
          </div>
          <button className=" bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 my-3 hover:scale-110 ease-in-out duration-300 transition-all" onClick={()=>handleDelete(el._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
