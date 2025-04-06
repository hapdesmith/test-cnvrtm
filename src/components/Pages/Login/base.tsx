"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Visibility, VisibilityOff } from '@mui/icons-material';

// local
import useLocalStorage from "@/hooks/useLocalStorage";
import { cn } from "@/utils/common";
import { LoginFormData } from "@/types";
import { useLoginAPI } from "@/hooks/useLoginAPI";
// 3rd party
import { useForm, SubmitHandler } from "react-hook-form";
import { CircularProgress } from "@mui/material";
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<LoginFormData>()
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setLocalStorage, getLocalStorage } = useLocalStorage();
  const { login, loading } = useLoginAPI();

  useEffect(() => {
    const loginData = getLocalStorage("loginData") as LoginFormData | null
    if (loginData) {
      setValue("userId", loginData.userId)
      setValue("password", loginData.password)
      setRememberMe(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await login(data.userId, data.password);
    if (rememberMe) {
      setLocalStorage("login", data)
    }
  }


  return (

    <div className="flex flex-col items-center justify-between px-5 pb-4">
      <h1 className="text-3xl lg:text-[60px] mt-10 mb-2 lg:mb-[60px] relative
        after:content-[''] after:absolute after:bg-black after:h-1 after:w-1/2 after:bottom-[-50%] lg:after:bottom-[-100%] after:left-1/2 after:-translate-x-1/2">
        Welcome to <b>myApp</b></h1>
      <div className="flex flex-col items-center w-full mt-10 lg:mt-8">
        {/* Form Login */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:max-w-[720px] space-y-4">
          {/* Input Nomor Handphone */}
          <div className="flex flex-col lg:flex-row items-start gap-y-2 lg:gap-x-4">
            <label className="block mt-0 lg:mt-2 text-base lg:text-xl w-full lg:w-[300px] flex-shrink-0 flex-grow-0 lg:text-right cursor-pointer" htmlFor="userId">User ID*</label>
            <div className="relative w-full">
              <input
                id="userId"
                type="text"
                {...register("userId", { required: true })}
                className={cn("w-full px-4 py-3 border border-gray-300 bg-white/10 placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.userId && "border-red-700")}
              />
              {errors.userId && (
                <p className="text-red-700 text-xs lg:text-sm mt-1 italic">
                  Must be filled
                </p>
              )}
            </div>
          </div>

          {/* Input Password */}
          <div className="flex flex-col lg:flex-row items-start gap-y-2 lg:gap-x-4">
            <label className="block mt-0 lg:mt-2 text-base lg:text-xl w-full lg:w-[300px] flex-shrink-0 flex-grow-0 lg:text-right cursor-pointer" htmlFor="password">Password*</label>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className={cn("w-full px-4 py-3 border border-gray-300 bg-white/10 placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.password && "border-red-700")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[24px] -translate-y-1/2"
              >
                {showPassword ? (
                  <Visibility className="text-gray-500 !block" />
                ) : (
                  <VisibilityOff className="text-gray-500 !block" />
                )}
              </button>
              {errors.password && (
              <p className="text-red-700 text-xs lg:text-sm mt-1 italic">
                Must be filled
              </p>
            )}
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex lg:ml-[318px] items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-[#47B881] border-gray-300 rounded"
              id="rememberMe"
            />

            <label className="ml-2 text-black text-base lg:text-lg cursor-pointer" htmlFor="rememberMe">Keep me logged in</label>
          </div>

          {/* Tombol Login */}
          <div className="flex lg:ml-[318px] pt-2">
            <button
              type="submit"
              className="py-[14.5px] w-full lg:w-auto lg:px-[100px] bg-black text-white font-medium text-base lg:text-2xl hover:bg-black/70 transition-all duration-300"
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : "LOGIN"}
            </button>

            {/* Lupa Password */}
          </div>
        </form>
      </div>

      {/* Register Link */}
      <div className="mt-4">
        <p className="text-black text-base lg:text-lg">
          No Account?
          <Link href="/register" className="underline text-base ml-1 lg:text-lg">
            Register here!
          </Link>
        </p>
      </div>
    </div>
  );
}
