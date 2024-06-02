"use client";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Table from "@/components/Table";
import Card from "@/components/Card";
import { Location } from "@/types";
import DefaultPagination from "@/components/Pagination";
import DeleteLocation from "@/components/admin/DeleteLocation";
import AddLokasi from "@/components/admin/AddLocation";
import UpdateLokasi from "@/components/admin/UpdateLocation";

export default function AdminLokasi() {
  const { data: session } = useSession();
  const [data, setData] = useState<Location[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [showPage, setShowPage] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://www.salman4l.my.id/api/locations?search=${search}&page=${page}`,
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
        if (result && result.data) {
          setData(result.data.data);
          setTotalPage(result.data.last_page);
          setShowPage(result.data.per_page);
        }
      } else {
        console.error("Error fetching data:", result.message);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
    { key: "id_location", label: "ID Lokasi" },
    { key: "name", label: "Nama Lokasi" },    
  ];

  const renderButtons = (location: Location) => [
    <UpdateLokasi key={location.id_location} location={location} onUpdate={fetchData} />,
    <DeleteLocation key={location.id_location} location={location} onUpdate={fetchData} />,
    // Add more buttons here if needed
  ];

  const getDataWithRowNumbers = () => {
    return data.map((user, index) => ({
      ...user,
      no: (page - 1) * 10 + index + 1,
    }));
  };

  return (
    <Card title="Data Lokasi" topMargin="mt-2" TopSideButtons={undefined}>
      <div className="inline-block w-full mb-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <AddLokasi title="Tambah Lokasi" onUpdate={fetchData} />
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
