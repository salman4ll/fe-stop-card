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
    title: {
      text: `Incident Data Overview ${year}`,
      align: "left",
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
      max: 5
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div>
        <div id="chartOne" className="-ml-5 p-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
