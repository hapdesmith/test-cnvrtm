import BasicDetails from "@/components/Pages/Profile/profile";
import { Suspense } from "react";

export default function LandingPage() {

  return (
    // TODO: get profile API here and pass it to profile context
    <Suspense fallback={<div>Loading...</div>}>
      <BasicDetails />
    </Suspense>
  );
}
