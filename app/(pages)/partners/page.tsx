"use client";

import AboutUsPopup from "@/app/common/popups/AboutUsPopup";
import PartnerPopup from "@/app/common/popups/PartnerPopup";
import { axiosInstance } from "@/app/lib/axiosIntance";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type Partners = {
  _id: string;
  images: string[];
};

export default function page() {
  const [user, setUser] = useState();
  const [partner, setPartner] = useState<Partners[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const token = getCookie("accessToken") as string;

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/sign-in");
      return;
    }

    const getCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/current-admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Current user:", response.data);
        setUser(response.data);
      } catch (err: any) {
        console.error(
          "Failed to get current admin:",
          err.response || err.message || err
        );
        router.push("/sign-in");
      }
    };

    const fetchAboutUs = async () => {
      try {
        const response = await axiosInstance.get("/partners", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPartner(response.data);
      } catch (error) {
        console.error("Error fetching about us:", error);
      }
    };

    getCurrentUser();
    fetchAboutUs();
  }, [token, router]);

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/partners/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPartner((prev) => prev.filter((el) => el._id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  return (
    <div className=" bg-DarkGrey min-h-[600px] max-w-[1000px] w-full rounded-xl shadow-lg p-7  max-[500px]:p-3">
      <div className="w-full max-w-[1000px] flex justify-between p-3 relative">
        <div>
          <h1 className="text-2xl font-bold mb-4 max-[400px]:text-xl">პარტნიორები</h1>
        </div>
        <button
          className="bg-MainBg rounded-xl flex justify-between gap-4 py-3 px-6 hover:scale-110 ease-in-out duration-300 transition-all text-base font-medium max-[500px]:py-1 max-[400px]:px-4
          "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
          <p className="max-[500px]: text-2xl max-[400px]:text-lg">+</p>
          <p className="max-[500px]:hidden mt-1">დამატება</p>
        </button>
      </div>
      {isAddModalOpen && (
             <div className="max-w-[600px] w-full  absolute left-1/2 translate-x-[-20%] max-1100:translate-x-[-40%] max-[800px]:translate-x-[-50%] max-[700px]:w-[400px] max-700:translate-x-[-50%]  max-[450px]:max-w-[300px]">
          <PartnerPopup
            setIsAddModalOpen={setIsAddModalOpen}
            isAddModalOpen={isAddModalOpen}
            partner={partner}
            setPartner={setPartner}
          />
        </div>
      )}
      <div className="max-[450px]:flex max-[450px]:justify-center ">
        <div className="grid grid-cols-3 gap-3 max-[1050px]:grid-cols-2 max-[450px]:grid-cols-1 ">
          {partner.map((el) => (
            <div key={el._id} className="flex flex-col gap-1 max-w-[275px] ">
              <div className=" bg-MainBg rounded-xl flex justify-between gap-4 p-3 my-3">
                {el.images && el.images.length > 0 ? (
                  <div className="h-full max-w-[450px] w-full rounded">
                    <Image
                      src={`https://d1monaii5gqb9o.cloudfront.net/${el.images[0]}`}
                      alt="image"
                      width={250}
                      height={250}
                      className="object-cover rounded-md min-h-[250px] max-w-[250px] w-full  "
                    />
                  </div>
                ) : (
                  <p>No image</p>
                )}
              </div>

              <button
                className=" bg-MainBg rounded-xl flex justify-center gap-4 py-3 px-6  hover:scale-110 ease-in-out duration-300 transition-all"
                onClick={() => handleDelete(el._id)}
              >
                Delete
              </button>
              <button
                className=" bg-MainBg rounded-xl flex justify-center gap-4 py-3 px-6 my-2 hover:scale-110 ease-in-out duration-300 transition-all"
                onClick={() => router.push(`/partners/${el._id}`)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
