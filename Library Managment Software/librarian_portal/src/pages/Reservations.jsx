import { BellRing, CheckCircle, Clock, XCircle } from "lucide-react";
import DataTable from "../components/DataTable.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Reservations() {
  const { data, updateReservation } = useLibrary();

  const columns = [
    {
      label: "Request ID",
      render: (item) => (
        <span style={{ fontFamily: "var(--mono)", fontWeight: 700, color: "var(--navy)" }}>
          {item.id}
        </span>
      ),
    },
    {
      label: "Student Borrower",
      render: (item) => (
        <div>
          <strong>{item.studentName}</strong>
          <small style={{ display: "block", color: "var(--muted)", fontFamily: "var(--mono)" }}>
            {item.studentId}
          </small>
        </div>
      ),
    },
    {
      label: "Target Volume Title",
      render: (item) => (
        <strong style={{ color: "var(--ink)" }}>{item.book}</strong>
      ),
    },
    {
      label: "Requested On",
      key: "requested",
    },
    {
      label: "Hold Queue Status",
      render: (item) => {
        const isReady = item.status === "Ready for Pickup";
        return (
          <span className={`badge ${isReady ? "green" : "amber"}`}>
            {isReady && <BellRing size={11} />} {item.status}
          </span>
        );
      },
    },
    {
      label: "Desk Actions",
      render: (item) => (
        <div style={{ display: "flex", gap: "6px" }}>
          {item.status !== "Ready for Pickup" && (
            <button
              className="primary gold-btn"
              style={{ padding: "4px 10px", fontSize: "11.5px" }}
              onClick={() => updateReservation(item.id, "Ready for Pickup")}
            >
              Notify Ready
            </button>
          )}
          <button
            className="secondary"
            style={{ padding: "4px 8px", fontSize: "11.5px" }}
            onClick={() => updateReservation(item.id, "Fulfilled")}
          >
            Fulfill
          </button>
          <button
            className="icon-btn danger"
            title="Cancel Reservation"
            onClick={() => updateReservation(item.id, "Cancelled")}
          >
            <XCircle size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Hold Circulation</span>
          <h1>Student Reservations & Holds Queue</h1>
          <p>Manage reservation requests, hold shelf allocations, student pickup notifications, and queue priority.</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Active Reservation Holds ({data.reservations.length})</h2>
        </div>
        <div className="panel-body">
          <DataTable
            columns={columns}
            data={data.reservations}
            searchPlaceholder="Search student or reserved title..."
          />
        </div>
      </div>
    </div>
  );
}
