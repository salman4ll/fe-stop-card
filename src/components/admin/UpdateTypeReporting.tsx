"use client";
import { useState, SyntheticEvent } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { TypeReporting } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

interface UpdateTypeReportingProps {
  typeReporting: TypeReporting;
  onUpdate: () => void;
}

export default function UpdateTypeReporting({ typeReporting, onUpdate }: UpdateTypeReportingProps) {
  const [name, setName] = useState(typeReporting.name);
  const [controlMeasures, setControlMeasures] = useState(typeReporting.control_measure || [""]);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const { data: session } = useSession();
  const toast = useToast();

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

    const response = await fetch(`https://www.salman4l.my.id/api/types-reportings/${typeReporting.id_type_reporting}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.access_token,
      },
      body: JSON.stringify({
        name: name,
        control_measure: controlMeasures.filter(measure => measure !== ""),
      }),
    });

    const data = await response.json();
    if (data.code !== 200) {
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
          <h3 className="font-bold text-lg">{typeReporting.name}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
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
              <button type="button" className="btn btn-secondary mt-2" onClick={addControlMeasure}>
                Add Control Measure
              </button>
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
