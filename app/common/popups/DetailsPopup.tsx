"use client";
import { Courses } from "@/app/components/Home/Dashboard";
import { axiosInstance } from "@/app/lib/axiosIntance";
import React from "react";

type DetailPopupProps = {
  formData: any;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  courses: Courses[];
  setCourses: React.Dispatch<React.SetStateAction<Courses[]>>;
  selectedFile: File | null;
  token: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DetailPopup = ({
  formData,
  handleChange,
  selectedFile,
  courses,
  setCourses,
  token,
  setIsAddModalOpen,
  handleFileChange,
}: DetailPopupProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("courseTitle", formData.courseTitle);
      data.append("courseDuration", formData.courseDuration);
      data.append("courseQuantity", formData.courseQuantity);
      data.append("coursePrice", formData.coursePrice);
      data.append("courseGoal", formData.courseGoal);
      data.append("courseDestription", formData.courseDestription);
      data.append("courseLittleGoals", formData.courseLittleGoals);
      data.append("courseSyllabus", formData.courseSyllabus);

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
  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="courseTitle" className="block text-sm font-medium">
          Course Title
        </label>
        <input
          id="courseTitle"
          name="courseTitle"
          value={formData.courseTitle}
          onChange={handleChange}
          type="text"
          placeholder="Enter course name"
          className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="courseQuantity" className="block text-sm font-medium">
          Course Quantity
        </label>
        <input
          id="courseQuantity"
          name="courseQuantity"
          value={formData.courseQuantity}
          onChange={handleChange}
          type="text"
          placeholder="e.g. UI/UX"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black text-gray-700 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="courseDuration" className="block text-sm font-medium">
          Course Duration
        </label>
        <input
          id="courseDuration"
          name="courseDuration"
          value={formData.courseDuration}
          onChange={handleChange}
          type="text"
          placeholder="e.g. UI/UX"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black text-gray-700 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="coursePrice" className="block text-sm font-medium">
          Course Price
        </label>
        <input
          id="coursePrice"
          name="coursePrice"
          value={formData.coursePrice}
          onChange={handleChange}
          type="text"
          placeholder="e.g. UI/UX"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black text-gray-700 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="courseGoal" className="block text-sm font-medium">
          Course Goal
        </label>
        <input
          id="courseGoal"
          name="courseGoal"
          value={formData.courseGoal}
          onChange={handleChange}
          type="text"
          placeholder="e.g. UI/UX"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black text-gray-700 sm:text-sm p-2"
        />
      </div>

      <div>
        <label
          htmlFor="courseDescription"
          className="block text-sm font-medium"
        >
          Course Description
        </label>
        <input
          id="courseDescription"
          name="courseDescription"
          value={formData.courseDescription}
          onChange={handleChange}
          type="text"
          placeholder="e.g. UI/UX"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black text-gray-700 sm:text-sm p-2"
        />
      </div>

      <div>
        <label
          htmlFor="courseLittleGoals"
          className="block text-sm font-medium"
        >
          Course Little Goals
        </label>
        <input
          id="courseLittleGoals"
          name="courseLittleGoals"
          value={formData.courseLittleGoals}
          onChange={handleChange}
          type="text"
          placeholder="e.g. UI/UX"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black text-gray-700 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="courseSyllabus" className="block text-sm font-medium">
          Course Syllabus
        </label>
        <input
          id="courseSyllabus"
          name="courseSyllabus"
          value={formData.courseSyllabus}
          onChange={handleChange}
          type="text"
          placeholder="e.g. UI/UX"
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
          Add Course
        </button>
      </div>
    </form>
  );
};

export default DetailPopup;
