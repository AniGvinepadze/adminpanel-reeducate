import { logo } from "@/app/assets";
import SignInFormFields from "@/app/components/SignIn/SignInFormFields";
// import LoginFormFields from "@/app/components/Login/LoginFormFields";
import Image from "next/image";
import React, { Suspense } from "react";

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-[1440px] w-full m-auto h-screen flex items-center justify-center p-5 text-LightGrey rounded-lg">
        <div className="max-w-[580px] w-full bg-DarkGrey rounded-xl  text-gray-200 m-auto p-7 ">
          <div className="w-full flex justify-center gap-5">
            <Image
              src={logo}
              alt="logo"
              width={70}
              height={42}
              className="max-[450px]:max-w-[60px] rounded-xl max-[350px]:max-w-[50px]"
            />
            <div className="flex gap-1">
              <h2 className="text-3xl font-semibold  max-[450px]:text-[26px] max-[350px]:text-[23px] ">
                re:
              </h2>
              <h2 className="text-3xl font-semibold max-[450px]:text-[26px] rotate-180 max-[450px]:mt-[7px] max-[350px]:text-[23px] ">
                educate
              </h2>
            </div>
          </div>
          <div className="max-w-[580px] flex flex-col gap-2 mt-16  w-full max-[450px]:mt-9 ">
            <div className="">
              <h2 className="text-[30px] font-semibold max-[450px]:text-2xl">
                Sign-in
              </h2>

              <div className="max-w-[600px] w-full">
                <SignInFormFields />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
