"use client";

import AboutUsPopup from "@/app/common/popups/AboutUsPopup";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type AboutUs = {
  _id: string;
  title : string;
  images: string[];
  description: string;
};

export default function page() {
  const [user, setUser] = useState();
  const [aboutUs, setAboutUs] = useState<AboutUs[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const token = getCookie("accessToken") as string;

  const router = useRouter();

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

    const fetchAboutUs = async () => {
      try {
        const response = await axiosInstance.get("/about-us", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAboutUs(response.data);
      } catch (error) {
        console.error("Error fetching about us:", error);
      }
    };

    getCurrentUser();
    fetchAboutUs();
  }, [token, router]);

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/about-us/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAboutUs((prev) => prev.filter((el) => el._id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  return (
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 max-500:p-3">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative">
        <div>
          <h1 className="text-2xl font-bold mb-4 max-400:text-xl mt-1">ჩვენ შესახებ</h1>
        </div>
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-500:py-1
          "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
         <p className="max-500: text-2xl -mt-1 max-500:mt-0">+</p>
         <p className="max-500:hidden ">დამატება</p>
        </button>
      </div>
      {isAddModalOpen && (
        <div className="max-w-[600px] w-full  absolute left-1/2 translate-x-[-20%]">
          <AboutUsPopup
            setIsAddModalOpen={setIsAddModalOpen}
            isAddModalOpen={isAddModalOpen}
            aboutUs={aboutUs}
            setAboutUs={setAboutUs}
          />
        </div>
      )}

    {aboutUs.map((el) => (
        <div key={el._id} className="max-w-[1000px] w-full mb-10 mt-5">
          <div className="max-w-[1000px] w-full bg-MainBg rounded-xl flex gap-6 p-3 max-1100:gap-2 max-550:flex-col">
            <div className="flex-shrink-0 h-full overflow-hidden">
              {el.images && el.images.length > 0 ? (
                <div className="h-full max-w-[450px] w-full rounded">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}${el.images[0]}`}
                    alt={el.title}
                    width={410}
                    height={150}
                    className="object-cover rounded-md min-h-[250px] max-w-[250px] max-1100:max-w-[190px] 
            max-550:max-w-[410px] max-550:max-h-[150px] "
                  />
                </div>
              ) : (
                <p>No image</p>
              )}
            </div>

            <div className="max-w-[900px] w-full py-3 px-3 max-950:px-0">
              <div className="w-full max-w-[800px]">
                <p className="p-2 font-medium text-sm">Title</p>
                <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                  {el.title}
                </p>
              </div>
              <div className="w-full max-w-[800px] my-4">
                <p className="p-2 font-medium text-sm">Description</p>
                <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
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
            onClick={() => router.push(`/courses/${el._id}`)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
