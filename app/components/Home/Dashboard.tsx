"use client";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import DashboardPopup from "./DashboardPopup";
import Image from "next/image";
import { deleteIcon } from "@/app/assets";
import EditCoursePage from "@/app/(pages)/courses/[id]/page";

import { useRouter } from "next/navigation";

export type Courses = {
  _id: string;
  name: string;
  images: string[];
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

  const getFullImageUrl = (imgPath: string) => {
    if (imgPath.startsWith("http")) return imgPath;
    return `https://your-bucket-name.s3.amazonaws.com/${imgPath}`;
  };
  const handleUpdate = async (id: string, updatedData: Partial<Courses>) => {
    try {
      const response = await axiosInstance.put(`/courses/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses((prev) =>
        prev.map((course) => (course._id === id ? response.data : course))
      );
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };
  const router = useRouter();

  return (
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 max-450:p-3">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative ">
        <div>
          <h1 className="text-2xl font-bold mb-4">კურსები</h1>
        </div>
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-400:py-1
          "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
         <p className="max-400: text-2xl">+</p>
         <p className="max-400:hidden">დამატება</p>
        </button>
      </div>
      {isAddModalOpen && (
        <div className="max-w-[600px] w-full  absolute left-1/2 translate-x-[-20%]">
          <DashboardPopup
            setIsAddModalOpen={setIsAddModalOpen}
            isAddModalOpen={isAddModalOpen}
            courses={courses}
            setCourses={setCourses}
          />
        </div>
      )}

      {courses.map((el) => (
        <div key={el._id} className="max-w-[1000px] w-full mb-10 mt-5">
          <div className="max-w-[1000px] w-full bg-MainBg rounded-xl flex gap-6 p-3 max-600:gap-2 max-550:flex-col">
            <div className="flex-shrink-0 h-full overflow-hidden">
              {el.images && el.images.length > 0 ? (
                <div className="h-full max-w-[450px] w-full rounded">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}${el.images[0]}`}
                    alt={el.name}
                    width={410}
                    height={150}
                    className="object-cover rounded-md min-h-[250px] max-w-[250px] 
            max-550:max-w-[410px] max-550:max-h-[150px]"
                  />
                </div>
              ) : (
                <p>No image</p>
              )}
            </div>

            <div className="max-w-[900px] w-full p-3 max-600:p-0">
              <div className="w-full max-w-[800px] -mt-5 max-600:mt-0">
                <p className="p-2 font-medium text-sm">Name</p>
                <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                  {el.name}
                </p>
              </div>
              <div className="w-full max-w-[800px] ">
                <p className="p-2 font-medium text-sm">Category</p>
                <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                  {el.category}
                </p>
              </div>
              <div className="w-full max-w-[800px] ">
                <p className="p-2 font-medium text-sm">Link</p>
                <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                  {el.link}
                </p>
              </div>
            </div>
          </div>
          <button
            className="w-full  bg-MainBg rounded-xl flex justify-center text-base font-medium gap-4 py-3 px-6 my-3 hover:scale-105 ease-in-out duration-300 transition-all"
            onClick={() => handleDelete(el._id)}
          >
            Delete
          </button>
          <button
            className="w-full  bg-MainBg rounded-xl flex justify-center text-base font-medium gap-4 py-3 px-6 my-3 hover:scale-105 ease-in-out duration-300 transition-all"
            onClick={() => router.push(`/courses/${el._id}`)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
