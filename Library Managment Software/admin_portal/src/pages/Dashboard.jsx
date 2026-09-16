import {
  Activity,
  ArrowRight,
  BookOpen,
  Cloud,
  FileBarChart,
  HardDrive,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StatPill from "../components/StatPill.jsx";
import { useAdmin } from "../context/AdminContext.jsx";

export default function Dashboard() {
  const { data, setModal } = useAdmin();
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Executive Dashboard</h1>
          <p>Institutional overview, staff readiness, system telemetry, and active patron statistics for The Archive.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-secondary" onClick={() => setModal({ type: "systemStatus" })}>
            <Activity size={14} /> System Health
          </button>
          <button className="btn-primary" onClick={() => setModal({ type: "newEntry" })}>
            + New Entry
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        <div className="card-table" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "12px", fontWeight: 700 }}>
            <span>REGISTERED PATRONS</span>
            <Users size={16} color="var(--orange-active)" />
          </div>
          <strong style={{ display: "block", fontSize: "28px", fontWeight: 800, margin: "8px 0 4px", color: "var(--navy-primary)" }}>
            {data.stats.totalUsers.toLocaleString()}
          </strong>
          <small style={{ color: "var(--green-badge-text)", fontWeight: 600 }}>
            ● {data.stats.activeUsers} Active Accounts
          </small>
        </div>

        <div className="card-table" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "12px", fontWeight: 700 }}>
            <span>LIBRARIAN STAFF</span>
            <UserCheck size={16} color="var(--navy-primary)" />
          </div>
          <strong style={{ display: "block", fontSize: "28px", fontWeight: 800, margin: "8px 0 4px", color: "var(--navy-primary)" }}>
            {data.stats.totalStaff}
          </strong>
          <small style={{ color: "var(--blue-badge-text)", fontWeight: 600 }}>
            ● {data.stats.activeShift} On Active Duty Shift
          </small>
        </div>

        <div className="card-table" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "12px", fontWeight: 700 }}>
            <span>CATALOG VOLUMES</span>
            <BookOpen size={16} color="var(--green-badge-text)" />
          </div>
          <strong style={{ display: "block", fontSize: "28px", fontWeight: 800, margin: "8px 0 4px", color: "var(--navy-primary)" }}>
            {data.stats.totalCatalogVolumes.toLocaleString()}
          </strong>
          <small style={{ color: "var(--text-muted)" }}>
            Across 8 Stack Sections
          </small>
        </div>

        <div className="card-table" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "12px", fontWeight: 700 }}>
            <span>SYSTEM HEALTH</span>
            <ShieldCheck size={16} color="var(--green-badge-text)" />
          </div>
          <strong style={{ display: "block", fontSize: "28px", fontWeight: 800, margin: "8px 0 4px", color: "var(--navy-primary)" }}>
            99.98%
          </strong>
          <small style={{ color: "var(--green-badge-text)", fontWeight: 600 }}>
            Database Synced
          </small>
        </div>
      </div>

      {/* TWO COLUMN SUMMARY */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px" }}>
        {/* RECENT USERS */}
        <div className="card-table">
          <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--navy-primary)" }}>
              Recent Member Registrations
            </h2>
            <Link to="/users" style={{ fontSize: "13px", fontWeight: 700, color: "var(--orange-active)" }}>
              View All →
            </Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>User ID</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.users.slice(0, 4).map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className={`user-cell-avatar ${user.avatarColor || "blue"}`}>
                        {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="user-cell-info">
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>{user.id}</span></td>
                  <td>{user.role}</td>
                  <td><span className={`badge-pill ${user.status.toLowerCase()}`}>{user.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* STAFF READINESS & SHIFTS */}
        <div className="card-table">
          <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--navy-primary)" }}>
              Duty Shift Roster
            </h2>
            <Link to="/librarians" style={{ fontSize: "13px", fontWeight: 700, color: "var(--orange-active)" }}>
              Staff Grid →
            </Link>
          </div>
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.librarians.slice(0, 3).map((staff) => (
              <div key={staff.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px", borderBottom: "1px dashed var(--border-line)" }}>
                <div>
                  <strong style={{ fontSize: "13.5px", color: "var(--text-main)", display: "block" }}>
                    {staff.name}
                  </strong>
                  <small style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                    {staff.role} • {staff.specialty}
                  </small>
                </div>
                <span className={`badge-pill ${staff.status === "ACTIVE SHIFT" ? "active" : staff.status === "OFF SHIFT" ? "off-shift" : "on-leave"}`}>
                  {staff.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
