"use client"
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const Chart: React.FC = () => {
  const [month, setMonth] = useState([]);
  const [series, setSeries] = useState([]);
  const [year, setYear] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://www.salman4l.my.id/api/total-incidents",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    const data = await response.json();
    setMonth(data.months);
    setYear(data.data.total.year);

    // Create series data from categories
    const seriesData = data.data.by_category.map((category: any) => ({
      name: category.category,
      data: category.data,
    }));

    // Add total data to series
    seriesData.push({
      name: "Total Incidents",
      data: data.data.total.data,
    });

    setSeries(seriesData);
  };

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const options: ApexOptions = {
    chart: {
      type: 'line', // Set chart type to 'line'
    },
    xaxis: {
      type: "category",
      categories: month,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      max: 10, // Set the y-axis maximum value to 10
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Incidents</p>
              <p className="text-sm font-medium">Year {year}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="line" // Set chart type to 'line'
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
