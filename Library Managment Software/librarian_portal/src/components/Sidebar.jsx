import {
  BookCopy,
  BookOpen,
  Boxes,
  ChartNoAxesColumn,
  ClipboardList,
  History,
  LayoutDashboard,
  LogOut,
  RefreshCw,
  RotateCcw,
  Users,
  WalletCards,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Sidebar() {
  const { data, setModal } = useLibrary();
  const navigate = useNavigate();

  const overdueCount = data.loans.filter((l) => l.status === "Overdue").length;
  const pendingReservations = data.reservations.filter((r) => r.status.includes("Pending") || r.status.includes("Waiting")).length;

  const items = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/issue", icon: BookOpen, label: "Issue Book" },
    { to: "/return", icon: RotateCcw, label: "Return Book", badge: overdueCount > 0 ? overdueCount : null, badgeClass: "danger" },
    { to: "/renewals", icon: RefreshCw, label: "Renewals" },
    { to: "/books", icon: BookCopy, label: "Catalog / Books" },
    { to: "/inventory", icon: Boxes, label: "Copies Inventory" },
    { to: "/students", icon: Users, label: "Students Roster" },
    { to: "/reservations", icon: ClipboardList, label: "Reservations", badge: pendingReservations > 0 ? pendingReservations : null, badgeClass: "gold" },
    { to: "/fines", icon: WalletCards, label: "Fines & Dues" },
    { to: "/shelves", icon: History, label: "Shelves & Racks" },
    { to: "/reports", icon: ChartNoAxesColumn, label: "Analytics & Reports" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">AR</div>
        <div>
          <strong>The Archive</strong>
          <small>LIBRARIAN PORTAL</small>
        </div>
      </div>

      <nav className="nav" aria-label="Main Navigation">
        {items.map(({ to, icon: Icon, label, badge, badgeClass }) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="nav-icon">
              <Icon size={17} />
            </span>
            <span className="label">{label}</span>
            {badge !== null && badge !== undefined && (
              <span className={`sidebar-badge ${badgeClass || ""}`}>{badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div>
          <span style={{ fontSize: "11px", color: "var(--gold)", fontFamily: "var(--mono)", fontWeight: 700 }}>
            v4.2.0-PROD
          </span>
          <p style={{ fontSize: "10px", color: "#64748b" }}>Academic Desk</p>
        </div>
        <button
          className="icon-btn"
          title="Logout"
          style={{ color: "#94a3b8" }}
          onClick={() => setModal({ type: "logout" })}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
