
import { logo } from "@/app/assets";
import SignInFormFields from "@/app/components/SignIn/SignInFormFields";
// import LoginFormFields from "@/app/components/Login/LoginFormFields";
import Image from "next/image";
import React, { Suspense } from "react";

export default function SignIn() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="max-w-[1440px] w-full m-auto h-screen flex items-center justify-center p-5 text-LightGrey rounded-lg">
      <div className="max-w-[580px] w-full bg-DarkGrey rounded-xl  text-gray-200 m-auto p-7 max-450:p-2 max-302:p-0">
        <div className="w-full flex justify-center gap-1">
          <Image src={logo} alt="logo" width={70} height={42} className="max-450:max-w-[38px] rounded-xl"/>

          <h2 className="text-3xl font-semibold  max-450:text-[26px] ">re:</h2>
          <h2  className="text-3xl font-semibold max-450:text-[26px] rotate-180">educate</h2>
        </div>
        <div className="max-w-[580px] flex flex-col gap-2 mt-16  w-full max-450:mt-9 ">
        <div className="">
        
            <h2 className="text-[30px] font-semibold max-450:text-2xl">Sign-in</h2>
      
          <div className="max-w-[600px] w-full">
                <SignInFormFields   />
            </div> 
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  );
}