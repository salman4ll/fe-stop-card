"use client";
import { useCallback, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Table from "@/components/Table";
import Card from "@/components/Card";
import { Category, Likelihood, Location, Severity, TypeReporting } from "@/types";
import DefaultPagination from "@/components/Pagination";
import AddSeverity from "./AddSeverity";
import DeleteSeverity from "./DeleteSeverity";
import UpdateSeverity from "./UpdateSeverity";
import DeleteLikelihood from "./DeleteLikelihood";
import UpdateLikelihood from "./UpdateLikelihood";
import AddLikelihood from "./AddLikelihood";

export default function AdminLikelihood() {
  const { data: session } = useSession();
  const [data, setData] = useState<Location[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [showPage, setShowPage] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://www.salman4l.my.id/api/likelihood?page=${page}&keyword=${search}`,
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
    { key: "id_likelihood", label: "ID Likelihood" },
    { key: "name", label: "Nama" },
    { key: "value", label: "Nilai" },
  ];

  const renderButtons = (likelihood: Likelihood) => [
    <DeleteLikelihood
      key={likelihood.id_likelihood}
      likelihood={likelihood}
      onUpdate={fetchData}
    />,
    <UpdateLikelihood key={likelihood.id_likelihood} likelihood={likelihood} onUpdate={fetchData} />,
  ];

  const getDataWithRowNumbers = () => {
    return data.map((user, index) => ({
      ...user,
      no: (page - 1) * 10 + index + 1,
    }));
  };

  return (
    <Card title="Data Likelihood" topMargin="mt-2" TopSideButtons={undefined}>
      <div className="inline-block w-full mb-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <AddLikelihood title="Tambah " onUpdate={fetchData} />
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
