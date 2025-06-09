"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { Blogs } from "../page";

export default function page() {
  const router = useRouter();
  const pathname = usePathname();
  const [mainActive, setMainActive] = useState(true);
  const [detailsActive, setDetailsActive] = useState(false);
  const [user, setUser] = useState();
  const id = pathname.split("/").pop() || "";

  const [blog, setBlog] = useState<Blogs | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    title: "",
    img: "",
    imageFile: null as File | null,
  });
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const token = getCookie("accessToken") as string;

  const handleMainOnClick = () => {
    setMainActive(true);
    setDetailsActive(false);
  };

  const handleDetailOnClick = () => {
    setMainActive(false);
    setDetailsActive(true);
  };
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
    async function fetchBlogs() {
      try {
        const response = await axiosInstance.get(`/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog(response.data);
        setFormData({
          description: response.data.description,
          title: response.data.title,
          img: response.data.images?.[0] || "",
          imageFile: null,
        });
      } catch (error) {
        console.error("Failed to load course", error);
      }
    }

    fetchBlogs();
    getCurrentUser(token as string);
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await axiosInstance.patch(`/blogs/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/blog");
    } catch (error) {
      console.error("Failed to update course", error);
    }
  };
    if (!blog) return <p>Loading...</p>;

  return (
    <div className="bg-DarkGrey min-h-[600px] w-full rounded-lg shadow-xl p-7 max-[700px]:p-4">
       <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
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
        <div></div>
        </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        {["description", "title"].map((field) => (
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
