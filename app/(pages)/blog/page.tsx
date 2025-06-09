"use client";
import BlogsPopup from "@/app/common/popups/BlogsPopup";
import WhyUsPopup from "@/app/common/popups/WhyUsPopup";
import BlogsDetailsSection from "@/app/components/Blogs/BlogsDetailsSection";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export type Blogs = {
  _id: string;
  description: string;
  title: string;
  images: string[];
};
export default function page() {
  const [user, setUser] = useState();
  const [blog, setBlog] = useState<Blogs[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mainActive, setMainActive] = useState(true);
  const [detailsActive, setDetailsActive] = useState(false);

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
    getCurrentUser();
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

  const handleMainOnClick = () => {
    setMainActive(true);
    setDetailsActive(false);
  };

  const handleDetailOnClick = () => {
    setMainActive(false);
    setDetailsActive(true);
  };

  const router = useRouter();

  const isValidCourse = (blog: Blogs) => {
    return blog.title && blog.description && blog.images.length > 0;
  };

  return (
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 max-[500px]:p-3">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative">
        <div>
          <h1 className="text-2xl font-bold mb-4 max-[400px]:text-xl ">
            ბლოგები
          </h1>
        </div>
        <div className="flex gap-5">
          <button
            className={`bg-tranparent border-2 border-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[400px]:py-1 ${
              mainActive ? "bg-MainBg" : ""
            }`}
            onClick={handleMainOnClick}
          >
            მთავარი
          </button>
          <button
            className={`bg-tranparent border-2 border-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[400px]:py-1 ${
              detailsActive ? "bg-MainBg" : ""
            }`}
            onClick={handleDetailOnClick}
          >
            დეტალები
          </button>
        </div>
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[500px]:py-1 max-[350px]:px-4
          "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
          <p className="max-[500px]:text-2xl max-[350px]:text-lg">+</p>
          <p className="max-[500px]:hidden mt-1">დამატება</p>
        </button>
        {isAddModalOpen && (
          <div className="max-w-[600px] w-full  absolute left-1/2 top-20 translate-x-[-50%] max-[1100px]:translate-x-[-60%] max-[800px]:translate-x-[-50%] max-[700px]:w-[400px] max-[700px]:translate-x-[-50%]  max-[400px]:max-w-[300px]">
            <BlogsPopup
              setIsAddModalOpen={setIsAddModalOpen}
              isAddModalOpen={isAddModalOpen}
              blog={blog}
              setBlog={setBlog}
            />
          </div>
        )}
      </div>
    {detailsActive ? (<div>
      <BlogsDetailsSection handleDelete={handleDelete}/>
    </div>) : (  <div>
      {blog.map((el) => (
        <div key={el._id} className="max-w-[1000px] w-full mb-10 mt-5">
          <div className="max-w-[1000px] w-full bg-MainBg rounded-xl flex gap-6 p-3 max-[1100px]:gap-2 max-[550px]:flex-col">
            <div className=" w-full py-3 px-3 max-[950px]:px-0">
              <div className="w-full max-w-[1000px]">
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
            onClick={() => router.push(`/blog/${el._id}`)}
          >
            Edit
          </button>
        </div>
      ))}
      </div>)}
    </div>
  );
}
