import {
  ArrowDownToLine,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
} from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "../components/DataTable.jsx";
import { useAdmin } from "../context/AdminContext.jsx";

export default function ManageUsers() {
  const { data, setModal, notify } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredUsers = useMemo(() => {
    return data.users.filter((user) => {
      const matchSearch =
        searchQuery === "" ||
        `${user.name} ${user.email} ${user.id} ${user.department}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchRole = roleFilter === "All" || user.role === roleFilter;
      const matchStatus = statusFilter === "All" || user.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [data.users, searchQuery, roleFilter, statusFilter]);

  function handleSelectAll(checked) {
    if (checked) setSelectedIds(filteredUsers.map((u) => u.id));
    else setSelectedIds([]);
  }

  function handleSelectRow(id) {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter((item) => item !== id));
    else setSelectedIds([...selectedIds, id]);
  }

  function handleExportCSV() {
    const csv =
      "data:text/csv;charset=utf-8," +
      "ID,Name,Email,Role,Department,RegistrationDate,Status\n" +
      data.users.map((u) => `"${u.id}","${u.name}","${u.email}","${u.role}","${u.department}","${u.registrationDate}","${u.status}"`).join("\n");
    const uri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", `The_Archive_Users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify("Exported users roster to CSV!");
  }

  const columns = [
    { label: "Name", width: "260px" },
    { label: "User ID", width: "160px" },
    { label: "Role", width: "120px" },
    { label: "Registration Date", width: "160px" },
    { label: "Status", width: "120px" },
    { label: "Actions", width: "80px" },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Manage Users</h1>
          <p>View, edit, and manage registered library members.</p>
        </div>
        <button className="btn-primary" onClick={() => setModal({ type: "addUser" })}>
          <UserPlus size={15} /> + Add New User
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="table-controls">
        <div className="search-input-wrap">
          <Search size={15} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or ID..."
          />
        </div>

        <div className="filter-actions">
          {/* ROLE FILTER */}
          <div style={{ position: "relative" }}>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="btn-secondary"
              style={{ paddingRight: "28px", cursor: "pointer" }}
            >
              <option value="All">Role: All</option>
              <option value="Student">Role: Student</option>
              <option value="Faculty">Role: Faculty</option>
            </select>
          </div>

          {/* STATUS FILTER */}
          <div style={{ position: "relative" }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="btn-secondary"
              style={{ paddingRight: "28px", cursor: "pointer" }}
            >
              <option value="All">Status: All</option>
              <option value="Active">Status: Active</option>
              <option value="Pending">Status: Pending</option>
              <option value="Inactive">Status: Inactive</option>
            </select>
          </div>

          {/* EXPORT BUTTON */}
          <button className="btn-secondary" onClick={handleExportCSV}>
            <ArrowDownToLine size={14} /> Export
          </button>
        </div>
      </div>

      {/* USERS DATA TABLE */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        totalEntries={1248}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        renderRow={(user) => {
          const isSelected = selectedIds.includes(user.id);
          const initials = user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2);

          return (
            <tr key={user.id} style={{ background: isSelected ? "var(--bg-page)" : "transparent" }}>
              <td>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleSelectRow(user.id)}
                />
              </td>
              <td>
                <div className="user-cell">
                  <div className={`user-cell-avatar ${user.avatarColor || "blue"}`}>
                    {initials}
                  </div>
                  <div className="user-cell-info">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                </div>
              </td>
              <td>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "#334155" }}>
                  {user.id}
                </span>
              </td>
              <td>
                <span style={{ fontSize: "13px", color: "var(--text-main)", fontWeight: 500 }}>
                  {user.role}
                </span>
              </td>
              <td>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  {user.registrationDate}
                </span>
              </td>
              <td>
                <span
                  className={`badge-pill ${
                    user.status === "Active"
                      ? "active"
                      : user.status === "Pending"
                      ? "pending"
                      : "inactive"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                <button
                  className="icon-trigger"
                  title="Manage Member"
                  onClick={() => setModal({ type: "userActions", user })}
                >
                  <MoreHorizontal size={16} />
                </button>
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
}
