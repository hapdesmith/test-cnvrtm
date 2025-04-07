'use client';

import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useEffect, useState } from 'react';
import { COOKIE_KEY } from "@/constant";
import useCookies from "@/hooks/useCookie";
import { useRouter } from "next/navigation";

export default function Header() {

  const router = useRouter();
  const { removeCookie, getTokenFromCookies } = useCookies();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const token = getTokenFromCookies(COOKIE_KEY.CONVERTIM_TOKEN);
    if (token) {
      setIsLoggedIn(true);
    }
  }, [getTokenFromCookies]);

  const renderMenuIcon = () => {
    if (isDrawerOpen) {
      return <MenuOpenIcon className="!text-4xl lg:!text-[60px] text-black" />;
    }
    return <MenuIcon className="!text-4xl lg:!text-[60px] text-black" />;
  };

  const handleLogout = () => {
    removeCookie(COOKIE_KEY.CONVERTIM_TOKEN);
    router.push('/login');
  };

  return (
    <div className="flex flex-row items-center justify-between py-4 px-4 lg:px-0">
      <Link className="text-2xl lg:text-[40px] font-medium mb-0 px-10 py-2 lg:py-4 border border-gray-300" href="/">LOGO</Link>
      <div className="relative">
        {isLoggedIn && (
          <button onClick={toggleDrawer}>
            {renderMenuIcon()}
          </button>
        )}
        {isDrawerOpen && isLoggedIn && (
          <div className="fixed lg:absolute z-10 top-[80px] left-0 lg:left-auto lg:right-0 lg:top-[100%] right-0 bg-white/50 backdrop-blur-sm shadow-lg">
            <ul className="list-none">
              <li><Link className="block px-5 py-3 hover:bg-white/70 transition-all duration-300 text-black text-lg lg:text-xl whitespace-nowrap font-bold lg:font-medium" href="/home">Home</Link></li>
              <li><Link className="mt-2 block px-5 py-3 hover:bg-white/70 transition-all duration-300 text-black text-lg lg:text-xl whitespace-nowrap font-bold lg:font-medium" href="/profile">My Profile</Link></li>
              <li><Link className="mt-2 block px-5 py-3 hover:bg-white/70 transition-all duration-300 text-black text-lg lg:text-xl whitespace-nowrap font-bold lg:font-medium" href="/profile?mode=edit">Edit Profile</Link></li>
              <li><div className="mt-2 block px-5 py-3 hover:bg-white/70 transition-all duration-300 text-black text-lg lg:text-xl whitespace-nowrap font-bold lg:font-medium cursor-pointer" onClick={handleLogout}>Logout</div></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
