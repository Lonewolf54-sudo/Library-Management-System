import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  QrCode,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function IssueBook() {
  const { data, issueBook } = useLibrary();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("ST-8821");
  const [copyBarcode, setCopyBarcode] = useState("CP-20491");
  const [duration, setDuration] = useState(14);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState([]);
  const [successLoan, setSuccessLoan] = useState(null);

  const selectedStudent = data.students.find(
    (s) => s.id.toLowerCase() === studentId.trim().toLowerCase()
  );
  const selectedCopy = data.copies.find(
    (c) => c.barcode.toLowerCase() === copyBarcode.trim().toLowerCase()
  );
  const selectedBook = selectedCopy
    ? data.books.find((b) => b.id === selectedCopy.bookId)
    : null;

  // Validation conditions
  const isStudentValid = Boolean(selectedStudent && selectedStudent.status === "Active");
  const isQuotaAvailable = Boolean(selectedStudent && selectedStudent.activeLoans < selectedStudent.limit);
  const isCopyAvailable = Boolean(selectedCopy && selectedCopy.status === "Available");
  const isFinesClear = Boolean(selectedStudent && selectedStudent.fine < 20);

  const canIssue = isStudentValid && isQuotaAvailable && isCopyAvailable && isFinesClear;

  function handleIssueSubmit(e) {
    e.preventDefault();
    setErrors([]);

    const res = issueBook(studentId, copyBarcode, duration, notes);
    if (!res.ok) {
      setErrors(res.errors);
    } else {
      setSuccessLoan(res.loan);
    }
  }

  function handleReset() {
    setSuccessLoan(null);
    setCopyBarcode("");
    setErrors([]);
  }

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Desk Circulation</span>
          <h1>Issue Book Circulation</h1>
          <p>Scan student borrower identification, verify copy barcode, inspect loan limits, and complete loan checkout.</p>
        </div>
      </div>

      {/* 4-STEP WIZARD PROGRESS */}
      <div className="wizard-steps">
        <div className={`step-card ${selectedStudent ? "complete" : "active"}`}>
          <div className="step-num">1</div>
          <div className="step-info">
            <strong>Student Scan</strong>
            <small>{selectedStudent ? `${selectedStudent.id} • Verified` : "Scan student card"}</small>
          </div>
        </div>

        <div className={`step-card ${selectedCopy ? "complete" : selectedStudent ? "active" : ""}`}>
          <div className="step-num">2</div>
          <div className="step-info">
            <strong>Copy Barcode</strong>
            <small>{selectedCopy ? `${selectedCopy.barcode} • Found` : "Scan physical barcode"}</small>
          </div>
        </div>

        <div className={`step-card ${canIssue ? "complete" : selectedCopy ? "active" : ""}`}>
          <div className="step-num">3</div>
          <div className="step-info">
            <strong>Policy Check</strong>
            <small>{canIssue ? "All policies cleared" : "Verifying eligibility"}</small>
          </div>
        </div>

        <div className={`step-card ${successLoan ? "complete" : canIssue ? "active" : ""}`}>
          <div className="step-num">4</div>
          <div className="step-info">
            <strong>Checkout</strong>
            <small>{successLoan ? "Issued successfully" : "Confirm terms"}</small>
          </div>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION RECEIPT */}
      {successLoan ? (
        <div className="workflow-card" style={{ background: "#f0fdf4", borderColor: "var(--green)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <CheckCircle2 size={32} color="var(--green)" />
            <div>
              <h2 style={{ fontFamily: "var(--serif)", color: "var(--green)", margin: 0 }}>
                Loan Successfully Dispatched!
              </h2>
              <p style={{ fontSize: "14px", color: "#14532d", margin: "2px 0 0" }}>
                Loan ID: <b>{successLoan.id}</b> • Physical copy handed to borrower.
              </p>
            </div>
          </div>

          <div className="preview-box" style={{ background: "white", margin: "20px 0" }}>
            <div className="preview-row">
              <span>Borrower Student</span>
              <strong>{successLoan.studentName} ({successLoan.studentId})</strong>
            </div>
            <div className="preview-row">
              <span>Book Title</span>
              <strong>{successLoan.bookTitle}</strong>
            </div>
            <div className="preview-row">
              <span>Physical Barcode</span>
              <strong>{successLoan.copyBarcode}</strong>
            </div>
            <div className="preview-row">
              <span>Issue Date</span>
              <strong>{successLoan.issueDate}</strong>
            </div>
            <div className="preview-row">
              <span>Return Due Date</span>
              <strong style={{ color: "var(--blue)" }}>{successLoan.dueDate}</strong>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="primary gold-btn" onClick={handleReset}>
              Issue Another Book
            </button>
            <button className="secondary" onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="workflow-card">
          <form onSubmit={handleIssueSubmit}>
            <div className="workflow-grid">
              {/* LEFT COLUMN: INPUTS */}
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", color: "var(--navy)", marginBottom: "16px" }}>
                  Borrower & Copy Selection
                </h3>

                <div className="field-group">
                  <label>Student ID / Scan Identification Card</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. ST-8821"
                      required
                    />
                    <select
                      style={{ width: "auto" }}
                      onChange={(e) => setStudentId(e.target.value)}
                      value={studentId}
                    >
                      <option value="">Choose student...</option>
                      {data.students.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field-group">
                  <label>Copy Barcode / Laser Scan</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      value={copyBarcode}
                      onChange={(e) => setCopyBarcode(e.target.value)}
                      placeholder="e.g. CP-20491"
                      required
                    />
                    <select
                      style={{ width: "auto" }}
                      onChange={(e) => setCopyBarcode(e.target.value)}
                      value={copyBarcode}
                    >
                      <option value="">Select available...</option>
                      {data.copies
                        .filter((c) => c.status === "Available")
                        .map((c) => (
                          <option key={c.barcode} value={c.barcode}>
                            {c.barcode} - {c.bookTitle}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="field-group">
                  <label>Loan Duration Terms</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                    {[
                      { days: 7, label: "7 Days (Express)" },
                      { days: 14, label: "14 Days (Standard)" },
                      { days: 28, label: "28 Days (Research)" },
                    ].map(({ days, label }) => (
                      <button
                        type="button"
                        key={days}
                        className={duration === days ? "primary gold-btn" : "secondary"}
                        style={{ padding: "8px", fontSize: "12px" }}
                        onClick={() => setDuration(days)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field-group">
                  <label>Circulation Notes / Remarks</label>
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Special reference copy exemption"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: REAL-TIME VERIFICATION & PREVIEW */}
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", color: "var(--navy)", marginBottom: "16px" }}>
                  Verification & Desk Clearance
                </h3>

                <div className="preview-box">
                  <div className="preview-row">
                    <span>Borrower Status</span>
                    {selectedStudent ? (
                      <span className={`badge ${selectedStudent.status === "Active" ? "green" : "red"}`}>
                        {selectedStudent.name} • {selectedStudent.status}
                      </span>
                    ) : (
                      <span style={{ color: "var(--muted)" }}>Awaiting ID scan</span>
                    )}
                  </div>

                  <div className="preview-row">
                    <span>Borrowing Quota</span>
                    {selectedStudent ? (
                      <strong>
                        {selectedStudent.activeLoans} / {selectedStudent.limit} Active Loans
                      </strong>
                    ) : (
                      <span style={{ color: "var(--muted)" }}>—</span>
                    )}
                  </div>

                  <div className="preview-row">
                    <span>Target Volume</span>
                    {selectedBook ? (
                      <strong style={{ maxWidth: "220px", textAlign: "right" }}>{selectedBook.title}</strong>
                    ) : (
                      <span style={{ color: "var(--muted)" }}>Awaiting barcode</span>
                    )}
                  </div>

                  <div className="preview-row">
                    <span>Shelf Placement</span>
                    {selectedCopy ? (
                      <strong>{selectedCopy.shelf}</strong>
                    ) : (
                      <span style={{ color: "var(--muted)" }}>—</span>
                    )}
                  </div>

                  <div className="preview-row">
                    <span>Calculated Due Date</span>
                    <strong style={{ color: "var(--blue)" }}>
                      {new Date(Date.now() + duration * 86400000).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
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
                    <strong>Clearance Blocked:</strong>
                    <ul style={{ paddingLeft: "18px", marginTop: "4px" }}>
                      {errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ marginTop: "24px" }}>
                  <button
                    type="submit"
                    className="primary gold-btn"
                    style={{ width: "100%", padding: "12px", fontSize: "15px" }}
                    disabled={!canIssue}
                  >
                    <BookOpen size={16} /> Authorize & Issue Physical Copy →
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
