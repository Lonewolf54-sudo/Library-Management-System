import {
  ArrowDownToLine,
  BarChart3,
  Calendar,
  CheckCircle,
  FileSpreadsheet,
  PieChart,
  Printer,
  TrendingUp,
} from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Reports() {
  const { data, notify } = useLibrary();

  function handleExportCSV() {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Title,ISBN,Category,Available,Copies,Shelf\n" +
      data.books.map((b) => `"${b.id}","${b.title}","${b.isbn}","${b.category}",${b.available},${b.copies},"${b.shelf}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `archive_library_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify("Exported Library Catalog CSV report!");
  }

  function handlePrintAudit() {
    window.print();
  }

  const deptStats = [
    { name: "Computer Science & AI", count: 184, pct: 38 },
    { name: "Economics & Business", count: 112, pct: 23 },
    { name: "Engineering & Circuits", count: 96, pct: 20 },
    { name: "Natural Sciences", count: 52, pct: 11 },
    { name: "Law & Humanities", count: 40, pct: 8 },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Audit & Intelligence</span>
          <h1>Library Analytics & Reports</h1>
          <p>Generate circulation velocities, departmental borrowing profiles, inventory attrition, and compliance audits.</p>
        </div>
        <div className="header-actions">
          <button className="secondary" onClick={handlePrintAudit}>
            <Printer size={15} /> Print Summary
          </button>
          <button className="primary gold-btn" onClick={handleExportCSV}>
            <FileSpreadsheet size={15} /> Export Catalog CSV
          </button>
        </div>
      </div>

      <div className="stats">
        <StatCard
          label="Circulation Rate"
          value="84.2%"
          description="Catalog utilization"
          accent="#15803d"
          trend="+5.4% MoM"
          trendPositive={true}
        />
        <StatCard
          label="Avg Loan Duration"
          value="11.8 Days"
          description="Return turnaround"
          accent="#062842"
          trend="Optimal"
          trendPositive={true}
        />
        <StatCard
          label="Overdue Rate"
          value="4.1%"
          description="Below 5% threshold"
          accent="#1d4ed8"
          trend="Healthy"
          trendPositive={true}
        />
        <StatCard
          label="Fines Recovered"
          value="$1,240"
          description="Collected YTD"
          accent="#d8ad2e"
          trend="88% clearance"
          trendPositive={true}
        />
      </div>

      <div className="grid">
        {/* DEPARTMENT BORROW PROFILE */}
        <div className="panel">
          <div className="panel-head">
            <h2>Department Borrowing Distribution</h2>
          </div>
          <div className="panel-body">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {deptStats.map((dept) => (
                <div key={dept.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 600, color: "var(--ink)" }}>{dept.name}</span>
                    <span style={{ fontFamily: "var(--mono)", color: "var(--muted)" }}>
                      <b>{dept.count}</b> loans ({dept.pct}%)
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "var(--paper-deep)", borderRadius: "4px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${dept.pct}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, var(--navy), var(--gold))",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AUDIT SUMMARY */}
        <div className="panel">
          <div className="panel-head">
            <h2>Workstation Session Audit</h2>
          </div>
          <div className="panel-body">
            <div className="preview-box">
              <div className="preview-row">
                <span>Total Catalog Titles</span>
                <strong>{data.stats.totalCatalog} Titles</strong>
              </div>
              <div className="preview-row">
                <span>Active Circulating Volumes</span>
                <strong>{data.stats.issuedBooks} Copies</strong>
              </div>
              <div className="preview-row">
                <span>Registered Borrowers</span>
                <strong>{data.students.length} Accounts</strong>
              </div>
              <div className="preview-row">
                <span>Outstanding Fine Balance</span>
                <strong style={{ color: "var(--red)" }}>${data.stats.pendingFines}.00</strong>
              </div>
              <div className="preview-row">
                <span>System Health</span>
                <strong style={{ color: "var(--green)" }}>Operational (100%)</strong>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                className="primary"
                style={{ width: "100%" }}
                onClick={handleExportCSV}
              >
                <ArrowDownToLine size={15} /> Download Full Compliance Audit Log (.CSV)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
