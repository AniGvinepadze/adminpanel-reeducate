"use client";
import { Blogs } from "@/app/(pages)/blog/page";
import { WhyUs } from "@/app/(pages)/why-us/page";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import MainBlogPopup from "./MainBlogPopup";
import BlogsDetailsPopup from "./BlogsDetailsPopup";

type BlogsPopupProps = {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddModalOpen: boolean;
  blog: Blogs[];
  setBlog: React.Dispatch<React.SetStateAction<Blogs[]>>;
  handleAddCourse: (newblog: Blogs) => void;
};
export default function BlogsPopup({
  setIsAddModalOpen,
  isAddModalOpen,
  blog,
  setBlog,
  handleAddCourse,
}: BlogsPopupProps) {
  const token = getCookie("accessToken") as string;

  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    description: "",
    title: "",
    images: [],
  });
  const [mainActive, setMainActive] = useState(true);
  const [detailsActive, setDetailsActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      data.append("description", formData.description);
      data.append("title", formData.title);

      if (selectedFile) {
        data.append("img", selectedFile);
      }

      const response = await axiosInstance.post("/blogs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlog((prev) => [...prev, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {}
  };

  const handleMainOnClick = () => {
    setMainActive(true);
    setDetailsActive(false);
  };
  const handleDetailOnClick = () => {
    setMainActive(false);
    setDetailsActive(true);
  };
  return (
    <div>
      <div
        ref={modalRef}
        className="bg-[#535353] shadow-xl  rounded-lg  max-w-[560px] w-full p-6"
      >
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex gap-5 justify-center">
            <button
              className={`bg-tranparent border-2 border-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[400px]:py-1 ${
                mainActive ? "bg-MainBg" : ""
              }
          `}
              onClick={handleMainOnClick}
            >
              მთავარი
            </button>
            <button
              className={`bg-tranparent border-2 border-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[400px]:py-1 ${
                detailsActive ? "bg-MainBg" : ""
              }
          `}
              onClick={handleDetailOnClick}
            >
              დეტალები
            </button>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="hover:text-gray-700 rotate-45 text-4xl  transition-all ease-in-out duration-300"
          >
            +
          </button>
        </div>

        {mainActive ? (
          <MainBlogPopup
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <BlogsDetailsPopup 
           formData={formData}
            handleChange={handleChange}
            selectedFile={selectedFile}
            token={token}
            blog={blog}
            setBlog={setBlog}
            setIsAddModalOpen={setIsAddModalOpen}
            handleFileChange={handleFileChange}
            handleAddCourse={handleAddCourse}
          />
        )}

      </div>
    </div>
  );
}
