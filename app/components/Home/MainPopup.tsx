"use client";
import React from "react";

type MainPopupProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const MainPopup = ({
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
}: MainPopupProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Enter course name"
            className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <input
            id="category"
            name="category"
            value={formData.category}
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
    </div>
  );
};

export default MainPopup;
