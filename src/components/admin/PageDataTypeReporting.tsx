"use client";
import { useCallback, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Table from "@/components/Table";
import Card from "@/components/Card";
import { Category, Location, TypeReporting } from "@/types";
import DefaultPagination from "@/components/Pagination";
import DeleteCategory from "./DeleteCategory";
import AddTypeReporting from "./AddTypeReporting";
import DeleteTypeReporting from "./DeleteTypeReporting";
import UpdateTypeReporting from "./UpdateTypeReporting";

export default function AdminTypeReporting() {
  const { data: session } = useSession();
  const [data, setData] = useState<Location[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [showPage, setShowPage] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://www.salman4l.my.id/api/types-reportings?page=${page}&keyword=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        if (result && result.data.data) {
          setData(result.data.data);
          setTotalPage(result.data.last_page);
          setShowPage(result.data.per_page);
        }
      } else {
        console.error("Error fetching data:", result.message);
        setData([]);
        if (response.status === 500) {
          console.error("Server error occurred");
          signOut();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data:", error.message);
        if (error.message.includes("Unexpected token '<'")) {
          signOut();
        }
      } else {
        console.error("Error fetching data:", error);
      }
    }
  }, [search, page, session?.access_token]);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [fetchData, session]);

  const paginate = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const columns = [
    { key: "no", label: "No" },
    { key: "name", label: "Tipe Laporan" },
    {
      key: "control_measure",
      label: "Tindakan Pengendalian",
      isControlMeasure: true,
    },
  ];

  const renderButtons = (typeReporting: TypeReporting) => [
    <DeleteTypeReporting
      key={typeReporting.id_type_reporting}
      typeReporting={typeReporting}
      onUpdate={fetchData}
    />,
    <UpdateTypeReporting
      key={typeReporting.id_type_reporting}
      typeReporting={typeReporting}
      onUpdate={fetchData}
    />,
  ];

  const getDataWithRowNumbers = () => {
    return data.map((user, index) => ({
      ...user,
      no: (page - 1) * 10 + index + 1,
    }));
  };

  return (
    <Card title="Data Tipe Laporan" topMargin="mt-2" TopSideButtons={undefined}>
      <div className="inline-block w-full mb-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <AddTypeReporting title="Tambah " onUpdate={fetchData} />
          </div>
          <div>
            <input
              type="search"
              placeholder="Search"
              className="input input-sm input-bordered w-full max-w-xs mr-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={getDataWithRowNumbers()}
        renderButtons={renderButtons}
      />
      <DefaultPagination
        page={page}
        totalData={data.length}
        pageSize={showPage}
        totalPage={totalPage}
        paginate={paginate}
      />
    </Card>
  );
}
