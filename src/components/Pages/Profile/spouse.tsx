"use client";

import React, { useEffect, useMemo } from "react";
import ProfileHeader from "./ProfileHedaer";
import { useSearchParams } from "next/navigation";
import { useProfile } from "@/contexts/profile/context";
import ProfileField from "./ProfileField";
import { useForm } from "react-hook-form";
import { cn } from "@/utils/common";
import { SALUTATION } from "@/constant";
import ProfileInput from "./ProfileInput";
import { useRouter } from "next/navigation";
import { SpouseData, SalutationType } from "@/types";
import { useMessage } from "@/contexts/message/context";


export default function PersonalPreference() {
  const { spouseData, updateProfileToLocalStorage } = useProfile();
  const { showSuccess } = useMessage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    defaultValues: {
      salutation: spouseData?.salutation as SalutationType || "",
      firstName: spouseData?.firstName || "",
      lastName: spouseData?.lastName || "",
    }
  });

  useEffect(() => {
    setValue("salutation", spouseData?.salutation as SalutationType || "");
    setValue("firstName", spouseData?.firstName || "");
    setValue("lastName", spouseData?.lastName || "");
  }, [spouseData, setValue]);

  const isEdit = useMemo(() => searchParams.get('mode') === 'edit', [searchParams]);

  useEffect(() => {
    if (isEdit) {
      reset({
        salutation: spouseData?.salutation as SalutationType || "",
        firstName: spouseData?.firstName || "",
        lastName: spouseData?.lastName || "",
      });
    }
  }, [isEdit, reset, spouseData]);

  const onSubmit = (data: SpouseData) => {
    updateProfileToLocalStorage("spouseData", data);
    showSuccess("Spouse details updated successfully");
    router.push('/profile/spouse-details');
  }
  const handleCancel = () => {
    router.push('/profile/spouse-details');
  }
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileHeader title="Spouse Details" isEdit={isEdit} editLink="/profile/spouse-details?mode=edit" backEditLink="/profile/spouse-details" />
      {!isEdit && (
        <div className="flex flex-row gap-x-3 lg:gap-x-5 items-start justify-start mt-10">
          <div className="flex flex-col gap-y-3 lg:gap-y-5">
            <ProfileField label="Salutation*" value={spouseData?.salutation} />
            <ProfileField label="First name*" value={spouseData?.firstName} />
            <ProfileField label="Last name*" value={spouseData?.lastName} />
          </div>
        </div>
      )}
      {isEdit && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-x-3 lg:gap-x-5 items-start justify-start mt-10">
          <div className="w-full lg:w-[400px] flex flex-col gap-y-3 lg:gap-y-5">
            <ProfileInput
              label="Salutation*"
              error="Please select your salutation"
              isError={!!errors.salutation}
            >
              <select
                id="salutation"
                {...register("salutation", { required: true })}
                className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.salutation && "border-red-500")}
              >
                <option value="">Select Salutation</option>
                <option value={SALUTATION.MR}>Mr.</option>
                <option value={SALUTATION.MRS}>Mrs.</option>
                <option value={SALUTATION.MS}>Ms.</option>
              </select>
            </ProfileInput>
            <ProfileInput
              label="First name*"
              error="Please enter your first name"
              isError={!!errors.firstName}
            >
              <input type="text"
                {...register("firstName", { required: true })}
                className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.firstName && "border-red-500")} />
            </ProfileInput>
            <ProfileInput
              label="Last name*"
              error="Please enter your last name"
              isError={!!errors.lastName}
            >
              <input type="text"
                {...register("lastName", { required: true })}
                className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.lastName && "border-red-500")} />
            </ProfileInput>
            <div className="flex flex-row gap-x-3 lg:gap-x-5 mt-6">
              <button
                type="submit"
                className="w-full px-4 py-3 border-2 border-gray-700 bg-black backdrop-blur-sm text-white text-base lg:text-lg uppercase font-bold hover:bg-black/80 transition-all duration-300">Save & update</button>
              <button
                type="button"
                onClick={() => handleCancel()}
                className="w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm text-black text-base lg:text-lg uppercase font-bold hover:bg-black/20 transition-all duration-300">Cancel</button>
            </div>
            <p className="text-sm lg:text-base text-gray-500 italic">* Mandatory fields</p>
          </div>
        </form>
      )}
    </div>
  );
}
