import {
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  PackageCheck,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function ReturnBook() {
  const { data, returnBook } = useLibrary();
  const navigate = useNavigate();

  const [copyBarcode, setCopyBarcode] = useState("CP-11842");
  const [condition, setCondition] = useState("Good");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState([]);
  const [returnReceipt, setReturnReceipt] = useState(null);

  // Find active loan matching this barcode
  const activeLoan = data.loans.find(
    (l) =>
      l.copyBarcode.toLowerCase() === copyBarcode.trim().toLowerCase() &&
      (l.status === "Active" || l.status === "Overdue")
  );

  const targetCopy = data.copies.find(
    (c) => c.barcode.toLowerCase() === copyBarcode.trim().toLowerCase()
  );

  const targetBook = targetCopy ? data.books.find((b) => b.id === targetCopy.bookId) : null;

  // Calculate damage & overdue fees
  const damageFee = condition === "Damaged" ? 20 : condition === "Lost" ? 50 : 0;
  const overdueDays = activeLoan ? activeLoan.overdueDays : 0;
  const overdueFee = overdueDays * 2;
  const totalFine = damageFee + overdueFee;

  function handleReturnSubmit(e) {
    e.preventDefault();
    setErrors([]);

    const res = returnBook(copyBarcode, condition, notes);
    if (!res.ok) {
      setErrors(res.errors);
    } else {
      setReturnReceipt({
        barcode: copyBarcode,
        bookTitle: targetBook ? targetBook.title : targetCopy?.bookTitle || "Library Volume",
        studentName: activeLoan ? activeLoan.studentName : "Walk-in Desk",
        condition,
        overdueDays,
        overdueFee,
        damageFee,
        totalFine,
      });
    }
  }

  function handleReset() {
    setReturnReceipt(null);
    setCopyBarcode("");
    setErrors([]);
  }

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Desk Circulation</span>
          <h1>Return Book Desk</h1>
          <p>Process incoming returned copies, inspect book spine/cover condition, calculate overdue fees, and restore shelf inventory.</p>
        </div>
      </div>

      {returnReceipt ? (
        <div className="workflow-card" style={{ background: "#f0fdf4", borderColor: "var(--green)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <CheckCircle2 size={32} color="var(--green)" />
            <div>
              <h2 style={{ fontFamily: "var(--serif)", color: "var(--green)", margin: 0 }}>
                Copy Returned & Restocked!
              </h2>
              <p style={{ fontSize: "14px", color: "#14532d", margin: "2px 0 0" }}>
                Barcode: <b>{returnReceipt.barcode}</b> • Condition: <b>{returnReceipt.condition}</b>
              </p>
            </div>
          </div>

          <div className="preview-box" style={{ background: "white", margin: "20px 0" }}>
            <div className="preview-row">
              <span>Book Title</span>
              <strong>{returnReceipt.bookTitle}</strong>
            </div>
            <div className="preview-row">
              <span>Borrower</span>
              <strong>{returnReceipt.studentName}</strong>
            </div>
            <div className="preview-row">
              <span>Assessed Condition</span>
              <strong style={{ textTransform: "uppercase" }}>{returnReceipt.condition}</strong>
            </div>
            <div className="preview-row">
              <span>Overdue Days</span>
              <strong style={{ color: returnReceipt.overdueDays > 0 ? "var(--red)" : "inherit" }}>
                {returnReceipt.overdueDays} Days (${returnReceipt.overdueFee}.00)
              </strong>
            </div>
            {returnReceipt.damageFee > 0 && (
              <div className="preview-row">
                <span>Material Assessment Penalty</span>
                <strong style={{ color: "var(--red)" }}>${returnReceipt.damageFee}.00</strong>
              </div>
            )}
            <div className="preview-row">
              <span>Total Fine Applied</span>
              <strong
                style={{
                  fontSize: "16px",
                  color: returnReceipt.totalFine > 0 ? "var(--red)" : "var(--green)",
                }}
              >
                ${returnReceipt.totalFine}.00 {returnReceipt.totalFine === 0 ? "(Clean Return)" : ""}
              </strong>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="primary gold-btn" onClick={handleReset}>
              Process Another Return
            </button>
            <button className="secondary" onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="workflow-card">
          <form onSubmit={handleReturnSubmit}>
            <div className="workflow-grid">
              {/* LEFT COLUMN */}
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", color: "var(--navy)", marginBottom: "16px" }}>
                  Scan / Lookup Return Item
                </h3>

                <div className="field-group">
                  <label>Copy Barcode</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      value={copyBarcode}
                      onChange={(e) => setCopyBarcode(e.target.value)}
                      placeholder="e.g. CP-11842"
                      required
                    />
                    <select
                      style={{ width: "auto" }}
                      onChange={(e) => setCopyBarcode(e.target.value)}
                      value={copyBarcode}
                    >
                      <option value="">Choose active loan...</option>
                      {data.loans
                        .filter((l) => l.status === "Active" || l.status === "Overdue")
                        .map((l) => (
                          <option key={l.id} value={l.copyBarcode}>
                            {l.copyBarcode} - {l.bookTitle} ({l.studentName})
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="field-group">
                  <label>Physical Condition Assessment</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                    {[
                      { key: "Excellent", label: "Excellent (Like New)", fine: 0 },
                      { key: "Good", label: "Good (Normal wear)", fine: 0 },
                      { key: "Worn", label: "Worn (Creased/Cover marks)", fine: 0 },
                      { key: "Damaged", label: "Damaged (Torn/Watermark)", fine: 20 },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.key}
                        className={condition === item.key ? "primary gold-btn" : "secondary"}
                        style={{ padding: "10px", textAlign: "left", fontSize: "12.5px" }}
                        onClick={() => setCondition(item.key)}
                      >
                        <strong>{item.key}</strong>
                        {item.fine > 0 && <small style={{ display: "block", color: "var(--red)" }}>+${item.fine} fee</small>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field-group">
                  <label>Condition Notes / Assessment Audit</label>
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Spine intact, binding solid, returned on time"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", color: "var(--navy)", marginBottom: "16px" }}>
                  Circulation Audit & Fine Calculation
                </h3>

                <div className="preview-box">
                  <div className="preview-row">
                    <span>Active Loan</span>
                    {activeLoan ? (
                      <span className={`badge ${activeLoan.status === "Overdue" ? "red" : "green"}`}>
                        {activeLoan.studentName} ({activeLoan.studentId})
                      </span>
                    ) : (
                      <span style={{ color: "var(--muted)" }}>No loan record or walk-in copy</span>
                    )}
                  </div>

                  <div className="preview-row">
                    <span>Volume Title</span>
                    <strong>{targetBook ? targetBook.title : targetCopy?.bookTitle || "—"}</strong>
                  </div>

                  <div className="preview-row">
                    <span>Issue Date</span>
                    <strong>{activeLoan ? activeLoan.issueDate : "—"}</strong>
                  </div>

                  <div className="preview-row">
                    <span>Due Date</span>
                    <strong style={{ color: overdueDays > 0 ? "var(--red)" : "inherit" }}>
                      {activeLoan ? activeLoan.dueDate : "—"}
                    </strong>
                  </div>

                  <div className="preview-row">
                    <span>Overdue Penalty</span>
                    <strong style={{ color: overdueDays > 0 ? "var(--red)" : "var(--green)" }}>
                      {overdueDays > 0 ? `${overdueDays} days late × $2 = $${overdueFee}.00` : "$0.00 (On schedule)"}
                    </strong>
                  </div>

                  <div className="preview-row">
                    <span>Condition Assessment Fee</span>
                    <strong style={{ color: damageFee > 0 ? "var(--red)" : "var(--green)" }}>
                      ${damageFee}.00 ({condition})
                    </strong>
                  </div>

                  <div className="preview-row" style={{ borderTop: "2px solid var(--line)" }}>
                    <span style={{ fontWeight: 700 }}>Total Balance Due</span>
                    <strong
                      style={{
                        fontSize: "18px",
                        color: totalFine > 0 ? "var(--red)" : "var(--green)",
                      }}
                    >
                      ${totalFine}.00
                    </strong>
                  </div>
                </div>

                {errors.length > 0 && (
                  <div
                    style={{
                      marginTop: "16px",
                      padding: "12px",
                      background: "var(--red-bg)",
                      color: "var(--red)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "13px",
                    }}
                  >
                    {errors.join(", ")}
                  </div>
                )}

                <div style={{ marginTop: "24px" }}>
                  <button
                    type="submit"
                    className="primary gold-btn"
                    style={{ width: "100%", padding: "12px", fontSize: "15px" }}
                  >
                    <RotateCcw size={16} /> Confirm Physical Return & Restock →
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
