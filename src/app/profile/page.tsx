import BasicDetails from "@/components/Pages/Profile/profile";
import { Suspense } from "react";

export default function LandingPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BasicDetails />
    </Suspense>
  );
}
