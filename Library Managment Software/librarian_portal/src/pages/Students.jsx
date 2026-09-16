import { Eye, ShieldAlert, UserCheck, UserPlus, UserX } from "lucide-react";
import DataTable from "../components/DataTable.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Students() {
  const { data, setModal, updateStudentStatus } = useLibrary();

  const columns = [
    {
      label: "Student ID",
      render: (item) => (
        <span style={{ fontFamily: "var(--mono)", fontWeight: 700, color: "var(--navy)" }}>
          {item.id}
        </span>
      ),
    },
    {
      label: "Full Name & Email",
      render: (item) => (
        <div>
          <strong style={{ color: "var(--ink)", fontSize: "14px" }}>{item.name}</strong>
          <small style={{ display: "block", color: "var(--muted)" }}>{item.email}</small>
        </div>
      ),
    },
    {
      label: "Academic Department",
      render: (item) => (
        <div>
          <span>{item.department}</span>
          <small style={{ display: "block", color: "var(--muted)", fontSize: "11px" }}>{item.year}</small>
        </div>
      ),
    },
    {
      label: "Active Loans Quota",
      render: (item) => (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
            <span><b>{item.activeLoans}</b> / {item.limit} Loans</span>
          </div>
          <div style={{ width: "100px", height: "6px", background: "var(--paper-deep)", borderRadius: "3px", overflow: "hidden" }}>
            <div
              style={{
                width: `${(item.activeLoans / item.limit) * 100}%`,
                height: "100%",
                background: item.activeLoans >= item.limit ? "var(--red)" : "var(--blue)",
              }}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Fine Balance",
      render: (item) => (
        <span
          style={{
            fontFamily: "var(--mono)",
            fontWeight: 700,
            color: item.fine > 0 ? "var(--red)" : "var(--green)",
          }}
        >
          ${item.fine}.00
        </span>
      ),
    },
    {
      label: "Membership Status",
      render: (item) => (
        <span className={`badge ${item.status === "Active" ? "green" : "red"}`}>
          {item.status}
        </span>
      ),
    },
    {
      label: "Actions",
      render: (item) => (
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            className="icon-btn"
            title="Inspect Student Profile"
            onClick={() => setModal({ type: "studentDetail", student: item })}
          >
            <Eye size={15} />
          </button>
          <button
            className="secondary"
            style={{ padding: "4px 8px", fontSize: "11.5px" }}
            onClick={() =>
              updateStudentStatus(item.id, item.status === "Active" ? "Blocked" : "Active")
            }
          >
            {item.status === "Active" ? "Block" : "Unblock"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Borrower Registry</span>
          <h1>Students & Borrower Accounts</h1>
          <p>Manage student registration, circulation quotas, account blocks, and outstanding library fines.</p>
        </div>
        <button className="primary gold-btn" onClick={() => setModal({ type: "addStudent" })}>
          <UserPlus size={15} /> Register Student Account
        </button>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Registered University Borrowers ({data.students.length})</h2>
        </div>
        <div className="panel-body">
          <DataTable
            columns={columns}
            data={data.students}
            searchPlaceholder="Search student ID, name, email, or department..."
          />
        </div>
      </div>
    </div>
  );
}
