
import react from "react";
import { Metadata } from "next";
import VisitorInsiden from "@/components/visitor/PageVisitorInsiden";

export const metadata: Metadata = {
  title: 'Page Data Laporan Insiden',
  description: 'Generated by create next app',
};

export default function VisitorLaporan() {
  return (
    <>
      <VisitorInsiden/>
    </>
  )
}
