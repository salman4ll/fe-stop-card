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
    title: "Laporan",
    path: "/admin/insiden",
    icon: <Icon icon="carbon:event-incident" width="24" height="24" />,
  },
  {
    title: "Data Kategori",
    path: "/admin/category",
    icon: <Icon icon="carbon:category" width="24" height="24" />,
  },
  {
    title: "Data Tipe Laporan",
    path: "/admin/type-reporting",
    icon: <Icon icon="carbon:category" width="24" height="24" />,
  },
  {
    title: "Data Keparahan",
    path: "/admin/severity",
    icon: <Icon icon="mdi:rain-chance-outline" width="24" height="24" />,
  },
  {
    title: "Data Kemungkinan",
    path: "/admin/likelihood",
    icon: <Icon icon="carbon:outlook-severe" width="24" height="24" />,
  },
  {
    title: "Data Lokasi",
    path: "/admin/lokasi",
    icon: <Icon icon="mdi:office-building-location-outline" width="24" height="24" />,
  },
  {
    title: "Profil",
    path: "/admin/profile",
    icon: <Icon icon="tdesign:user-setting" width="24" height="24" />,
  },
  {
    title: <span onClick={() => signOut()}>Keluar</span>,
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
    title: "Profil",
    path: "/karyawan/profile",
    icon: <Icon icon="tdesign:user-setting" width="24" height="24" />,
  },
  {
    title: <span onClick={() => signOut()}>Keluar</span>,
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
    title: "Profil",
    path: "/visitor/profile",
    icon: <Icon icon="tdesign:user-setting" width="24" height="24" />,
  },
  {
    title: <span onClick={() => signOut()}>Keluar</span>,
    path: "/",
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
    onClick: () => {
      signOut();
    },
  },
];
