"use client";

import React, { useEffect, useMemo } from "react";
import ProfileHeader from "./ProfileHedaer";
import { useSearchParams } from "next/navigation";
import { useProfile } from "@/contexts/profile/context";
import ProfileField from "./ProfileField";
import { useForm } from "react-hook-form";
import { cn } from "@/utils/common";
import ProfileInput from "./ProfileInput";
import { useRouter } from "next/navigation";
import { PersonalPreferenceInput } from "@/types";
import { useMessage } from "@/contexts/message/context";


export default function PersonalPreference() {
  const { personalPreference, updateProfileToLocalStorage } = useProfile();
  const { showSuccess } = useMessage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    defaultValues: {
      hobbies: personalPreference?.hobbies?.join(",") || "",
      sports: personalPreference?.sports?.join(",") || "",
      music: personalPreference?.music?.join(",") || "",
      movies: personalPreference?.movies?.join(",") || "",
    }
  });

  useEffect(() => {
    setValue("hobbies", personalPreference?.hobbies?.join(",") || "");
    setValue("sports", personalPreference?.sports?.join(",") || "");
    setValue("music", personalPreference?.music?.join(",") || "");
    setValue("movies", personalPreference?.movies?.join(",") || "");
  }, [personalPreference, setValue]);

  const isEdit = useMemo(() => searchParams.get('mode') === 'edit', [searchParams]);

  useEffect(() => {
    if (isEdit) {
      reset({
        hobbies: personalPreference?.hobbies?.join(",") || "",
        sports: personalPreference?.sports?.join(",") || "",
        music: personalPreference?.music?.join(",") || "",
        movies: personalPreference?.movies?.join(",") || "",
      });
    }
  }, [isEdit, reset, personalPreference]);

  const onSubmit = (data: PersonalPreferenceInput) => {
    const joinedData = {
      hobbies: data.hobbies?.split(","),
      sports: data.sports?.split(","),
      music: data.music?.split(","),
      movies: data.movies?.split(","),
    }
    updateProfileToLocalStorage("personalPreference", joinedData);
    showSuccess("Personal preference updated successfully");
    router.push('/profile/personal-preference');
  }
  const handleCancel = () => {
    router.push('/profile/personal-preference');
  }
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileHeader title="Personal Preference" isEdit={isEdit} editLink="/profile/personal-preference?mode=edit" backEditLink="/profile/personal-preference" />
      {!isEdit && (
        <div className="flex flex-row gap-x-3 lg:gap-x-5 items-start justify-start mt-10">
          <div className="flex flex-col gap-y-3 lg:gap-y-5">
            <ProfileField label="Hobbies*" value={personalPreference?.hobbies?.join(", ")} />
            <ProfileField label="Sports*" value={personalPreference?.sports?.join(", ")} />
            <ProfileField label="Music*" value={personalPreference?.music?.join(", ")} />
            <ProfileField label="Movies*" value={personalPreference?.movies?.join(", ")} />
          </div>
        </div>
      )}
      {isEdit && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-x-3 lg:gap-x-5 items-start justify-start mt-10">
          <div className="w-full lg:w-[400px] flex flex-col gap-y-3 lg:gap-y-5">
            <ProfileInput
              label="Hobbies*"
              error="Please enter your hobbies"
              isError={!!errors.hobbies}
            >
              <input type="text"
                {...register("hobbies", { required: true })}
                placeholder="Enter your favorite hobbies, separated by commas"
                className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.hobbies && "border-red-500")} />
            </ProfileInput>
            <ProfileInput
              label="Sports*"
              error="Please enter your sports"
              isError={!!errors.sports}
            >
              <input type="text"
                {...register("sports", { required: true })}
                placeholder="Enter your favorite sports, separated by commas"
                className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.sports && "border-red-500")} />
            </ProfileInput>
            <ProfileInput
              label="Music*"
              error="Please enter your music"
              isError={!!errors.music}
            >
              <input type="text"
                {...register("music", { required: true })}
                placeholder="Enter your favorite music, separated by commas"
                className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.music && "border-red-500")} />
            </ProfileInput>
            <ProfileInput
              label="Movies*"
              error="Please enter your movies"
              isError={!!errors.movies}
            >
              <input type="text"
                {...register("movies", { required: true })}
                placeholder="Enter your favorite movies, separated by commas"
                className={cn("w-full px-4 py-3 border-2 border-gray-700 bg-black/10 backdrop-blur-sm placeholder:text-gray text-black text-sm focus:outline-none focus:ring-0 leading-[22px]", errors.movies && "border-red-500")} />
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
