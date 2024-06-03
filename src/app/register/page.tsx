"use client";
import React, { useState } from "react";
import Image from "next/image";
import imgBg from "@/assets/bg.jpg";
import imgLogo from "@/assets/logo.png";
import imageRegis from "@/assets/imageRegis.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("karyawan");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      name,
      email,
      role,
      password,
      password_confirmation: passwordConfirmation,
      position,
    };

    try {
      const response = await fetch("https://www.salman4l.my.id/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
        setTimeout(() => {
            router.push("/");
          }, 2000);
      } else {
        setMessage(result.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
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
      <div className="w-[90%] pt-4 pb-6 pr-6 pl-6 m-auto bg-white rounded-[10px] lg:max-w-3xl z-10">
        <Image
          alt="logo ambis kerja"
          src={imgLogo}
          width={1000}
          className=" w-32 m-auto mb-0"
        />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-2">
            <div className="w-full mb-6">
              <h1 className="text-xl font-medium mt-2">Create an account</h1>

              <div className="flex text-xs md:text-base">
                <p className="font-normal mr-1">Already have an account?</p>{" "}
                <Link href="/" className="underline">
                  Log in
                </Link>{" "}
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-1">
                  <div className="col-span-2 mb-2">
                    <label
                      htmlFor="name"
                      className="text-[#666666] text-md font-normal"
                    >
                      Name
                    </label>
                    <input
                      className="appearance-none border rounded-lg w-full py-3 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Tatang Subagyo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="col-span-2 mb-2">
                    <label htmlFor="role" className="text-[#666666] text-md font-normal">
                        Role
                    </label>
                    <select
                      className="select select-bordered select-sm h-[45.6px] appearance-none rounded-lg w-[100%] py-1 px-3 mt-1 text-gray-700 focus:outline-none focus:shadow-outline"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="karyawan">Karyawan</option>
                        <option value="visitor">Visitor</option>
                    </select>
                  </div>
                  <div className="col-span-2 mb-2">
                    <label htmlFor="position" className="text-[#666666] text-md font-normal">
                      Position
                    </label>
                    <input
                      className="appearance-none border rounded-lg w-full py-3 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="position"
                      type="text"
                      placeholder="Software Engineer"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}/>
                  </div>
                  <div className="col-span-2 mb-2">
                    <label
                      htmlFor="email"
                      className="text-[#666666] text-md font-normal"
                    >
                      Email
                    </label>
                    <input
                      className="appearance-none border rounded-lg w-full py-3 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div className="">
                    <div className="flex justify-between">
                      <label
                        htmlFor="password"
                        className="text-[#666666] text-md font-normal"
                      >
                        Password
                      </label>
                    </div>
                    <input
                      className="appearance-none border rounded-lg w-full py-3 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <div className="flex justify-between">
                      <label
                        htmlFor="password_confirmation"
                        className="text-[#666666] text-md font-normal"
                      >
                        Confirm your password
                      </label>
                    </div>
                    <input
                      className="appearance-none border rounded-lg w-full py-3 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password_confirmation"
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </div>                  
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-[#B2B2B2] hover:bg-[#666666] text-white rounded-[40px] py-3 mt-6"
                  >
                    Create an account
                  </button>
                </div>
              </form>
              {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
          </div>
          <div className="flex flex-col justify-center m-auto ml-4 max-md:hidden">
            <Image alt="Image Register" src={imageRegis} width={1000} />
          </div>
        </div>
      </div>
    </main>
  );
}
