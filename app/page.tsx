"use client";
import { useEffect, useState } from "react";
import Dashboard from "./components/Home/Dashboard";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { axiosInstance } from "./lib/axiosIntance";

export default function Home() {
  const [user, setUser] = useState();
  const router = useRouter();

  const token = getCookie("accessToken");

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
    getCurrentUser(token as string);
  }, []);

  if(!user) return null

  return (
    <div className="max-w-[1440px] w-full m-auto ">
      <Dashboard />
    </div>
  );
}
