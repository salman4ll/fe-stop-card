"use client"
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { signOut, useSession } from "next-auth/react";

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [initialData, setInitialData] = useState({ name: "", email: "", position: "", no_hp: "", asal: "" });
  const [formData, setFormData] = useState({ ...initialData });
  const [formChanged, setFormChanged] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const response = await fetch("https://www.salman4l.my.id/api/profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          });
          const data = await response.json();
          console.log("Fetched data:", data); // Debugging log
          setInitialData(data.data);
          setFormData(data.data);
          setRole(data.data.role); // Assuming role is included in the data
        } catch (error) {
          console.error("Error fetching profile data:", error);
          signOut();
        }
      }
    };

    fetchData();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormChanged(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data before submission:", formData); // Debugging log
    try {      
      // Add required fields if the role is 'karyawan' or 'admin'
      if (role === 'karyawan' || role === 'admin') {
        if (formData.asal === null || formData.asal === undefined) {
          formData.asal = ''; // Convert null or undefined to empty string
        }
        if (formData.no_hp === null || formData.no_hp === undefined) {
          formData.no_hp = ''; // Convert null or undefined to empty string
        }
        if (formData.position === null || formData.position === undefined) {
          formData.position = ''; // Convert null or undefined to empty string
        }
      }
      const response = await fetch("https://www.salman4l.my.id/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response data after submission:", data); // Debugging log
      setInitialData(data.data);
      setFormChanged(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  console.log(formData.asal);
  

  const handleCancel = () => {
    setFormData({ ...initialData });
    setFormChanged(false);
  };

  if (!session) {
    return <div>Loading session...</div>; // Or a spinner/loading indicator
  }

  return (
    <div>
      <Card title="Profile" topMargin={2} TopSideButtons={undefined}>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col">
            <label htmlFor="name" className="p-2">
              Nama
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="p-2 bg-[#eac8fc45] rounded-lg hover:border hover:border-black"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="email" className="p-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="p-2 bg-[#eac8fc45] rounded-lg hover:border hover:border-black"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {(role === "karyawan" || role === "visitor") && (
            <>
              <div className="mt-4 flex flex-col">
                <label htmlFor="no_hp" className="p-2">
                  No HP
                </label>
                <input
                  id="no_hp"
                  type="text"
                  name="no_hp"
                  className="p-2 bg-[#eac8fc45] rounded-lg hover:border hover:border-black"
                  value={formData.no_hp}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4 flex flex-col">
                <label htmlFor="position" className="p-2">
                  Position
                </label>
                <input
                  id="position"
                  type="text"
                  name="position"
                  className="p-2 bg-[#eac8fc45] rounded-lg hover:border hover:border-black"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {role === "visitor" && (
            <div className="mt-4 flex flex-col">
              <label htmlFor="asal" className="p-2">
                Asal
              </label>
              <input
                id="asal"
                type="text"
                name="asal"
                className="p-2 bg-[#eac8fc45] rounded-lg hover:border hover:border-black"
                value={formData.asal}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="flex justify-end">
            {formChanged && (
              <button
                type="button"
                onClick={handleCancel}
                className="button px-2 py-2 mt-6 mr-8 text-[#4C2A76]"
              >
                Batalkan
              </button>
            )}
            {formChanged && (
              <button
                type="submit"
                className="button px-6 py-3 mt-6 bg-[#4C2A76] text-white rounded-[40px]"
              >
                Simpan Perubahan
              </button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Profile;
