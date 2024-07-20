"use client";
import { useState, SyntheticEvent } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

interface AddLocationProps {
  title: string;
  onUpdate: () => void;
}

export default function AddLikelihood({ title, onUpdate }: AddLocationProps) {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const { data: session } = useSession();
  const toast = useToast();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const response = await fetch("https://www.salman4l.my.id/api/likelihood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + session?.access_token,
      },
      body: JSON.stringify({
        name: name,
        value: value,
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

      setValue(0);

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
              ></input>
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
