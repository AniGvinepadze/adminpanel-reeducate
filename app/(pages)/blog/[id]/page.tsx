"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { Blogs } from "../page";

export default function page() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop() || "";

  const [blog, setBlog] = useState<Blogs | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    title: "",
    link: "",
  });
  const token = getCookie("accessToken") as string;

  useEffect(() => {
    async function fetchWhyUs() {
      try {
        const response = await axiosInstance.get(`/why-us/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog(response.data);
        setFormData({
          description: response.data.description,
          title: response.data.title,
          link: response.data.link,
        });
      } catch (error) {
        console.error("Failed to load course", error);
      }
    }

    fetchWhyUs();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.patch(`/blogs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/blog");
    } catch (error) {
      console.error("Failed to update course", error);
    }
  };

  return (
    <div className="bg-DarkGrey min-h-[600px] w-full rounded-lg shadow-xl p-7 max-[700px]:p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["description","title","link"].map((field) => (
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
