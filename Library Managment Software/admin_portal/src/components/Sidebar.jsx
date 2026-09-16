import {
  BookOpen,
  Cloud,
  FileBarChart,
  History,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAdmin } from "../context/AdminContext.jsx";

export default function Sidebar() {
  const { setModal } = useAdmin();

  const menuItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/users", label: "Manage Users", icon: Users },
    { to: "/librarians", label: "Manage Librarians", icon: UserCheck },
    { to: "/catalog", label: "Book Catalog", icon: BookOpen },
    { to: "/reports", label: "Reports", icon: FileBarChart },
    { to: "/backups", label: "Database Backup", icon: Cloud },
    { to: "/logs", label: "Activity Logs", icon: History },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-icon">
          <Shield size={18} />
        </div>
        <div>
          <h2>Admin Console</h2>
          <small>LMS v2.4.0</small>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="btn-new-entry" onClick={() => setModal({ type: "newEntry" })}>
          <Plus size={15} /> + New Entry
        </button>
        <button className="btn-logout" onClick={() => setModal({ type: "logout" })}>
          <LogOut size={15} /> Logout
        </button>
      </div>
    </aside>
  );
}
