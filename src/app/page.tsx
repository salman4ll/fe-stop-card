"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imgBg from "@/assets/bg.jpg";
import logo from "@/assets/logo.png"
// import googleLogo from "@/assets/images/googleLogo.png";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { signIn, useSession } from "next-auth/react";
import { Spinner, useToast } from "@chakra-ui/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  }, [formValues, error]);

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

  if (status === "authenticated") {
    if (session?.user?.role === "karyawan") {
      router.push("/karyawan");
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
    } else if (session?.user?.role === "admin") {
      router.push("/admin");
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
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setFormValues({
        email: formValues.email,
        password: "",
      });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });
      setLoading(false);

      if (res?.error) {
        setError(res.error);
        toast({
          title: "Error",
          description: res.error,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      } else {
        toast({
          title: "Success",
          description: "Login success",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        setTimeout(() => {
          if (session?.user?.role === "karyawan") {
            router.push("/karyawan");
          } else if (session?.user?.role === "admin") {
            router.push("/admin");
          }
        }, 3000);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="relative h-screen w-full flex flex-col">
      <Image
        alt="image background"
        src={imgBg}
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="w-[90%] p-6 m-auto bg-white rounded-[10px] lg:max-w-lg z-10">
        <div className="w-full text-center">
          <Image
            alt="logo ambis kerja"
            src={logo}
            width={1000}
            className="w-24 m-auto"
          />
          <h1 className="text-2xl font-medium mt-5">Log In</h1>
          <div className="flex justify-center text-xs md:text-base">
            <p className="font-normal mr-1">Dont have an account? </p>
            <Link href="/register" className="underline">
              Sign up
            </Link>{" "}
          </div>
        </div>
        <div className="w-[90%] md:w-[80%] m-auto mt-8 md:mt-10">
          <div className="flex mt-6 items-center">
            <hr className="w-[100%] mr-3 border-[1px]" />
            <p className="font-bold text-xl text-[#666666]">OR</p>
            <hr className="w-[100%] ml-3 border-[1px]" />
          </div>
          <div>
            <form onSubmit={onSubmit} className="mt-4">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="text-[#666666] text-md font-normal"
                >
                  Your Email
                </label>
                <input
                  className="appearance-none border rounded-lg w-full py-3 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="text-[#666666] text-md font-normal"
                  >
                    Your Password
                  </label>

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="focus:outline-none flex items-center"
                  >
                    <Icon
                      icon={showPassword ? "ri:eye-off-fill" : "ri:eye-fill"}
                      className="text-[#666666] mr-1"
                    />
                    <p className="text-[#666666]">
                      {showPassword ? "Hide" : "Show"}
                    </p>
                  </button>
                </div>
                <input
                  className="appearance-none border rounded-lg w-full py-3 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <Link
                href="#"
                className="flex justify-end text-[14px] mt-2 underline"
              >
                Forget your password
              </Link>
              <button
                type="submit"
                className="w-full flex justify-center bg-[#B2B2B2] hover:bg-[#666666] text-white rounded-[40px] py-3 mt-6"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
