"use client";
import { useCallback, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Table from "@/components/Table";
import DeleteUser from "@/components/admin/DeleteUser";
import Card from "@/components/Card";
import { User } from "@/types";
import VerifyUser from "@/components/admin/VerifyUser";
import DefaultPagination from "@/components/Pagination";
import ExportExcel from "../ExportExcel";

export default function AdminVisitor() {
  const { data: session } = useSession();
  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [verify, setVerify] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [showPage, setShowPage] = useState(1);

  const handleVerifyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVerify(e.target.value);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://www.salman4l.my.id/api/user/visitor?verify=${verify}&search=${search}&page=${page}`,
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
  }, [search, verify, page, session?.access_token]);

  const excelExport = data.map((item: any, index: number) => ({
    No: index + 1,
    "Nama Visitor": item.name,
    "No Hp": item.no_hp,
    Email: item.email,
    "Posisi/Jabatan": item.position,
    Asal: item.asal,
  }));

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
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "position", label: "Position" },
    { key: "is_verified", label: "Telah Diverifikasi" },
  ];

  const renderButtons = (user: User) => [
    user.is_verified === 0 && (
      <VerifyUser key={user.id_user} user={user} onUpdate={fetchData} />
    ),
    <DeleteUser key={user.id_user} user={user} onUpdate={fetchData} />,
    // Add more buttons here if needed
  ];

  const getDataWithRowNumbers = () => {
    return data.map((user, index) => ({
      ...user,
      no: (page - 1) * 10 + index + 1,
    }));
  };

  return (
    <Card title="Data Visitor" topMargin="mt-2" TopSideButtons={undefined}>
      <div className="inline-block w-full mb-3">
        <div className="mb-3">
          <ExportExcel
            excelData={excelExport}
            fileName="Data Visitor"
            title="Data Visitor PT Darya Varia Laboratoria"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={verify}
              onChange={handleVerifyChange}
            >
              <option value="">Choose selected</option>
              <option value="1">Verified</option>
              <option value="0">Unverified</option>
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
}
