"use client";

import { axiosInstance } from "@/app/lib/axiosIntance";
// import { emailIcon, passwordIcon } from "@/app/assets";

import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export type FormData = {
  email: string;
  password: string;
};

export default function SignInFormFields() {
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const getCurrentUser = async (token: string) => {
    try {
      const response = await axiosInstance.get("/auth/current-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      getCurrentUser(token);
      setCookie("accessToken", token, { maxAge: 60 * 60 });
      router.push("/");
    }
  }, [searchParams]);

  const onSubmit = async (formData: FormData) => {
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/sign-in", formData);
      setError(null);

      if (response.status === 201) {
        setCookie("accessToken", response.data.accessToken, {
          maxAge: 60 * 60,
        });

        router.push("/");
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-5  mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative  ">
        <p className="font-normal text-xs mb-2  text-gray-200 ">
          Email address
        </p>

        <input
          type="text"
          placeholder="e.g. alex@email.com"
          className={`px-3 py-[10px] w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-MainPurple focus:shadow-2xl ${
            errors.email ? "input-error" : ""
          }`}
          {...register("email", {
            validate: {
              notAdmin: (value) =>
                value !== "admin@example.com" || "Reserved Email",
              blackList: (value) => {
                const blackList = ["mail.ru", "yandex.ru"];
                const domain = value.split("@")[1];
                if (!domain) return "Invalid Email Format";
                return blackList.includes(domain) ? "BlackListed Email" : true;
              },
            },
          })}
        />
        {errors.email && (
          <p className="text-red-600 text-xs italic mt-3">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="relative ">
        <p className="font-normal text-xs my-2  text-gray-200 ">Password</p>
      
        <input
          type="text"
          placeholder="Enter your password"
          className={` px-3 py-[10px] bg-gray-100  w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-MainPurple  focus:shadow-lg ${
            errors.email ? "input-error" : ""
          }`}
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic mt-3">
            {errors.password.message}
          </p>
        )}

        {error && <p className="text-red-500 text-xs italic mt-3">{error}</p>}
      </div>

      <div className="w-full flex flex-col gap-5">
        <button
          className="w-full text-white bg-MainBg bg-MainPurple font-medium text-base p-2 rounded-lg cursor-pointer hover:scale-105 hover:bg-[#3b3a3a] transition-all ease-in-out duration-300 my-3"
          type="submit"
        >
          Login
        </button>

     
       
      </div>
    </form>
  );
}
