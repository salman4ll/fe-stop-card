"use client";
import React, { useState, useEffect, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import Table from "@/components/Table";
import Card from "@/components/Card";
import DefaultPagination from "@/components/Pagination";
import { Insiden } from "@/types";
import DeleteInsiden from "@/components/admin/DeleteInsiden";
import UpdateStatusInsiden from "@/components/admin/UpdateStatusInsiden";
import ExportExcel from "../ExportExcel";

const AdminInsident: React.FC = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<Insiden[]>([]);
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [showPage, setShowPage] = useState(1);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArea(e.target.value);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://www.salman4l.my.id/api/incidents?category=${category}&status=${status}&search=${search}&page=${page}&area=${area}`,
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
  }, [search, area, category, status, page, session?.access_token]);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [fetchData, session]);

  const excelExport = data.map((item: any, index: number) => ({
    No: index + 1,
    Area: item.area,
    "Nama Insiden": item.title,
    "Nama Pegawai": item.user_name,
    "Posisi/Departemen": item.position,
    Kategory: item.category,
    Status: item.status,
    Deskripsi: item.description,
    Foto: item.image,
    "Lokasi Insiden": item.location_name,
    "Waktu Insiden": item.time_incident,
    Saran: item.saran,
  }));

  const paginate = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const columns = [
    { key: "no", label: "No" },
    { key: "area", label: "Area" },
    { key: "title", label: "Nama Insiden" },
    { key: "user_name", label: "Nama Karyawan" },
    { key: "position", label: "Position" },
    { key: "description", label: "Deskripsi Insiden" },
    { key: "location_name", label: "Lokasi" },
    { key: "time_incident", label: "Tanggal" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status" },
    { key: "saran", label: "Saran" },
    { key: "image", label: "Image" }, // Tambahkan kolom gambar di sini
  ];

  const renderButtons = (insiden: Insiden) => [
    <DeleteInsiden
      key={insiden.id_incident}
      insiden={insiden}
      onUpdate={fetchData}
    />,
    <UpdateStatusInsiden
      key={insiden.id_incident}
      insiden={insiden}
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
    <Card title="Data Insiden" topMargin="mt-2" TopSideButtons={undefined}>
      <div className="inline-block w-full mb-3">
        <div className="mb-3">
          <ExportExcel
            excelData={excelExport}
            fileName="Data Insiden"
            title="Data Insiden PT Darya Varia Laboratoria"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={area}
              onChange={handleAreaChange}
            >
              <option value="">Choose Area</option>
              <option value="citeureup">Citeureup</option>
              <option value="gunung putri">Gunung Putri</option>
            </select>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Choose Category</option>
              <option value="unsafe action">Unsafe Action</option>
              <option value="unsafe condition">Unsafe Condition</option>
              <option value="nearmiss">Nearmiss</option>
            </select>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">Choose Status</option>
              <option value="pending">Pending</option>
              <option value="on progress">On Progress</option>
              <option value="approve">Approve</option>
              <option value="rejected">Rejected</option>
            </select>
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
};

export default AdminInsident;
