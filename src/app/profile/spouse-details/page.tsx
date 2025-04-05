import SpouseDetails from "@/components/Pages/Profile/spouse";
import { Suspense } from "react";

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SpouseDetails />
    </Suspense>
  );
}
