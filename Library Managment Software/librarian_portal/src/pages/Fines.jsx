import { Check, DollarSign, Receipt, ShieldCheck, Undo2 } from "lucide-react";
import DataTable from "../components/DataTable.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Fines() {
  const { data, setModal } = useLibrary();

  const totalOutstanding = data.fines
    .filter((f) => f.status === "Unpaid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const columns = [
    {
      label: "Fine ID",
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
      label: "Material Title",
      render: (item) => (
        <span style={{ fontWeight: 600, color: "var(--ink)" }}>{item.book}</span>
      ),
    },
    {
      label: "Fine Assessment Reason",
      render: (item) => (
        <small style={{ color: "var(--muted)" }}>{item.reason}</small>
      ),
    },
    {
      label: "Amount Due",
      render: (item) => (
        <strong
          style={{
            fontFamily: "var(--mono)",
            fontSize: "14px",
            color: item.status === "Unpaid" ? "var(--red)" : "var(--green)",
          }}
        >
          ${item.amount}.00
        </strong>
      ),
    },
    {
      label: "Ledger Status",
      render: (item) => (
        <span
          className={`badge ${
            item.status === "Paid" ? "green" : item.status === "Unpaid" ? "red" : "neutral"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      label: "Desk Actions",
      render: (item) => {
        if (item.status === "Unpaid") {
          return (
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                className="primary gold-btn"
                style={{ padding: "4px 10px", fontSize: "12px" }}
                onClick={() => setModal({ type: "collectFine", fine: item })}
              >
                <DollarSign size={13} /> Collect
              </button>
              <button
                className="secondary"
                style={{ padding: "4px 8px", fontSize: "12px" }}
                onClick={() => setModal({ type: "waiveFine", fine: item })}
              >
                Waive
              </button>
            </div>
          );
        }
        return (
          <span style={{ fontSize: "12px", color: "var(--muted)", fontStyle: "italic" }}>
            Ledger Cleared
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Financial Accounts</span>
          <h1>Library Fines & Dues Ledger</h1>
          <p>Collect overdue penalties, record material damage assessments, and process administrative fee waivers.</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--muted)", textTransform: "uppercase" }}>
            Total Unpaid Dues
          </span>
          <h2 style={{ fontFamily: "var(--mono)", color: "var(--red)", margin: 0 }}>
            ${totalOutstanding}.00
          </h2>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Fine Records ({data.fines.length})</h2>
        </div>
        <div className="panel-body">
          <DataTable
            columns={columns}
            data={data.fines}
            searchPlaceholder="Search student ID, name, or book title..."
          />
        </div>
      </div>
    </div>
  );
}
