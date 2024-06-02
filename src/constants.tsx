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
    title: "Logout",
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
    path: "/user",
    icon: <Icon icon="lucide:pie-chart" width="24" height="24" />,
  },
  {
    title: "Data Bank",
    path: "/user/data-bank",
    icon: <Icon icon="ph:bank" width="24" height="24" />,
  },
  {
    title: "Harga Sampah",
    path: "/user/harga-sampah",
    icon: <Icon icon="fluent:money-24-regular" width="24" height="24" />,
  },
  {
    title: "Tarik",
    path: "/user/penarikan",
    icon: <Icon icon="fluent:money-hand-24-regular" width="24" height="24" />,
  },
  {
    title: "Riwayat Transaksi",
    path: "/user/riwayat",
    icon: (
      <Icon
        icon="fluent:document-bullet-list-24-regular"
        width="24"
        height="24"
      />
    ),
  },
  {
    title: "Logout",
    path: "/login",
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
    // onClick: () => {
    //   console.log("logout");

    //   signOut();
    // },
  },
];