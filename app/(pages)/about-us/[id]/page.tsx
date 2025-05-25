"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { AboutUs } from "../page";

export default function EditCoursePage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop() || "";

  const [user, setUser] = useState();
  const [aboutUs, setAboutUs] = useState<AboutUs | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
    imageFile: null as File | null,
  });
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const token = getCookie("accessToken") as string;

  const getCurrentUser = async (token: string) => {
    try {
      const response = await axiosInstance.get("/auth/current-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axiosInstance.get(`/about-us/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const aboutUsData = response.data;
        setAboutUs(aboutUsData);
        setFormData({
          title: aboutUsData.title,
          description: aboutUsData.description,
          img: aboutUsData.images?.[0] || "",
          imageFile: null,
        });
      } catch (error) {
        console.error("Failed to load course", error);
      }
    }

    fetchCourse();
    getCurrentUser(token as string);
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
    }));
    setPreviewImageUrl(localUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);
    formDataToSend.append("title", formData.title);
    if (formData.imageFile) {
      formDataToSend.append("img", formData.imageFile);
    }

    try {
      await axiosInstance.patch(`/about-us/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/about-us");
    } catch (error) {
      console.error("Failed to update course", error);
    }
  };

  if (!aboutUs) return <p>Loading...</p>;

  return (
    <div className="bg-DarkGrey min-h-[600px] w-full rounded-lg shadow-xl p-7 max-700:p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "description"].map((field) => (
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

        <div>
          <label
            htmlFor="image"
            className="block mb-1 font-medium capitalize p-1"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {previewImageUrl && (
            <div className="mt-2">
              <img
                src={previewImageUrl}
                alt="Preview"
                className="max-w-xs max-h-40 object-contain rounded"
              />
              <p className="text-sm break-all">{previewImageUrl}</p>
            </div>
          )}
        </div>

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
