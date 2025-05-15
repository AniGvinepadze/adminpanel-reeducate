"use client";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

type Courses = {
  _id: string;
  name: string;
  img: string;
  category: string;
  link: string;
};

export default function Dashboard() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const token = getCookie("accessToken") as string;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.log("error fertchong courses");
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" bg-DarkGrey h-[600px] w-full rounded-xl shadow-lg p-7 ">
      {courses.map((el) => (
        <div key={el._id}>
          <p>{el.category}</p>
          <p>{el.img}</p>
          <p>{el.link}</p>

          <p>{el.name}</p>
        </div>
      ))}
    </div>
  );
}
