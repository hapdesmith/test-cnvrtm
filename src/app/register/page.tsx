"use client";

import { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';

// local
import { cn } from "@/utils/common";
import { RegisterFormData } from "@/types";
import { useLoginAPI } from "@/hooks/useLoginAPI";
// 3rd party
import { useForm, SubmitHandler } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import AppLayout from "../appLayout";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<RegisterFormData>()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: handleRegister, loading } = useLoginAPI();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    await handleRegister(data.userId, data.password, data.confirmPassword);
  }


  return (
    <AppLayout>
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

            <div className="flex flex-col lg:flex-row items-start gap-y-2 lg:gap-x-4">
              <label className="block mt-0 lg:mt-2 text-base lg:text-xl w-full lg:w-[300px] flex-shrink-0 flex-grow-0 lg:text-right cursor-pointer" htmlFor="password">Confirm Password*</label>
              <div className="relative w-full">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", { required: true, validate: (value) => value === getValues("password") })}
                  className={cn("w-full px-4 py-3 border border-gray-300 bg-white/10 placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.confirmPassword && "border-red-700")}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[24px] -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <Visibility className="text-gray-500 !block" />
                  ) : (
                    <VisibilityOff className="text-gray-500 !block" />
                  )}
                </button>
                {errors.confirmPassword && (
                <p className="text-red-700 text-xs lg:text-sm mt-1 italic">
                  Password does not match
                </p>
              )}
              </div>
            </div>

            {/* Tombol Register */}
            <div className="flex lg:ml-[318px] pt-2">
              <button
                type="submit"
                className="py-[14.5px] w-full lg:w-auto lg:px-[100px] bg-black text-white font-medium text-base lg:text-2xl hover:bg-black/70 transition-all duration-300"
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : "REGISTER"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
