import { Filter, Plus, Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import StaffCard from "../components/StaffCard.jsx";
import StatPill from "../components/StatPill.jsx";
import { useAdmin } from "../context/AdminContext.jsx";

export default function ManageLibrarians() {
  const { data, setModal } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredStaff = useMemo(() => {
    return data.librarians.filter((staff) => {
      const matchQuery =
        searchQuery === "" ||
        `${staff.name} ${staff.role} ${staff.empId} ${staff.specialty}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || staff.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [data.librarians, searchQuery, statusFilter]);

  return (
    <div>
      {/* HEADER WITH TOP RIGHT KPI PILLS */}
      <div className="page-header">
        <div>
          <h1>Manage Librarians</h1>
          <p>Oversee staff assignments, performance, and current shift status.</p>
        </div>

        <div className="kpi-pills">
          <StatPill label="Total Staff" value={data.stats.totalStaff} variant="gray" />
          <StatPill label="Active Shift" value={data.stats.activeShift} variant="navy" />
          <StatPill
            label="Pending"
            value={data.stats.pendingStaffReviews}
            variant="orange"
            hasBadge={true}
            badgeText="Review"
          />
        </div>
      </div>

      {/* FILTER & ACTIONS BAR */}
      <div className="table-controls" style={{ marginTop: "12px" }}>
        <div className="search-input-wrap">
          <Search size={15} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or ID..."
          />
        </div>

        <div className="filter-actions">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="btn-secondary"
            style={{ cursor: "pointer" }}
          >
            <option value="All">Filter Shift: All</option>
            <option value="ACTIVE SHIFT">Active Shift</option>
            <option value="OFF SHIFT">Off Shift</option>
            <option value="ON LEAVE">On Leave</option>
          </select>

          <button className="btn-secondary" onClick={() => setModal({ type: "addLibrarian" })}>
            <Plus size={14} /> Add Librarian
          </button>
        </div>
      </div>

      {/* STAFF CARDS GRID */}
      <div className="staff-grid">
        {filteredStaff.map((staff) => (
          <StaffCard key={staff.id} staff={staff} />
        ))}
      </div>

      {/* PAGINATION FOOTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "32px",
          paddingTop: "16px",
          borderTop: "1px solid var(--border-line)",
          fontSize: "13px",
          color: "var(--text-muted)",
        }}
      >
        <span>Showing 1 to {filteredStaff.length} of 142 entries</span>

        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <button className="btn-secondary" style={{ padding: "4px 8px" }}>
            &lt;
          </button>
          <button
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "var(--radius-sm)",
              background: "var(--navy-primary)",
              color: "#ffffff",
              fontWeight: 700,
            }}
          >
            1
          </button>
          <button
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "var(--radius-sm)",
              background: "transparent",
              color: "var(--text-main)",
              fontWeight: 600,
            }}
          >
            2
          </button>
          <button
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "var(--radius-sm)",
              background: "transparent",
              color: "var(--text-main)",
              fontWeight: 600,
            }}
          >
            3
          </button>
          <span style={{ padding: "0 4px" }}>...</span>
          <button className="btn-secondary" style={{ padding: "4px 8px" }}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
