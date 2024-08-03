"use client";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import { Location } from "@/types";

interface DeleteLocationProps {
  location: Location;
  onUpdate: () => void;
}

export default function DeleteLocation({ location, onUpdate }: DeleteLocationProps) {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  async function handleDelete(locationId: string) {
    setIsMutating(true);
    await fetch(`https://www.salman4l.my.id/api/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    setIsMutating(false);
    onUpdate();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="" onClick={handleChange}>
        <Icon icon="iconoir:xmark-circle" width="24" height="24" color="red" />
      </button>

      <input
        type="checkbox"
        checked={modal}
        className="modal-toggle"
        onChange={handleChange}
      />

      {modal && (
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Apakah Anda yakin ingin menghapus {location.name}?
            </h3>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Tutup
              </button>
              {!isMutating ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleDelete(location.id_location)}
                  type="button"
                >
                  Hapus
                </button>
              ) : (
                <button className="btn btn-loading" type="button">
                  Hapus...
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
