"use client";

import React from "react";
import ProfileHeader from "./ProfileHedaer";

export default function SpouseDetails() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileHeader title="Spouse Details" isEdit={false} editLink="/profile/spouse-details/edit" backEditLink="/profile/spouse-details" />
    </div>
  );
}
