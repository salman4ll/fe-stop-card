'use client';

import React from 'react';
import Image from 'next/image';
import logo from "@/assets/logo.png"
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import useScroll from '@/hooks/UseScroll';
import { cn } from '@/lib/Utils';

const Header = (currentUser: any) => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-white`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex  items-center justify-between px-4 h-14">
        {/* Logotype desa Sukajaya */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <Image src={logo} alt="" className="h-[31.7px] w-[50px]"/>            
          </Link>
          <Link
          href="https://www.darya-varia.com/"
          className="flex flex-row space-x-3 items-center justify-center hover:text-cyan-600">Kembali ke website
          </Link>
        </div>
        {/* END Logotype Desa Sukajaya */}
        {/* Hai Admin */}
        <div className="hidden md:block">
          <span className="font-semibold text-sm">Halo, {currentUser?.currentUser?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
