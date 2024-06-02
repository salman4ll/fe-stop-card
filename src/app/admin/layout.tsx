"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SideNav from "@/components/SideNav";
import PageWrapper from "@/components/PageWrapper";
import MarginWidthWrapper from "@/components/MarginWidthWrapper";
import Header from "@/components/Header";
import HeaderMobile from "@/components/HeaderMobile";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const route = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (session?.user?.role !== "admin") {
    route.push("/");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex-1">
          <SideNav />
          <MarginWidthWrapper>
            <Header currentUser={session?.user}/>
            <HeaderMobile />
            <ChakraProvider>
              <PageWrapper>{children}</PageWrapper>
            </ChakraProvider>
          </MarginWidthWrapper>
        </main>
      </body>
    </html>
  );
}
