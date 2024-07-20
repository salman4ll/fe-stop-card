"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const CardDataStats = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.salman4l.my.id/api/total-users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTotalUsers(data.data.total_user);
      setTotalAdmins(data.data.total_admin);
      setTotalEmployees(data.data.total_karyawan);
      setTotalVisitors(data.data.total_visitor);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cardData = [
    {
      title: "Total Users",
      count: totalUsers,
      color: "bg-blue-200",      
      icon: <Icon icon="clarity:administrator-solid" className="text-blue-500" width={24} height={24}/>,
    },
    {
      title: "Total Admins",
      count: totalAdmins,
      color: "bg-green-200",      
      url: "/admin/admin",
      icon: <Icon icon="clarity:administrator-solid" className="text-green-500" width={24} height={24}/>,
    },
    {
      title: "Total Employees",
      count: totalEmployees,
      color: "bg-yellow-200",      
      url: "/admin/karyawan",
      icon: <Icon icon="clarity:administrator-solid" className="text-yellow-500" width={24} height={24} />,
    },
    {
      title: "Total Visitors",
      count: totalVisitors,
      color: "bg-red-200",      
      url: "/admin/visitor",
      icon: <Icon icon="clarity:administrator-solid" className="text-red-500" width={24} height={24}/>,
    },
  ];

  return (
    <>
      {cardData.map((card, index) => (
        <Link href={card.url ?? ""} key={index}>
          <div className="container items-center px-4 py-3 m-auto mt-2">
            <div className="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
              <div className="w-full p-2 xl:w-1/4 sm:w-1/2">
                <div key={index} className="flex flex-col">
                  <div className="flex flex-row items-center justify-between px-4 py-4">
                    <div className="flex mr-4">
                      <span
                        className={`items-center px-4 py-4 m-auto ${card.color} rounded-full hover:${card.color}`}
                      >
                        {card.icon}
                      </span>
                    </div>
                    <div className="flex-1 pl-1">
                      <div className="text-xl font-medium text-gray-600">
                        {card.count}
                      </div>
                      <div className="text-sm text-gray-400 sm:text-base">
                        {card.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CardDataStats;
