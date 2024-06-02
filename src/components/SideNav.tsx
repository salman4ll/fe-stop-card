"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png"
import { SIDENAV_ITEMS, SIDENAV_ITEMS_USER } from "@/constants";
import { SideNavItem } from "@/types";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";

const SideNav = () => {
  const { data: session, status } = useSession()

  if(session?.user?.role === "karyawan") {
    return (
      <div className="md:w-62 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
        <div className="flex flex-col space-y-6 w-full">
          <Link
            href="/user"
            className="flex flex-row space-x-6 items-center justify-center md:px-6  h-20 w-full text-center"
          >
            <Image src={logo} alt="" className="h-[63.4px] w-[100px] text-center"/>
            {/* <span className="font-bold text-xl hidden md:flex ">Stop Card</span> */}
          </Link>
  
          <div className="flex flex-col space-y-2  md:px-6">
            {SIDENAV_ITEMS_USER.map((item, idx) => {
              return <MenuItem key={idx} item={item} />;
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="md:w-62 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/admin"
          className="flex flex-row space-x-6 items-center justify-center md:px-6  h-20 w-full text-center"
        >
          <Image src={logo} alt="" className="h-[63.4px] w-[100px] text-center"/>
          {/* <span className="font-bold text-xl hidden md:flex ">Stop Card</span> */}
        </Link>

        <div className="flex flex-col space-y-2  md:px-6">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
//   const { data: session } = useSession();
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  const HandleItemClick = () => {
    if (item.onClick) {
      item.onClick();
    }
  }
  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-md  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div onClick={HandleItemClick}>
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-base flex">{item.title}</span>
        </Link>
        </div>
      )}
    </div>
  );
};
