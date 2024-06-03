import { Icon } from "@iconify/react";
import { SideNavItem, TableHead } from "./types";
// import { signOut } from "next-auth/react";
import { constants } from "buffer";
import { signOut } from "next-auth/react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Data Karyawan",
    path: "/admin/karyawan",
    icon: <Icon icon="heroicons-outline:user-group" width="24" height="24" />,
  },
  {
    title: "Data Visitor",
    path: "/admin/visitor",
    icon: <Icon icon="mdi:user-badge-outline" width="24" height="24" />,
  },
  {
    title: "Data Admin",
    path: "/admin/admin",
    icon: <Icon icon="clarity:administrator-line" width="24" height="24" />,
  },
  {
    title: "Data Lokasi",
    path: "/admin/lokasi",
    icon: <Icon icon="mdi:office-building-location-outline" width="24" height="24" />,
  },
  {
    title: "Laporan",
    path: "/admin/insiden",
    icon: <Icon icon="carbon:event-incident" width="24" height="24" />,
  },
  {
    title: "Profile",
    path: "/admin/profile",
    icon: <Icon icon="tdesign:user-setting" width="24" height="24" />,
  },
  {
    title: <span onClick={() => signOut()}>Logout</span>,
    path: "/",
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
    onClick: () => {
      signOut();
    },
  },
];
export const SIDENAV_ITEMS_USER: SideNavItem[] = [
  {
    title: "Home",
    path: "/karyawan",
    icon: <Icon icon="lucide:pie-chart" width="24" height="24" />,
  },
  {
    title: "Laporan Insiden",
    path: "/karyawan/laporan",
    icon: <Icon icon="carbon:event-incident" width="24" height="24" />,
  },
  {
    title: "Profile",
    path: "/karyawan/profile",
    icon: <Icon icon="tdesign:user-setting" width="24" height="24" />,
  },
  {
    title: <span onClick={() => signOut()}>Logout</span>,
    path: "/",
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
    onClick: () => {
      signOut();
    },
  },
];
export const SIDENAV_ITEMS_VISITOR: SideNavItem[] = [
  {
    title: "Home",
    path: "/visitor",
    icon: <Icon icon="lucide:pie-chart" width="24" height="24" />,
  },
  {
    title: "Laporan Insiden",
    path: "/visitor/laporan",
    icon: <Icon icon="carbon:event-incident" width="24" height="24" />,
  },
  {
    title: "Profile",
    path: "/visitor/profile",
    icon: <Icon icon="tdesign:user-setting" width="24" height="24" />,
  },
  {
    title: <span onClick={() => signOut()}>Logout</span>,
    path: "/",
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
    onClick: () => {
      signOut();
    },
  },
];
