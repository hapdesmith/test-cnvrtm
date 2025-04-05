"use client";

import React, { useMemo } from "react";
import ProfileHeader from "./ProfileHedaer";
import { useSearchParams } from "next/navigation";


export default function PersonalPreference() {
  const searchParams = useSearchParams();
  const isEdit = useMemo(() => searchParams.get('mode') === 'edit', [searchParams]);
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileHeader title="Personal Preference" isEdit={isEdit} editLink="/profile/personal-preference?mode=edit" backEditLink="/profile/personal-preference" />
      {isEdit && (
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
        </div>
      )}
      {!isEdit && (
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
        </div>
      )}
    </div>
  );
}
