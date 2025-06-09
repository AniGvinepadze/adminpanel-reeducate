"use client";
import React, { useEffect, useRef, useState } from "react";
import { Courses } from "./Dashboard";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import MainPopup from "@/app/components/Home/MainPopup";
import DetailPopup from "@/app/components/Home/DetailsPopup";

type DashboardPopupProps = {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddModalOpen: boolean;
  courses: Courses[];
  setCourses: React.Dispatch<React.SetStateAction<Courses[]>>;
    handleAddCourse: (newCourse: Courses) => void;
};

export default function DashboardPopup({
  setIsAddModalOpen,
  isAddModalOpen,
    handleAddCourse,
  courses,
  setCourses,
}: DashboardPopupProps) {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    name: "",
    images: [],
    category: "",
    courseTitle: "",
    courseQuantity: "",
    courseDuration: "",
    coursePrice: "",
    courseDescription: "",
    courseLittleGoals: "",
    courseSyllabus: "",
    courseGoal: "",
  });
  const [mainActive, setMainActive] = useState(true);
  const [detailsActive, setDetailsActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      data.append("name", formData.name);
      data.append("category", formData.category);

      if (selectedFile) {
        data.append("img", selectedFile);
      }

      const response = await axiosInstance.post("/courses", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses((prev) => [...prev, response.data]);
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
        className="bg-[#535353] shadow-xl  rounded-lg   max-w-[560px] w-full p-6  inset-0 z-50 max-[1100px]:left-20"
      >
        <div className="flex justify-center items-center">
          <div>
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
          </div>
        </div>

        {mainActive ? (
          <MainPopup
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <DetailPopup
            formData={formData}
            handleChange={handleChange}
            selectedFile={selectedFile}
            token={token}
            courses={courses}
            setCourses={setCourses}
            setIsAddModalOpen={setIsAddModalOpen}
            handleFileChange={handleFileChange}
            handleAddCourse={handleAddCourse}
          />
        )}
      </div>
    </div>
  );
}
