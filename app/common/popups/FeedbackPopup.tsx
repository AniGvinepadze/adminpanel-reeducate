"use client";
import { AboutUs } from "@/app/(pages)/about-us/page";
import { Feedback } from "@/app/(pages)/feedback/page";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type FeedbackPopupProps = {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddModalOpen: boolean;
  feedback: Feedback[];
  setFeedback: React.Dispatch<React.SetStateAction<Feedback[]>>;
};

export default function FeedbackPopup({
  setIsAddModalOpen,
  isAddModalOpen,
  feedback,
  setFeedback,
}: FeedbackPopupProps) {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    user: {
      fullName: "",
      category: "",
    },
    description: "",
  });

  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const token = getCookie("accessToken") as string;
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
        router.push("/login");
      }
    };

    getCurrentUser();
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in formData.user) {
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
        className="bg-[#535353] shadow-xl  rounded-lg  w-[560px] p-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Add New About Us Content</h2>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="hover:text-gray-700 rotate-45 text-4xl  transition-all ease-in-out duration-300"
          >
            +
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              value={formData.user.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Enter full name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

     

          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <input
              id="category"
              name="category"
              value={formData.user.category}
              onChange={handleChange}
              type="text"
              placeholder="Enter category"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              type="text"
              placeholder="Add description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="w-full bg-MainBg text-white py-2 px-4 rounded-md hover:bg-DarkGrey transition-all ease-in-out duration-300"
            >
              Add Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
