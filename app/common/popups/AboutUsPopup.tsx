"use client";

import { AboutUs } from "@/app/(pages)/about-us/page";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";

type AboutUsPopupProps = {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddModalOpen: boolean;
  aboutUs: AboutUs[];
  setAboutUs: React.Dispatch<React.SetStateAction<AboutUs[]>>;
};

const AboutUsPopup: FC<AboutUsPopupProps> = ({
  setIsAddModalOpen,
  isAddModalOpen,
  aboutUs,
  setAboutUs,
}) => {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const token = getCookie("accessToken") as string;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (setIsAddModalOpen) {
          setIsAddModalOpen(false);
        }
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
  }, [isAddModalOpen, setIsAddModalOpen]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

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
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);

      if (selectedFile) {
        data.append("img", selectedFile);
      }

      const response = await axiosInstance.post("/about-us", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAboutUs((prev) => [...prev, response.data]);
      if (setIsAddModalOpen) {
        setIsAddModalOpen(false);
      }
    } catch (error) {
      // You might want to handle the error here
      console.error(error);
    }
  };

  return (
    <div>
      <div
        ref={modalRef}
        className="bg-[#535353] shadow-xl rounded-lg max-w-[560px] w-full p-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Add New About Us Content</h2>
          <button
            onClick={() => setIsAddModalOpen?.(false)}
            className="hover:text-gray-700 rotate-45 text-4xl transition-all ease-in-out duration-300"
          >
            +
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              placeholder="Enter course name"
              className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
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
              placeholder="add description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black text-gray-700 sm:text-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium">
              Upload Image
            </label>
            <input
              id="images"
              name="images"
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              placeholder="Upload image"
              className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="w-full bg-MainBg text-white py-2 px-4 rounded-md hover:bg-DarkGrey transition-all ease-in-out duration-300"
            >
              Add About Us
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutUsPopup;
