"use client";

import React, { useEffect, useMemo } from "react";
import ProfileHeader from "./ProfileHedaer";
import { useProfile } from "@/contexts/profile/context";
import { useMessage } from "@/contexts/message/context";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileField from "./ProfileField";
import { useForm } from "react-hook-form";
import ProfileInput from "./ProfileInput";
import { AdditionalData, GenderType, MartialStatusType } from "@/types";
import { GENDER, MARTIAL_STATUS } from "@/constant";
import { cn } from "@/utils/common";
import { format } from 'date-fns';

export default function AdditionalDetails() {
  const { additionalData, updateProfileToLocalStorage } = useProfile();
  const { showSuccess } = useMessage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const seventeenYearsAgo = new Date();
  seventeenYearsAgo.setFullYear(seventeenYearsAgo.getFullYear() - 17);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<AdditionalData>({
    defaultValues: {
      homeAddress: additionalData?.homeAddress || "",
      country: additionalData?.country || "",
      dateOfBirth: additionalData?.dateOfBirth || "",
      gender: additionalData?.gender as GenderType || "",
      martialStatus: additionalData?.martialStatus as MartialStatusType || "",
    }
  });

  useEffect(() => {
    setValue("homeAddress", additionalData?.homeAddress || "");
    setValue("country", additionalData?.country || "");
    setValue("dateOfBirth", additionalData?.dateOfBirth || "");
    setValue("gender", additionalData?.gender as GenderType || "");
    setValue("martialStatus", additionalData?.martialStatus as MartialStatusType || "");
  }, [additionalData, setValue]);

  const isEdit = useMemo(() => searchParams.get('mode') === 'edit', [searchParams]);

  useEffect(() => {
    if (isEdit) {
      reset({
        homeAddress: additionalData?.homeAddress || "",
        country: additionalData?.country || "",
        dateOfBirth: additionalData?.dateOfBirth || "",
        gender: additionalData?.gender as GenderType || "",
        martialStatus: additionalData?.martialStatus as MartialStatusType || "",
      });
    }
  }, [isEdit, reset, additionalData]);

  const onSubmit = (data: AdditionalData) => {
    updateProfileToLocalStorage("additionalData", data);
    if (typeof window !== "undefined") {
      const event = new CustomEvent("updateMartialStatus", { detail: data.martialStatus });
      window.dispatchEvent(event);
    }
    showSuccess("Additional details updated successfully");
    router.push('/profile/additional-details');
  }

  const handleCancel = () => {
    router.push('/profile/additional-details');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ProfileHeader title="Additional Details" isEdit={isEdit} editLink="/profile/additional-details?mode=edit" backEditLink="/profile/additional-details" />
      {!isEdit && (
        <div className="flex flex-col gap-y-3 lg:gap-y-5 mt-10">
          <ProfileField label="Home Address*" value={additionalData?.homeAddress} />
          <ProfileField label="Country*" value={additionalData?.country} />
          <ProfileField label="Date of birth*" value={additionalData?.dateOfBirth} />
          <ProfileField label="Gender*" value={additionalData?.gender} />
          <ProfileField label="Martial status*" value={additionalData?.martialStatus} />
        </div>
      )}
      {isEdit && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-[400px] flex flex-col gap-y-3 lg:gap-y-5 mt-10">
          <ProfileInput
            label="Home Address*"
            error="Please enter your home address"
            isError={!!errors.homeAddress}
          >
            <input
              type="text"
              id="homeAddress"
              className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.homeAddress && "border-red-500")}
              {...register("homeAddress", { required: true })} />
          </ProfileInput>
          <ProfileInput
            label="Country*"
            error="Please enter your country"
            isError={!!errors.country}
          >
            <input
              type="text"
              id="country"
              className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.country && "border-red-500")}
              {...register("country", { required: true })} />
          </ProfileInput>
          <ProfileInput
            label="Date of birth*"
            error={errors.dateOfBirth ? (errors.dateOfBirth.type === 'validate' ? 'You have to be at least 17 years old' : 'Please enter your date of birth') : ''}
            isError={!!errors.dateOfBirth}
          >
            <input
              type="date"
              id="dateOfBirth"
              {...register("dateOfBirth", {
                required: true,
                validate: (value) => {
                  const birthDate = new Date(value);
                  const age = new Date().getFullYear() - birthDate.getFullYear();
                  const monthDiff = new Date().getMonth() - birthDate.getMonth();
                  const dayDiff = new Date().getDate() - birthDate.getDate();
                  return age > 17 || (age === 17 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
                }
              })}
              max={format(new Date(), 'yyyy-MM-dd')}
              onFocus={(e) => e.target.value = format(seventeenYearsAgo, 'yyyy-MM-dd')}
              className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.dateOfBirth && "border-red-500")}
            />
          </ProfileInput>
          <ProfileInput
            label="Gender*"
            error="Please enter your gender"
            isError={!!errors.gender}
          >
            <select
              id="gender"
              {...register("gender", { required: true })}
              className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.gender && "border-red-500")}
            >
              <option value="">Select Gender</option>
              <option value={GENDER.MALE}>Male</option>
              <option value={GENDER.FEMALE}>Female</option>
            </select>
          </ProfileInput>
          <ProfileInput
            label="Martial status*"
            error="Please enter your martial status"
            isError={!!errors.martialStatus}
          >
            <select
              id="martialStatus"
              {...register("martialStatus", { required: true })}
              className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.martialStatus && "border-red-500")}
            >
              <option value="">Select Martial Status</option>
              <option value={MARTIAL_STATUS.SINGLE}>Single</option>
              <option value={MARTIAL_STATUS.MARRIED}>Married</option>
            </select>
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
        </form>
      )}

    </div>
  );
}
