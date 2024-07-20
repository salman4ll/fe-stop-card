import { Insiden } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React, { useState } from "react";

interface ShowIncidentProps {
  incident: Insiden;
}

export default function ShowIncident({ incident }: ShowIncidentProps) {
  const [modal, setModal] = useState(false);

  function handleChange() {
    setModal(!modal);
  }

  return (
    <>
      <button className="" onClick={handleChange}>
        <Icon icon="mdi:show-outline" width="28" height="28" color="green" />
      </button>
      <input
        type="checkbox"
        checked={modal}
        className="modal-toggle"
        onChange={handleChange}
      />
      <div className={`modal ${modal ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Laporan Insiden</h3>
          <table className="table">
            <tbody>
              <tr>
                <th>Nama</th>
                <td>{incident.user_name}</td>
              </tr>
              <tr>
                <th>Posisi</th>
                <td>{incident.position}</td>
              </tr>
              <tr>
                <th>Area</th>
                <td>{incident.area}</td>
              </tr>
              <tr>
                <th>Lokasi</th>
                <td>{incident.location_name}</td>
              </tr>
              <tr>
                <th>Kategori</th>
                <td>{incident.category == null ? incident.custom_category : incident.category}</td>
              </tr>
              <tr>
                <th>Tipe Laporan</th>
                <td>{incident.type_reporting == null ? incident.custom_type_reporting : incident.type_reporting}</td>
              </tr>
              <tr>
                <th>Deskripsi</th>
                <td>{incident.description}</td>
              </tr>
              <tr>
                <th>Penilaian Resiko</th>
                <td>{incident.risk_assessment}</td>
              </tr>
              <tr>
                <th>Tindakan Pengendalian</th>
                <td>
                  {incident.control_measure ? (
                    <ol>
                      {incident.control_measure.map((measure: any, index: number) => (
                        <li key={index}>{`${index + 1}. ${measure}`}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>No control measures provided</p>
                  )}
                </td>
              </tr>
              <tr>
                <th>Saran</th>
                <td>{incident.saran}</td>
              </tr>
              <tr>
                <th>Waktu Kejadian</th>
                <td>{incident.time_incident}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{incident.status}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <p className="font-bold text-center mt-10 text-xl mb-5">Bukti Laporan</p>
            <div className="flex justify-center">
              <img src={incident.image} alt="Incident" className="mt-2" />
            </div>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={handleChange}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
