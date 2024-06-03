"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import SideNav from "@/components/SideNav";
import PageWrapper from "@/components/PageWrapper";
import MarginWidthWrapper from "@/components/MarginWidthWrapper";
import Header from "@/components/Header";
import HeaderMobile from "@/components/HeaderMobile";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import HeaderMobileUser from "@/components/HeaderMobileUser";

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
      <div className="flex w-full mx-auto justify-center items-center h-screen">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  if (session?.user?.role !== "visitor") {
    route.push("/");
    return (
      <div className="flex w-full mx-auto justify-center items-center h-screen">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex-1">
          <SideNav />
          <MarginWidthWrapper>
            <Header currentUser={session?.user} />
            <HeaderMobileUser />
            <ChakraProvider>
              <PageWrapper>{children}</PageWrapper>
            </ChakraProvider>
          </MarginWidthWrapper>
        </main>
      </body>
    </html>
  );
}
