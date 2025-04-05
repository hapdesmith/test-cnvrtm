"use client";

import { useState, useEffect } from "react";

import Login from "@/components/Pages/Login/base";
import Homepage from "@/components/Pages/Home/base";
import { usePathname } from "next/navigation";
import { COOKIE_KEY } from "@/constant";
import useCookies from "@/hooks/useCookie";
import AppLayout from "./appLayout";

export default function Home() {
  const { getTokenFromCookies } = useCookies();
  const pathname = usePathname();
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  useEffect(() => {
    const token = getTokenFromCookies(COOKIE_KEY.CONVERTIM_TOKEN);
    if (token) {
      setIsLoginPage(true);
    }
  }, [pathname, getTokenFromCookies]);

  return (
    <AppLayout>
      {isLoginPage ? <Homepage /> : <Login />}
    </AppLayout>
  );
}
