"use client";
import { useState, SyntheticEvent } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { Likelihood, Location, Severity } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

interface UpdateLikehoodProps {
  likelihood: Likelihood;
  onUpdate: () => void;
}

export default function UpdateLikelihood({
  likelihood,
  onUpdate,
}: UpdateLikehoodProps ) {
  const [name, setName] = useState(likelihood.name);
  const [value, setValue] = useState(likelihood.value);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const { data: session } = useSession();
  const toast = useToast();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const response = await fetch(
      `https://www.salman4l.my.id/api/likelihood/${likelihood.id_likelihood}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + session?.access_token,
        },
        body: JSON.stringify({
          name: name,
          value: value,
        }),
      }
    );

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

      setName("");
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
          <h3 className="font-bold text-lg">{likelihood.name}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama"
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Value</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Value"
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
