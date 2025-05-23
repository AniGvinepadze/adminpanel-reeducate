"use client"
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SideBar from "./components/global/SideBar";
import Header from "./components/global/Header";
import MobileSidebar from "./components/global/MobileSideBar";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#151515] text-[#e0dede]`}
      >
        <div className="max-w-[1440px] w-full m-auto p-5">
          <Header onLogoClick={toggleSidebar} />
          <div className="flex justify-between my-10 gap-5 max-800:flex-col">
            <div className=" max-w-[350px] w-full bg-DarkGrey shadow-lg rounded-xl p-7 max-1000:max-w-[250px]  max-800:max-w-full  sticky top-0 max-h-[800px] overflow-y-auto custom-scrollbar max-1000:p-3 max-800:hidden">
              <SideBar />
            </div>
            <div className="hidden max-800:flex">
              <MobileSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen}/>
            </div>

            <div className="max-w-[1000px] w-full ">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
