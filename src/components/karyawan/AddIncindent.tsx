import { useState, SyntheticEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { UUID } from "crypto";

interface AddIncidentProps {
  onUpdate: () => void;
}

interface Location {
  id_location: UUID;
  name: string;
}

interface Category {
  id_category: UUID;
  name: string;
}

interface TypeReport {
  id_category: Category;
  id_type_reporting: string;
  name: string;
}

interface Severity {
  id_severity: UUID;
  name: string;
}

interface Likelihood {
  id_likelihood: UUID;
  name: string;
}

export default function AddIncident({ onUpdate }: AddIncidentProps) {
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [typeReport, setTypeReport] = useState([]);
  const [severity, setSeverity] = useState([]);
  const [likelihood, setLikelihood] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [timeIncident, setTimeIncident] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectTypeReport, setSelectTypeReport] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedLikelihood, setSelectedLikelihood] = useState("");
  const [saran, setSaran] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [customTypeReport, setCustomTypeReport] = useState("");
  const { data: session } = useSession();
  const toast = useToast();

  useEffect(() => {
    fetchLocations();
    fetchCategory();
    if (selectCategory && selectCategory !== "other") {
      fetchTypeReport();
    } else {
      setTypeReport([]);
    }
    fetchSeverity();
    fetchLikelihood();
  }, [selectCategory]);

  const fetchCategory = async () => {
    const response = await fetch(
      "https://www.salman4l.my.id/api/categories/category",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    const data = await response.json();
    setCategory(data.data.data);
  };

  const fetchTypeReport = async () => {
    const response = await fetch(
      `https://www.salman4l.my.id/api/categories/types_reporting?id=${selectCategory}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    const data = await response.json();
    setTypeReport(data.data.data);
  };

  const fetchSeverity = async () => {
    const response = await fetch("https://www.salman4l.my.id/api/severity", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    const data = await response.json();
    setSeverity(data.data.data);
  };

  const fetchLikelihood = async () => {
    const response = await fetch("https://www.salman4l.my.id/api/likelihood", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    const data = await response.json();
    setLikelihood(data.data.data);
  };

  const fetchLocations = async () => {
    const response = await fetch("https://www.salman4l.my.id/api/locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    const data = await response.json();
    setLocations(data.data.data);
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const formData = new FormData();
    formData.append("area", area);
    formData.append("description", description);
    formData.append("id_category", selectCategory === "other" ? "" : selectCategory);
    formData.append("id_type_reporting", selectTypeReport === "other" ? "" : selectTypeReport);
    formData.append("custom_category", selectCategory === "other" ? customCategory : "");
    formData.append("custom_type_reporting", selectTypeReport === "other" ? customTypeReport : "");
    formData.append("id_severity", selectedSeverity);
    formData.append("id_likelihood", selectedLikelihood);
    if (image) {
      formData.append("image", image);
    }
    formData.append("time_incident", timeIncident);
    formData.append("id_location", selectedLocation);
    formData.append("saran", saran);

    // Logging FormData values
    for (let [key, value] of formData.entries() as any) {
      console.log(`${key}: ${value}`);
    }

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
      setSelectCategory("");
      setSelectTypeReport("");
      setSelectedSeverity("");
      setSelectedLikelihood("");
      setDescription("");
      setImage(null);
      setTimeIncident("");
      setSelectedLocation("");
      setSaran("");
      setCustomCategory("");
      setCustomTypeReport("");
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
              <label htmlFor="category" className="label font-bold">
                Category
              </label>
              <select
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
                className="input w-full input-bordered"
              >
                <option value="">Select Category</option>
                {category.map((category: Category) => (
                  <option
                    key={category.id_category}
                    value={category.id_category}
                  >
                    {category.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              {selectCategory === "other" && (
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="input w-full input-bordered mt-2"
                  placeholder="Enter custom category"
                />
              )}
            </div>
            <div className="form-control">
              <label htmlFor="typeReport" className="label font-bold">
                Tipe Laporan
              </label>
              <select
                value={selectTypeReport}
                onChange={(e) => setSelectTypeReport(e.target.value)}
                className="input w-full input-bordered"                
              >
                <option value="">Select Tipe Laporan</option>
                {typeReport.map((type: TypeReport) => (
                  <option
                    key={type.id_type_reporting}
                    value={type.id_type_reporting}
                  >
                    {type.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              {selectTypeReport === "other" && (
                <input
                  type="text"
                  value={customTypeReport}
                  onChange={(e) => setCustomTypeReport(e.target.value)}
                  className="input w-full input-bordered mt-2"
                  placeholder="Enter custom type report"
                />
              )}
            </div>
            <div className="form-control">
              <label htmlFor="severity" className="label font-bold">
                Severity
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="input w-full input-bordered"
              >
                <option value="">Select Severity</option>
                {severity.map((severity: Severity) => (
                  <option key={severity.id_severity} value={severity.id_severity}>
                    {severity.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="likelihood" className="label font-bold">
                Likelihood
              </label>
              <select
                value={selectedLikelihood}
                onChange={(e) => setSelectedLikelihood(e.target.value)}
                className="input w-full input-bordered"
              >
                <option value="">Select Likelihood</option>
                {likelihood.map((likelihood: Likelihood) => (
                  <option key={likelihood.id_likelihood} value={likelihood.id_likelihood}>
                    {likelihood.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="description" className="label font-bold">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="image" className="label font-bold">
                Image
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="file-input file-input-bordered"
              />
            </div>
            <div className="form-control">
              <label htmlFor="timeIncident" className="label font-bold">
                Time Incident
              </label>
              <input
                type="datetime-local"
                value={timeIncident}
                onChange={(e) => setTimeIncident(e.target.value)}
                className="input w-full input-bordered"
              />
            </div>
            <div className="form-control">
              <label htmlFor="location" className="label font-bold">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input w-full input-bordered"
              >
                <option value="">Select Location</option>
                {locations.map((location: Location) => (
                  <option key={location.id_location} value={location.id_location}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="saran" className="label font-bold">
                Saran
              </label>
              <textarea
                value={saran}
                onChange={(e) => setSaran(e.target.value)}
                className="textarea textarea-bordered"
                placeholder="Enter saran"
              ></textarea>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {isMutating ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
