import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../context/AdminContext.jsx";

export default function StaffCard({ staff, onSelect }) {
  const { updateLibrarianShift, setModal } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);

  const isReview = Boolean(staff.hasReview);

  return (
    <div className={`staff-card ${isReview ? "review-border" : ""}`}>
      <button
        className="staff-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        title="More Actions"
      >
        <MoreVertical size={16} />
      </button>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "36px",
            right: "14px",
            background: "#ffffff",
            border: "1px solid var(--border-line)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-dropdown)",
            padding: "6px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            zIndex: 30,
            textAlign: "left",
            width: "150px",
          }}
        >
          <button
            style={{ padding: "6px 8px", fontSize: "12px", textAlign: "left" }}
            onClick={() => {
              setMenuOpen(false);
              updateLibrarianShift(
                staff.id,
                staff.status === "ACTIVE SHIFT" ? "OFF SHIFT" : "ACTIVE SHIFT"
              );
            }}
          >
            Toggle Shift
          </button>
          <button
            style={{ padding: "6px 8px", fontSize: "12px", textAlign: "left" }}
            onClick={() => {
              setMenuOpen(false);
              setModal({ type: "staffPerformance", staff });
            }}
          >
            View Review
          </button>
        </div>
      )}

      {staff.avatarType === "initials" ? (
        <div className="staff-avatar-initials">{staff.avatarInitials || "ST"}</div>
      ) : (
        <img
          src={staff.avatarPhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"}
          alt={staff.name}
          className="staff-avatar-photo"
        />
      )}

      <h3>{staff.name}</h3>
      <div className="staff-role">{staff.role}</div>

      <div>
        <span
          className={`badge-pill ${
            staff.status === "ACTIVE SHIFT"
              ? "active"
              : staff.status === "OFF SHIFT"
              ? "off-shift"
              : "on-leave"
          }`}
        >
          ● {staff.status}
        </span>
      </div>

      <div className="staff-meta">
        <div className="staff-meta-row">
          <span>Emp ID:</span>
          <strong>{staff.empId}</strong>
        </div>
        <div className="staff-meta-row">
          <span>Specialty:</span>
          <strong>{staff.specialty}</strong>
        </div>
      </div>

      <button
        className="staff-btn"
        onClick={() => setModal({ type: "staffPerformance", staff })}
      >
        {isReview ? "Approve Extension" : "View Performance"}
      </button>
    </div>
  );
}
