"use client";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import { Insiden } from "@/types";

interface DeleteInsidenProps {
  insiden: Insiden;
  onUpdate: () => void;
}

export default function DeleteInsiden({ insiden, onUpdate }: DeleteInsidenProps) {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  async function handleDelete(InsidenId: string) {
    setIsMutating(true);
    await fetch(`http://147.139.168.152/api/incident/${InsidenId}`, {
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
              Are you sure you want to delete {insiden.title}?
            </h3>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleDelete(insiden.id_incident)}
                  type="button"
                >
                  Delete
                </button>
              ) : (
                <button className="btn btn-loading" type="button">
                  Deleting...
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
