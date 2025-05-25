"use client";
import BlogsPopup from "@/app/common/popups/BlogsPopup";
import WhyUsPopup from "@/app/common/popups/WhyUsPopup";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export type Blogs = {
  _id: string;
  description: string;
  title: string;
  link: string;
};
export default function page() {
    const [user, setUser] = useState();
  const [blog, setBlog] = useState<Blogs[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const token = getCookie("accessToken") as string;

  
      

  useEffect(() => {
       if (!token) {
          router.push("/sign-in");
          return;
        }
    
        const getCurrentUser = async () => {
          try {
            const response = await axiosInstance.get("/auth/current-admin", {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Current user:", response.data);
            setUser(response.data);
          } catch (err: any) {
            console.error(
              "Failed to get current admin:",
              err.response || err.message || err
            );
            router.push("/sign-in");
          }
        };
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data);
      } catch (error) {
        console.log("error fertchong courses");
      }
    };
    getCurrentUser()
    fetchData();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlog((prev) => prev.filter((el) => el._id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const router = useRouter();

  return (
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 max-500:p-3">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative">
        <div>
          <h1 className="text-2xl font-bold mb-4 max-400:text-xl ">ბლოგები</h1>
        </div>
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-500:py-1 max-350:px-4
          "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
          <p className="max-500: text-2xl max-350:text-lg">+</p>
          <p className="max-500:hidden mt-1">დამატება</p>
        </button>
        {isAddModalOpen && (
  <div className="max-w-[600px] w-full  absolute left-1/2 top-20 translate-x-[-50%] max-1100:translate-x-[-60%] max-800:translate-x-[-50%] max-700:w-[400px] max-700:translate-x-[-50%]  max-450:max-w-[300px]">
            <BlogsPopup
              setIsAddModalOpen={setIsAddModalOpen}
              isAddModalOpen={isAddModalOpen}
              blog={blog}
              setBlog={setBlog}
            />
          </div>
        )}
      </div>
      {blog.map((el) => (
        <div key={el._id} className="max-w-[1000px] w-full mb-10 mt-5">
          <div className="max-w-[1000px] w-full bg-MainBg rounded-xl flex gap-6 p-3 max-1100:gap-2 max-550:flex-col">
            <div className=" w-full py-3 px-3 max-950:px-0">
              <div className="w-full max-w-[1000px">
                <p className="p-2 font-medium text-sm">Title</p>
                <p className="text-base font-medium w-full bg-DarkGrey  p-2 rounded-xl">
                  {el.title}
                </p>
              </div>
              <div className="w-full m my-4">
                <p className="p-2 font-medium text-sm">Description</p>
                <p className="text-base font-medium w-full bg-DarkGrey max-w-[1000px] p-2 rounded-xl">
                  {el.description}
                </p>
              </div>
              <div className="w-full max-w-[1000px]">
                <p className="p-2 font-medium text-sm">Link</p>
                <p className="text-base font-medium w-full bg-DarkGrey  p-2 rounded-xl">
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
