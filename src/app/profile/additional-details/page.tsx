
import AdditionalDetails from "@/components/Pages/Profile/additional";
import { Suspense } from "react";

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdditionalDetails />
    </Suspense>
  );
}
