"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import Header from "./global/Header";
import SideBar from "./global/SideBar";
import MobileSidebar from "./global/MobileSideBar";
import { axiosInstance } from "../lib/axiosIntance";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = getCookie("accessToken") as string;

      if (!token) {
        router.push("/sign-in");
        return;
      }

      try {
        const response = await axiosInstance.get("/auth/current-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [router]);

  const hideLayout = pathname === "/sign-in";

  return (
    <div className="max-w-[1440px] w-full m-auto p-3">
      {!hideLayout && (
        <Header onLogoClick={() => setSidebarOpen((prev) => !prev)} />
      )}

      <div
        className={`flex  gap-5 max-[800px]:flex-col ${
          hideLayout ? "justify-center -mt-8" : "justify-between mt-10"
        }`}
      >
        {!hideLayout && (
          <div
            className="sticky top-6 max-h-[700px] overflow-y-auto scrollbar-thin
                scrollbar-thumb-gray-500 scrollbar-track-gray-800 max-w-[350px] w-full
                bg-DarkGrey shadow-lg rounded-xl p-7 max-[1000px]:max-w-[250px]
                max-[800px]:hidden  max-[1000px]:p-3"
          >
            <SideBar />
          </div>
        )}

        {!hideLayout && (
          <div className="hidden max-[800px]:block">
            <MobileSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          </div>
        )}

        <div className="max-w-[1000px] w-full">{children}</div>
      </div>
    </div>
  );
}
