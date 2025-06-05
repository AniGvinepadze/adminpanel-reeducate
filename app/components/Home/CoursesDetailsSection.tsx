import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type CoursesDetail = {
  _id: string;
  images: string[];
  courseTitle: string;
  courseDestription: string;
  courseDuration: string;
  courseQuantity: string;
  coursePrice: string;
  courseSyllabus: string;
  courseGoal: string;
  courseLittleGoals: string;
};

interface CoursesDetailsSectionProps {
  handleDelete: (id: string) => Promise<void>;
}

export default function CoursesDetailsSection({
  handleDelete,
}: CoursesDetailsSectionProps) {
  const [coursesDetail, setCoursesDetail] = useState<CoursesDetail[]>([]);

  const token = getCookie("accessToken") as string;

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoursesDetail(response.data);
    } catch (error) {
      console.log("Error fetching courses");
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]); 
   const handleCourseDelete = async (id: string) => {
    await handleDelete(id); 
    fetchData();
  };

  const isValidCourse = (course: CoursesDetail) => {
    return (
      course.courseTitle ||
      course.courseDestription ||
      course.courseDuration ||
      course.coursePrice ||
      course.courseSyllabus ||
      course.courseGoal ||
      course.courseLittleGoals
    );
  };
  const router = useRouter();

  return (
    <div>
      {coursesDetail.map((el) => {
        if (!isValidCourse(el)) return null;

        return (
          <div key={el._id} className="max-w-[1000px] w-full mb-10 mt-5">
            <div className="max-w-[1000px] w-full bg-MainBg rounded-xl flex gap-6 p-3 max-[600px]:gap-2 max-[550px]:flex-col">
              <div className="flex-shrink-0 h-full overflow-hidden">
                {el.images && el.images.length > 0 ? (
                  <div className="h-full max-w-[450px] w-full rounded">
                    <Image
                      src={`https://d1monaii5gqb9o.cloudfront.net/${el.images[0]}`}
                      alt={el.courseTitle}
                      width={410}
                      height={150}
                      className="object-cover rounded-md min-h-[250px] max-w-[250px] 
                    max-[550px]:max-w-[410px] max-[550px]:max-h-[150px]"
                    />
                  </div>
                ) : (
                  <p>No image</p>
                )}
              </div>

              <div className="max-w-[900px] w-full">
                <div className="max-w-[900px] w-full p-3 max-[600px]:p-0 ">
                  <div className="w-full max-w-[800px] -mt-5 max-[600px]:mt-0">
                    <p className="p-2 font-medium text-sm">Title</p>
                    <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                      {el.courseTitle}
                    </p>
                  </div>
                  <div className="w-full max-w-[800px] ">
                    <p className="p-2 font-medium text-sm">Description</p>
                    <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                      {el.courseDestription}
                    </p>
                  </div>
                </div>

                <div className="max-w-[900px] w-full p-3 max-[600px]:p-0 ">
                  <div className="w-full max-w-[800px] -mt-5 max-[600px]:mt-0">
                    <p className="p-2 font-medium text-sm">Duration</p>
                    <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                      {el.courseDuration}
                    </p>
                  </div>
                  <div className="w-full max-w-[800px] ">
                    <p className="p-2 font-medium text-sm">Price</p>
                    <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                      {el.coursePrice}
                    </p>
                  </div>
                </div>

                <div className="max-w-[900px] w-full p-3 max-[600px]:p-0 ">
                  <div className="w-full max-w-[800px] -mt-5 max-[600px]:mt-0">
                    <p className="p-2 font-medium text-sm">Goals</p>
                    <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                      {el.courseGoal}
                    </p>
                  </div>
                  <div className="w-full max-w-[800px] ">
                    <p className="p-2 font-medium text-sm">Little Goals</p>
                    <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                      {el.courseLittleGoals}
                    </p>
                  </div>
                </div>

                <div className="max-w-[900px] w-full p-3 max-[600px]:p-0 ">
                  <div className="w-full max-w-[800px] -mt-5 max-[600px]:mt-0">
                    <p className="p-2 font-medium text-sm">Syllabus</p>
                    <p className="text-base font-medium w-full bg-DarkGrey max-w-[800px] p-2 rounded-xl">
                      {el.courseSyllabus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-MainBg rounded-xl flex justify-center text-base font-medium gap-4 py-3 px-6 my-3 hover:scale-105 ease-in-out duration-300 transition-all"
              onClick={() => handleCourseDelete(el._id)}
            >
              Delete
            </button>
            <button
              className="w-full bg-MainBg rounded-xl flex justify-center text-base font-medium gap-4 py-3 px-6 my-3 hover:scale-105 ease-in-out duration-300 transition-all"
              onClick={() => router.push(`/courses/${el._id}`)}
            >
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
}
