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
      router.push("/login");
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
      await axiosInstance.delete(`/courses/${id}`, {
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
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7 ">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative">
        <div>
          <h1 className="text-2xl font-bold mb-4">ჩვენ შესახებ</h1>
        </div>
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium
            "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
          + დამატება
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
        <div key={el._id} className="flex justify-between gap-3">
          <div className="w-full bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-10 my-3">
            <p className="text-base font-medium">{el.description}</p>
            <p className="text-base font-medium">{el.title}</p>
            {el.images && el.images.length > 0 ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}${el.images[0]}`}
                alt={el.title}
                width={80}
                height={30}
                className="object-cover rounded max-h-[25px]"
              />
            ) : (
              <p>No image</p>
            )}
          </div>
          <button
            className=" bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 my-3 hover:scale-110 ease-in-out duration-300 transition-all"
            onClick={() => handleDelete(el._id)}
          >
            Delete
          </button>
          <button
            className=" bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 my-3 hover:scale-110 ease-in-out duration-300 transition-all"
            onClick={() => router.push(`/courses/${el._id}`)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
