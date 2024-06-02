"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface User {
  id_user: string;
  name: string;
  email: string;
  role: string;
  is_verified: number;
}

interface VerifyUserProps {
  user: User;
  onUpdate: () => void;
}

export default function VerifyUser({ user, onUpdate }: VerifyUserProps) {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  async function handleVerify(userId: string) {
    setIsMutating(true);
    await fetch(`https://www.salman4l.my.id/api/verifyUser/${userId}`, {
      method: "POST",
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
        <Icon icon="material-symbols-light:verified" width="24" height="24" color="green" />
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
                Are you sure you want to verify the account {user.name}?
            </h3>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleVerify(user.id_user)}
                  type="button"
                >
                  Verify
                </button>
              ) : (
                <button className="btn btn-loading" type="button">
                  Verify...
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
