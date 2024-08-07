"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { Insiden } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

interface UpdateIncidentProps {
  incident: Insiden;
  onUpdate: () => void;
}

interface Location {
  id_location: string;
  name: string;
}

interface Category {
  id_category: string;
  name: string;
}

interface TypeReport {
  id_category: string;
  id_type_reporting: string;
  name: string;
}

export default function UpdateIncident({
  incident,
  onUpdate,
}: UpdateIncidentProps) {
  const { data: session } = useSession();
  const toast = useToast();
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [typeReports, setTypeReports] = useState<TypeReport[]>([]);
  const [isMutating, setIsMutating] = useState(false);
  const [modal, setModal] = useState(false);

  const [area, setArea] = useState(incident.area);  
  const [selectCategory, setSelectCategory] = useState(incident.category);
  const [customCategory, setCustomCategory] = useState(incident.custom_category);  
  const [customTypeReport, setCustomTypeReport] = useState(incident.custom_type_reporting);
  const [selectTypeReport, setSelectTypeReport] = useState(incident.id_category);
  const [severity, setSeverity] = useState(incident.id_severity);
  const [selectSeverity, setSelectSeverity] = useState(incident.id_severity);
  const [likelihood, setLikelihood] = useState(incident.id_likelihood);
  const [selectLikelihood, setSelectLikelihood] = useState(incident.id_likelihood);
  const [description, setDescription] = useState(incident.description);
  const [image, setImage] = useState<File | null>(null);
  const [timeIncident, setTimeIncident] = useState(incident.time_incident);
  const [selectedLocation, setSelectedLocation] = useState(incident.id_location);
  const [saran, setSaran] = useState(incident.saran);

  useEffect(() => {
    setArea(incident.area);    
    setDescription(incident.description);
    setTimeIncident(incident.time_incident);
    setSelectedLocation(incident.id_location);
    setSaran(incident.saran);
    setSelectCategory(incident.id_category);
    setSelectTypeReport(incident.id_type_reporting);
    setSeverity(incident.id_severity);
    setLikelihood(incident.id_likelihood);
    setCustomCategory(incident.custom_category);
    setCustomTypeReport(incident.custom_type_reporting);
    setSelectSeverity(incident.id_severity);
    setSelectLikelihood(incident.id_likelihood);
  }, [incident]);

  useEffect(() => {
    async function fetchLocations() {
      const response = await fetch("https://www.salman4l.my.id/api/locations");
      const data = await response.json();
      setLocations(data.data.data);
    }

    async function fetchLikelihood() {
      const response = await fetch("https://www.salman4l.my.id/api/likelihood", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await response.json();
      setLikelihood(data.data.data);
    }

    async function fetchSeverity() {
      const response = await fetch("https://www.salman4l.my.id/api/severity", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await response.json();
      setSeverity(data.data.data);
    }
    
    async function fetchCategories() {
      const response = await fetch("https://www.salman4l.my.id/api/categories/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await response.json();
      setCategories(data.data.data);
    }
    async function fetchTypeReports() {
      const response = await fetch(`https://www.salman4l.my.id/api/categories/types_reporting?id=${selectCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await response.json();
      setTypeReports(data.data.data);
    }
    fetchLocations();
    fetchSeverity();
    fetchLikelihood();
    
    fetchCategories();
    if (selectCategory && selectCategory !== "other") {
      fetchTypeReports();
    } else {
      setTypeReports([]);
    }
  }, [selectCategory, session]);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);

    const formData = new FormData();
    formData.append("area", area);
    formData.append("id_category", selectCategory == "other" ? "" : selectCategory);
    formData.append("custom_category", selectCategory == "other" ? customCategory : "");
    formData.append("id_type_reporting", selectTypeReport == "other" ? "" : selectTypeReport);
    formData.append("custom_type_reporting", selectTypeReport == "other" ? customTypeReport : "");
    formData.append("id_severity", selectSeverity);
    formData.append("id_likelihood", selectLikelihood);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("time_incident", timeIncident);
    formData.append("id_location", selectedLocation);
    formData.append("saran", saran);

    const response = await fetch(`https://www.salman4l.my.id/api/incidents/${incident.id_incident}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
      body: formData,
    });

    const data = await response.json();
    setIsMutating(false);
    if (data.code !== 200) {
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Incident data updated successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setImage(null);

      onUpdate();
      setModal(false);
    }
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="" onClick={handleChange}>
        <Icon icon="ic:round-update" width="28" height="28" color="green" />
      </button>
      <input
        type="checkbox"
        checked={modal}
        className="modal-toggle"
        onChange={handleChange}
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {incident.title}</h3>
          <form onSubmit={handleSubmit}>            
            <div className="form-control">
              <label htmlFor="category" className="label font-bold">
                Kategori
              </label>
              <select
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
                className="input w-full input-bordered"
              >
                <option value="">Select Category</option>
                {categories.map((category: Category) => (
                  <option key={category.id_category} value={category.id_category}>
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
                Type Report
              </label>
              <select
                value={selectTypeReport}
                onChange={(e) => setSelectTypeReport(e.target.value)}
                className="input w-full input-bordered"                
              >
                <option value="">Select Type Report</option>
                {typeReports.map((type: TypeReport) => (
                  <option key={type.id_type_reporting} value={type.id_type_reporting}>
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
              <label className="label font-bold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input w-full input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className=""
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Time of Incident</label>
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
                {locations.map((location: Location) => (
                  <option key={location.id_location} value={location.id_location}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold">Saran</label>
              <textarea
                value={saran}
                onChange={(e) => setSaran(e.target.value)}
                className="input w-full input-bordered"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              ) : (
                <button className="btn btn-loading" type="button">
                  Update...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
