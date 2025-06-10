"use client";
import { Blogs } from "@/app/(pages)/blog/page";
import { FAQ } from "@/app/(pages)/faq/page";
import { Feedback } from "@/app/(pages)/feedback/page";
import { WhyUs } from "@/app/(pages)/why-us/page";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type FeedbakcPopupProps = {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddModalOpen: boolean;
  feedback: Feedback[];
  setFeedback: React.Dispatch<React.SetStateAction<Feedback[]>>;
};
export default function FaqPopup({
  setIsAddModalOpen,
  isAddModalOpen,
  feedback,
  setFeedback,
}: FeedbakcPopupProps) {
  const token = getCookie("accessToken") as string;

  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    author: "",
    description: "",
    category: "",
  });
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsAddModalOpen(false);
      }
    }

    if (isAddModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddModalOpen]);
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!token || !router) return;
      try {
        const response = await axiosInstance.get("/auth/current-admin", {
          headers: { authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        router.push("/sign-in");
      }
    };

    getCurrentUser();
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/feedback", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedback((prev) => [...prev, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {}
  };

  return (
    <div>
      <div
        ref={modalRef}
        className="bg-[#535353] shadow-xl  rounded-lg  max-w-[560px] w-full p-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Add New Feedback</h2>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="hover:text-gray-700 rotate-45 text-4xl  transition-all ease-in-out duration-300"
          >
            +
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium">
              Author
            </label>
            <input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              type="text"
              placeholder="Enter author"
              className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              category
            </label>
            <input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              type="text"
              placeholder="Enter category"
              className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
            />
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                type="text"
                placeholder="Enter description"
                className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-MainBg text-white py-2 px-4 rounded-md hover:bg-DarkGrey transition-all ease-in-out duration-300"
              >
                Add Question
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
