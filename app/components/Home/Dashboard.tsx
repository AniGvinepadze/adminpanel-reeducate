"use client";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import DashboardPopup from "./DashboardPopup";
import Image from "next/image";
import { deleteIcon } from "@/app/assets";
import EditCoursePage from "@/app/(pages)/courses/[id]/page";

import { useRouter } from "next/navigation";
import CoursesDetailsSection from "./CoursesDetailsSection";

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
  const [mainActive, setMainActive] = useState(true);
  const [detailsActive, setDetailsActive] = useState(false);
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

  const handleMainOnClick = () => {
    setMainActive(true);
    setDetailsActive(false);
  };
  const handleDetailOnClick = () => {
    setMainActive(false);
    setDetailsActive(true);
  };
  const router = useRouter();

  return (
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 max-[450px]:p-3">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative ">
        <div>
          <h1 className="text-2xl font-bold mb-4">კურსები</h1>
        </div>
        <div className="flex gap-5">
          <button
            className={`bg-tranparent border-2 border-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[400px]:py-1 ${
              mainActive ? "bg-MainBg" : ""
            }
          `}
            onClick={handleMainOnClick}
          >
            მთავარი
          </button>
          <button
            className={`bg-tranparent border-2 border-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[400px]:py-1 ${
              detailsActive ? "bg-MainBg" : ""
            }
          `}
            onClick={handleDetailOnClick}
          >
            დეტალები
          </button>
        </div>
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[400px]:py-1 
          "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
          <p className="max-[400px]: text-2xl">+</p>
          <p className="max-[400px]:hidden mt-1">დამატება</p>
        </button>
      </div>
      {isAddModalOpen && (
        <div className="max-w-[600px] w-full  absolute left-1/2 translate-x-[-20%] max-[1100px]:translate-x-[-40%] max-[800px]:translate-x-[-50%] max-[700px]:max-w-[400px] max-[450px]:max-w-[300px]">
          <DashboardPopup
            setIsAddModalOpen={setIsAddModalOpen}
            isAddModalOpen={isAddModalOpen}
            courses={courses}
            setCourses={setCourses}
          />
        </div>
      )}

      {detailsActive ? (
        <CoursesDetailsSection/>
      ) : (
        <div>
       
          {courses.map((el) => (
            <div key={el._id} className="max-w-[1000px] w-full mb-10 mt-5">
              <div className="max-w-[1000px] w-full bg-MainBg rounded-xl flex gap-6 p-3 max-[600px]:gap-2 max-[550px]:flex-col">
                <div className="flex-shrink-0 h-full overflow-hidden">
                  {el.images && el.images.length > 0 ? (
                    <div className="h-full max-w-[450px] w-full rounded">
                      <Image
                        src={`https://d1monaii5gqb9o.cloudfront.net/${el.images[0]}`}
                        alt={el.name}
                        width={410}
                        height={150}
                        className="object-cover rounded-md min-h-[250px] max-w-[250px] 
            max-[550px]:max-w-[410px] max-[550px]:max-h-[150px]"
                      />
                    </div>
                  ) : (
                    <p>No image</p>
                  )}
                </div>

                <div className="max-w-[900px] w-full p-3 max-[600px]:p-0">
                  <div className="w-full max-w-[800px] -mt-5 max-[600px]:mt-0">
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
      )}
    </div>
  );
}
