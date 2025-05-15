"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";

type Course = {
  _id: string;
  name: string;
  category: string;
  link: string;
  img: string;
};

export default function EditCoursePage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop() || "";

  const [course, setCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    link: "",
    img: "",
  });
  const token = getCookie("accessToken") as string;

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axiosInstance.get(`/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(response.data);
        setFormData({
          name: response.data.name,
          category: response.data.category,
          link: response.data.link,
          img: response.data.img,
        });
       
      } catch (error) {
        console.error("Failed to load course", error);
      }
    }

    fetchCourse();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("first")
    const response =   await axiosInstance.patch(`/courses/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response,"response")
      router.push("/")
    } catch (error) {
      console.error("Failed to update course", error);
    }
  };

  if (!course) return <p>Loading...</p>;


  return (
    <div className=" bg-DarkGrey min-h-[600px] w-full rounded-lg shadow-xl p-7 max-700:p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "category", "link", "img"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block mb-1 font-medium capitalize p-1"
            >
              {field}
            </label>
            <input
              id={field}
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="w-full border text-gray-700 border-gray-300 rounded-xl px-3 py-2"
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-6 px-4 py-2 w-full my-2 bg-MainBg text-base font-medium text-white rounded-lg hover:bg-[#0f0f0f] hover:scale-105 transition-all ease-in-out duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
