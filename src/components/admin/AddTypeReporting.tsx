"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { Category } from "@/types";

interface AddTypeReportingProps {
  title: string;
  onUpdate: () => void;
}

export default function AddTypeReporting({ title, onUpdate }: AddTypeReportingProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [controlMeasures, setControlMeasures] = useState([""]);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const { data: session } = useSession();
  const toast = useToast();

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

  useEffect(() => {
    fetchCategory();
  }, [selectedCategory]);

  const handleControlMeasureChange = (index: number, value: string) => {
    const newControlMeasures = [...controlMeasures];
    newControlMeasures[index] = value;
    setControlMeasures(newControlMeasures);
  };

  const addControlMeasure = () => {
    setControlMeasures([...controlMeasures, ""]);
  };

  const removeControlMeasure = (index: number) => {
    const newControlMeasures = controlMeasures.filter((_, i) => i !== index);
    setControlMeasures(newControlMeasures);
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const response = await fetch(`https://www.salman4l.my.id/api/types-reportings/${selectedCategory}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        name: name,
        control_measure: controlMeasures.filter(measure => measure !== ""),
      }),
    });

    const data = await response.json();
    if (data.code !== 201) {
      toast({
        title: "Error",
        description: data.status,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsMutating(false);
    } else {
      toast({
        title: "Success",
        description: data.status,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsMutating(false);

      setName("");
      setControlMeasures([""]);
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
        {title}
      </button>
      <input
        type="checkbox"
        checked={modal}
        className="modal-toggle"
        onChange={handleChange}
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="category" className="label font-bold">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold">Nama Tipe Laporan</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama Tipe Laporan"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Control Measures</label>
              {controlMeasures.map((measure, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={measure}
                    onChange={(e) => handleControlMeasureChange(index, e.target.value)}
                    className="input w-full input-bordered mb-2"
                    placeholder="Control Measure"
                  />
                  <button type="button" className="btn btn-danger ml-2" onClick={() => removeControlMeasure(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-primary mt-2" onClick={addControlMeasure}>
                Add Control Measure
              </button>
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
                  Add...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
