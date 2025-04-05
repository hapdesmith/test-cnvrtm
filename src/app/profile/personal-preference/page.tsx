import PersonalPreference from "@/components/Pages/Profile/personal";
import { Suspense } from "react";

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PersonalPreference />
    </Suspense>
  );
}
