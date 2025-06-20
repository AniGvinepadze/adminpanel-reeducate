"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { FAQ } from "../page";

export default function page() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop() || "";

  const [faq, setFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    answer: "",
    question: "",

  });
  const token = getCookie("accessToken") as string;

  useEffect(() => {
    async function fetchFaq() {
      try {
        const response = await axiosInstance.get(`/faq/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFaq(response.data);
        setFormData({
          answer: response.data.answer,
          question: response.data.question,

        });
      } catch (error) {
        console.error("Failed to load course", error);
      }
    }

    fetchFaq();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.patch(`/faq/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/faq");
    } catch (error) {
      console.error("Failed to update course", error);
    }
  };

  return (
    <div className="bg-DarkGrey min-h-[600px] w-full rounded-lg shadow-xl p-7 max-[700px]:p-4">
      <h1 className="text-2xl font-bold mb-4">Edit FAQ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["question","answer"].map((field) => (
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
