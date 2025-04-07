"use client";

import { cn } from "@/utils/common";
import AppLayout from "../appLayout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProfileProvider } from '@/contexts/profile/context';
import useLocalStorage from "@/hooks/useLocalStorage";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = useMemo(() => (path: string) => pathname === path, [pathname]);
  const [isMarried, setIsMarried] = useState<boolean>(false);
  const { getLocalStorage, setLocalStorage } = useLocalStorage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMartialStatusChange = (event: Event) => {
        const customEvent = event as CustomEvent;
        console.log(customEvent.detail);
        setLocalStorage("isMarried", customEvent.detail === "married");
        setIsMarried(customEvent.detail === "married");
      };

      const initialMaritalStatus = getLocalStorage("isMarried") as boolean;
      setIsMarried(initialMaritalStatus);

      // hack: because there is no BE to get profile data and the profile context is at this level, it cannot be used.
      //       we use this custom event to throw upadted martial status.
      window.addEventListener("updateMartialStatus", handleMartialStatusChange as EventListener);

      return () => {
        window.removeEventListener("updateMartialStatus", handleMartialStatusChange as EventListener);
      };
    }
  }, [getLocalStorage, setLocalStorage]);

  return (
    <ProfileProvider>
      <AppLayout>
        <div className="flex flex-col lg:flex-row px-4">
          <div className="w-full lg:w-1/4 lg:mr-10">
            <ul className="flex flex-col lg:mt-[100px]">
              <li className={cn("py-2 border-b border-t border-gray-300", isActive("/profile") && "border-b-4")}>
                <Link
                  className={cn("text-lg", isActive("/profile") && "font-bold")}
                  href="/profile">Basic Details</Link>
              </li>
              <li className={cn("py-2 border-b border-gray-300", isActive("/profile/additional-details") && "border-b-4")}>
                <Link
                  className={cn("text-lg", isActive("/profile/additional-details") && "font-bold")}
                  href="/profile/additional-details">Additional Details</Link>
              </li>
              {isMarried && (
                <li className={cn("py-2 border-b border-gray-300", isActive("/profile/spouse-details") && "border-b-4")}>
                  <Link
                    className={cn("text-lg", isActive("/profile/spouse-details") && "font-bold")}
                    href="/profile/spouse-details">Spouse Details</Link>
                </li>
              )}
              <li className={cn("py-2 border-b border-gray-300", isActive("/profile/personal-preference") && "border-b-4")}>
                <Link
                  className={cn("text-lg", isActive("/profile/personal-preference") && "font-bold")}
                  href="/profile/personal-preference">Personal Preference</Link>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-3/4">
            {children}
          </div>
        </div>
      </AppLayout>
    </ProfileProvider>
  );
}
