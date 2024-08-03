"use client";
import { useState, SyntheticEvent } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

interface AddLocationProps {
  title: string;
  onUpdate: () => void;
}

export default function AddLokasi({ title, onUpdate }: AddLocationProps) {
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const { data: session } = useSession();
  const toast = useToast();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const response = await fetch("https://www.salman4l.my.id/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + session?.access_token,
      },
      body: JSON.stringify({
        name: name,
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
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nam Lokasi"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Tutup
              </button>
              {!isMutating ? (
                <button className="btn btn-primary" type="submit">
                  Tambah
                </button>
              ) : (
                <button className="btn btn-loading" type="button">
                  Tambah...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
