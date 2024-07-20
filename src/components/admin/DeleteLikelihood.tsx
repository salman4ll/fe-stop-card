"use client";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import { Likelihood, Location, Severity } from "@/types";

interface DeleteLikelihood {
  likelihood: Likelihood;
  onUpdate: () => void;
}

export default function DeleteLikelihood({
  likelihood,
  onUpdate,
}: DeleteLikelihood) {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  async function handleDelete(likelihoodId: string) {
    setIsMutating(true);
    await fetch(`https://www.salman4l.my.id/api/likelihood/${likelihoodId}`, {
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
              Are you sure you want to delete {likelihood.name}?
            </h3>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleDelete(likelihood.id_likelihood)}
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
