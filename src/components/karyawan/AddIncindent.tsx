import { useState, SyntheticEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

interface AddIncidentProps {
  onUpdate: () => void;
}

interface Location {
  id_location: string;
  name: string;
}

export default function AddIncident({ onUpdate }: AddIncidentProps) {
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [timeIncident, setTimeIncident] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [saran, setSaran] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const { data: session } = useSession();
  const toast = useToast();

  useEffect(() => {
    async function fetchLocations() {
      const response = await fetch("https://www.salman4l.my.id/api/locations");
      const data = await response.json();
      setLocations(data.data.data);
    }
    fetchLocations();
  }, []);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const formData = new FormData();
    formData.append("area", area);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("time_incident", timeIncident);
    formData.append("id_location", selectedLocation);
    formData.append("saran", saran);

    const response = await fetch("https://www.salman4l.my.id/api/incidents", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
      body: formData,
    });

    const data = await response.json();
    if (data.code !== 200) {
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsMutating(false);
    } else {
      toast({
        title: "Success",
        description: data.errors,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsMutating(false);

      setArea("");
      setTitle("");
      setCategory("");
      setDescription("");
      setImage(null);
      setTimeIncident("");
      setSelectedLocation("");
      setSaran("");
      onUpdate();
      setModal(false);
    }
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add Incident
      </button>
      <input
        type="checkbox"
        checked={modal}
        className="modal-toggle"
        onChange={handleChange}
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Incident</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Area</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="input w-full input-bordered"
              >
                <option value="">Select Area</option>
                <option value="citeureup">Citeureup</option>
                <option value="gunung putri">Gunung Putri</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Title"
              />
            </div>
            <div className="form-control">
              <label htmlFor="category" className="label font-bold">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input w-full input-bordered"
              >
                <option value="">Select Category</option>
                <option value="unsafe action">Unsafe Action</option>
                <option value="unsafe condition">Unsafe Condition</option>
                <option value="nearmiss">Nearmiss</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Description"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Saran</label>
              <textarea
                value={saran}
                onChange={(e) => setSaran(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Saran"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="input w-full input-bordered"
              />
              <span className="text-sm text-gray-500">Note: Maximum file size is 2MB.</span>
            </div>
            <div className="form-control">
              <label className="label font-bold">Time Incident</label>
              <input
                type="datetime-local"
                value={timeIncident}
                onChange={(e) => setTimeIncident(e.target.value)}
                className="input w-full input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input w-full input-bordered"
              >
                <option value="">Select Location</option>
                {locations.map((location: Location) => (
                  <option
                    key={location.id_location}
                    value={location.id_location}
                  >
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Anda dapat melaporkan kegiatan/kondisi tidak aman melalui SMS ke No. 0800-0000-0000 dengan format: AreaKerja#Nama#Lokasi#Uraian. Contoh: Citeureup#Nice V#Supervisor#Pekerja tidak menggunakan APD
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button className="btn btn-primary" type="submit">
                  Add
                </button>
              ) : (
                <button className="btn btn-loading" type="button">
                  Adding...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
