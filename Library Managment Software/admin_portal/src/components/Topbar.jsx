import { Activity, Bell, Flag, LogOut, Search, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext.jsx";

export default function Topbar() {
  const { data, setModal } = useAdmin();
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const searchResults = query.trim()
    ? [
        ...data.users
          .filter((u) => `${u.name} ${u.email} ${u.id}`.toLowerCase().includes(query.toLowerCase()))
          .map((u) => ({ type: "User", name: u.name, meta: `${u.id} • ${u.role}`, path: "/users" })),
        ...data.librarians
          .filter((l) => `${l.name} ${l.role} ${l.empId}`.toLowerCase().includes(query.toLowerCase()))
          .map((l) => ({ type: "Staff", name: l.name, meta: `${l.role} • ${l.empId}`, path: "/librarians" })),
        ...data.books
          .filter((b) => `${b.title} ${b.isbn}`.toLowerCase().includes(query.toLowerCase()))
          .map((b) => ({ type: "Book", name: b.title, meta: `ISBN: ${b.isbn}`, path: "/catalog" })),
      ].slice(0, 5)
    : [];

  return (
    <header className="top-header">
      <div className="header-left">
        <Link to="/dashboard" className="brand-title">
          <div className="brand-seal">🏛️</div>
          <span>The Archive</span>
        </Link>

        <nav className="header-nav">
          <Link to="/users">Directory</Link>
          <Link to="/catalog">Archives</Link>
          <button onClick={() => setModal({ type: "notices" })}>Public Notices</button>
        </nav>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search directory..."
          />
          {searchResults.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                width: "280px",
                background: "#ffffff",
                border: "1px solid var(--border-line)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-dropdown)",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                zIndex: 100,
              }}
            >
              <span style={{ fontSize: "11px", color: "var(--text-muted)", padding: "4px 8px", fontWeight: 700 }}>
                MATCHING ARCHIVE RECORDS
              </span>
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px",
                    textAlign: "left",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-page)",
                  }}
                  onClick={() => {
                    navigate(res.path);
                    setQuery("");
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 6px",
                      background: "var(--navy-primary)",
                      color: "#ffffff",
                      borderRadius: "3px",
                    }}
                  >
                    {res.type}
                  </span>
                  <div>
                    <strong style={{ display: "block", fontSize: "13px" }}>{res.name}</strong>
                    <small style={{ color: "var(--text-muted)", fontSize: "11px" }}>{res.meta}</small>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="status-btn" onClick={() => setModal({ type: "systemStatus" })}>
          <Activity size={14} /> System Status
        </button>

        <button
          className="icon-trigger"
          title="Institutional Notices"
          onClick={() => setModal({ type: "notices" })}
        >
          <Flag size={16} />
        </button>

        <button
          className="icon-trigger"
          title="Operational Alerts"
          onClick={() => setModal({ type: "alerts" })}
        >
          <Bell size={16} />
          <span className="dot-indicator" />
        </button>

        <div style={{ position: "relative" }}>
          <button className="user-avatar-btn" onClick={() => setProfileOpen(!profileOpen)}>
            <div className="user-avatar">AD</div>
          </button>

          {profileOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                width: "200px",
                background: "#ffffff",
                border: "1px solid var(--border-line)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-dropdown)",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                zIndex: 100,
              }}
            >
              <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border-line)" }}>
                <strong style={{ display: "block", fontSize: "13.5px" }}>Administrator</strong>
                <small style={{ color: "var(--text-muted)", fontSize: "11.5px" }}>admin@archive.edu</small>
              </div>
              <button
                style={{ padding: "8px 12px", fontSize: "13px", textAlign: "left", color: "var(--text-main)" }}
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/settings");
                }}
              >
                Settings
              </button>
              <button
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  textAlign: "left",
                  color: "var(--red-badge-text)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onClick={() => {
                  setProfileOpen(false);
                  setModal({ type: "logout" });
                }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
