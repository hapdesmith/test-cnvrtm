'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/Common/Header";
import { cn } from "@/utils/common";
import { COOKIE_KEY } from "@/constant";
import useCookies from "@/hooks/useCookie";


export default function AppLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const { getTokenFromCookies } = useCookies();

  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);

  useEffect(() => {
    const token = getTokenFromCookies(COOKIE_KEY.CONVERTIM_TOKEN);
    if (token) {
      setIsLoginPage(true);
    }
  }, [getTokenFromCookies, pathname]);

  return (
    <div className={cn("bg-[length:auto_100%] lg:bg-cover lg:bg-center bg-no-repeat",
      isLoginPage ? "bg-[url(/bg-1.jpg)]" : "bg-[url(/bg.jpg)]")}>
        <div className="flex flex-col min-h-screen max-w-none lg:max-w-7xl w-full mx-auto">
          <Header />
          <div>
            {children}
          </div>
        </div>
      </div>
  );
}
