"use client";
import React, { useEffect, useState } from "react";
import { CoursesDetail } from "./CoursesDetailsSection";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { useRouter } from "next/navigation";

type DetailseditSectionProps = {
  id: string;
  getCurrentUser: (token: string) => Promise<void>;
  token: string;
  previewImageUrl: string | null;
  setPreviewImageUrl: (url: string | null) => void;
};

export default function DetailsEditSecction({
  id,
  token,
  getCurrentUser,
  previewImageUrl,
  setPreviewImageUrl,
}: DetailseditSectionProps) {
  const [detailCourse, setDetailsCourse] = useState<CoursesDetail | null>(null);
  const [detailsFormData, setDetailsFormData] = useState({
    courseTitle: "",
    courseDuration: "",
    coursePrice: "",
    courseGoal: "",
    courseDescription: "",
    courseLittleGoals: "",
    courseSyllabus: "",
    img: "",
    imageFile: null as File | null,
  });

  useEffect(() => {
    async function fetchDetailsCourse() {
      try {
        const response = await axiosInstance.get(`courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const detailscoursedata = await response.data;
        setDetailsCourse(detailscoursedata);
        setDetailsFormData({
          courseTitle: detailscoursedata.courseTitle,
          courseDescription: detailscoursedata.courseDescription,
          courseDuration: detailscoursedata.courseDuration,
          courseGoal: detailscoursedata.courseGoal,
          courseLittleGoals: detailscoursedata.courseLittleGoals,
          coursePrice: detailscoursedata.coursePrice,
          courseSyllabus: detailscoursedata.courseSyllabus,
          img: detailscoursedata.images?.[0] || "",
          imageFile: null,
        });
      } catch (error) {
        console.error("Failed to load edit course", error);
      }
    }

    fetchDetailsCourse();
    getCurrentUser(token as string);
  }, [token, id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(file);
    setDetailsFormData((prev) => ({
      ...prev,
      imageFile: file,
    }));
    setPreviewImageUrl(localUrl);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetailsFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const detailsFormDataToSend = new FormData();
    detailsFormDataToSend.append("courseTitle", detailsFormData.courseTitle);
    detailsFormDataToSend.append(
      "courseDescription",
      detailsFormData.courseDescription
    );
    detailsFormDataToSend.append(
      "courseDuration",
      detailsFormData.courseDuration
    );

    detailsFormDataToSend.append("courseGoal", detailsFormData.courseGoal);
    detailsFormDataToSend.append(
      "courseLittleGoals",
      detailsFormData.courseLittleGoals
    );
    detailsFormDataToSend.append(
      "courseSyllabus",
      detailsFormData.courseSyllabus
    );
    if (detailsFormData.imageFile) {
      detailsFormDataToSend.append("img", detailsFormData.imageFile);
      console.log("Submitting form with data: ", detailsFormDataToSend);

      try {
        await axiosInstance.patch(`/courses/${id}`, detailsFormDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        router.push("/");
      } catch (error) {
        console.error("Failed to update course", error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.keys(detailsFormData).map((field) => {
        if (field === "imageFile") return null;

        return (
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
              value={
                detailsFormData[field as keyof typeof detailsFormData] as string
              }
              onChange={handleChange}
              className="w-full border text-gray-700 border-gray-300 rounded-xl px-3 py-2"
            />
          </div>
        );
      })}

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
  );
}
