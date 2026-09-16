import { CheckCircle2, Clock, RefreshCw, XCircle } from "lucide-react";
import DataTable from "../components/DataTable.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Renewals() {
  const { data, renewLoan } = useLibrary();

  const activeLoans = data.loans.filter((l) => l.status !== "Returned");

  const columns = [
    {
      label: "Borrower Student",
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
      label: "Book / Barcode",
      render: (item) => (
        <div>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>{item.bookTitle}</span>
          <small style={{ display: "block", color: "var(--muted)", fontFamily: "var(--mono)" }}>
            {item.copyBarcode}
          </small>
        </div>
      ),
    },
    {
      label: "Issued Date",
      key: "issueDate",
    },
    {
      label: "Current Due",
      render: (item) => (
        <span style={{ fontFamily: "var(--mono)", fontWeight: 600, color: item.status === "Overdue" ? "var(--red)" : "inherit" }}>
          {item.dueDate}
        </span>
      ),
    },
    {
      label: "Renewals Done",
      render: (item) => (
        <span className="badge neutral">
          {item.renewalsCount} / 2 Used
        </span>
      ),
    },
    {
      label: "Status",
      render: (item) => (
        <span className={`badge ${item.status === "Overdue" ? "red" : "green"}`}>
          {item.status}
        </span>
      ),
    },
    {
      label: "Action",
      render: (item) => {
        const canRenew = item.renewalsCount < 2;
        return (
          <button
            className={canRenew ? "primary gold-btn" : "secondary"}
            style={{ padding: "6px 12px", fontSize: "12px" }}
            disabled={!canRenew}
            onClick={() => renewLoan(item.id, 14)}
          >
            <RefreshCw size={12} /> {canRenew ? "+14 Days Renew" : "Max Reached"}
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Circulation Extensions</span>
          <h1>Loan Renewals Desk</h1>
          <p>Review active circulation loans, verify reservation hold conflicts, and grant 14-day extensions.</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Active Loans in Circulation ({activeLoans.length})</h2>
        </div>
        <div className="panel-body">
          <DataTable
            columns={columns}
            data={activeLoans}
            searchPlaceholder="Search borrower or title for renewal..."
          />
        </div>
      </div>
    </div>
  );
}
