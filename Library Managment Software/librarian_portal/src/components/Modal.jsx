import {
  AlertTriangle,
  BookOpen,
  Boxes,
  CheckCircle,
  Clock,
  DollarSign,
  Info,
  LogOut,
  QrCode,
  Shield,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Modal() {
  const { modal, setModal, data, addBook, addCopy, addStudent, collectFine, waiveFine, addShelf } =
    useLibrary();
  const navigate = useNavigate();

  if (!modal) return null;
  const close = () => setModal(null);

  let content = null;

  switch (modal.type) {
    case "quickScan":
      content = <QuickScanModal close={close} navigate={navigate} data={data} />;
      break;
    case "notifications":
      content = <NotificationsModal close={close} navigate={navigate} alerts={data.alerts} />;
      break;
    case "profile":
      content = <ProfileModal close={close} />;
      break;
    case "activity":
      content = <ActivityModal close={close} logs={data.activityLog} />;
      break;
    case "logout":
      content = <LogoutModal close={close} navigate={navigate} />;
      break;
    case "addBook":
      content = <AddBookModal close={close} addBook={addBook} />;
      break;
    case "addCopy":
      content = <AddCopyModal close={close} addCopy={addCopy} books={data.books} preselectedBookId={modal.bookId} />;
      break;
    case "addStudent":
      content = <AddStudentModal close={close} addStudent={addStudent} />;
      break;
    case "collectFine":
      content = <CollectFineModal close={close} fine={modal.fine} collectFine={collectFine} />;
      break;
    case "waiveFine":
      content = <WaiveFineModal close={close} fine={modal.fine} waiveFine={waiveFine} />;
      break;
    case "addShelf":
      content = <AddShelfModal close={close} addShelf={addShelf} />;
      break;
    case "bookDetail":
      content = <BookDetailModal close={close} book={modal.book} copies={data.copies.filter(c => c.bookId === modal.book.id)} navigate={navigate} />;
      break;
    case "studentDetail":
      content = (
        <StudentDetailModal
          close={close}
          student={modal.student}
          loans={data.loans.filter((l) => l.studentId === modal.student.id && l.status !== "Returned")}
          fines={data.fines.filter((f) => f.studentId === modal.student.id && f.status === "Unpaid")}
          navigate={navigate}
        />
      );
      break;
    default:
      content = <div>Unknown modal</div>;
  }

  return (
    <div className="modalBackdrop" onClick={close}>
      <section className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={close}>
          <X size={18} />
        </button>
        {content}
      </section>
    </div>
  );
}

function QuickScanModal({ close, navigate, data }) {
  const [barcode, setBarcode] = useState("CP-20491");
  const [result, setResult] = useState(null);

  function handleScan() {
    const copy = data.copies.find((c) => c.barcode.toLowerCase() === barcode.trim().toLowerCase());
    if (copy) {
      const book = data.books.find((b) => b.id === copy.bookId);
      setResult({ ok: true, copy, book });
    } else {
      setResult({ ok: false, message: `Barcode "${barcode}" not registered in archive inventory.` });
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <QrCode size={24} color="var(--gold-dark)" />
        <h2 style={{ margin: 0 }}>Desk Barcode Scanner</h2>
      </div>
      <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "18px" }}>
        Simulate instant laser optical barcode scanning for book copies or student identity cards.
      </p>

      <div className="field-group">
        <label>Barcode / Identifier</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="e.g. CP-20491 or ST-8821"
            autoFocus
          />
          <button className="primary gold-btn" onClick={handleScan}>
            Lookup
          </button>
        </div>
      </div>

      {result && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            borderRadius: "var(--radius-md)",
            background: result.ok ? "var(--green-bg)" : "var(--red-bg)",
            color: result.ok ? "var(--green)" : "var(--red)",
          }}
        >
          {result.ok ? (
            <div>
              <strong style={{ display: "block", fontSize: "14px" }}>
                Found: {result.book?.title || "Item"}
              </strong>
              <div style={{ fontSize: "12.5px", marginTop: "6px", color: "var(--ink-secondary)" }}>
                Barcode: <b>{result.copy.barcode}</b> • Shelf: <b>{result.copy.shelf}</b> • Status:{" "}
                <b>{result.copy.status}</b>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button
                  className="primary"
                  style={{ padding: "6px 12px", fontSize: "12px" }}
                  onClick={() => {
                    close();
                    navigate("/issue");
                  }}
                >
                  Issue this Copy
                </button>
                <button
                  className="secondary"
                  style={{ padding: "6px 12px", fontSize: "12px" }}
                  onClick={() => {
                    close();
                    navigate("/return");
                  }}
                >
                  Return Desk
                </button>
              </div>
            </div>
          ) : (
            <div>
              <strong>Lookup Error</strong>
              <p style={{ fontSize: "12.5px", marginTop: "4px" }}>{result.message}</p>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: "22px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>
          Quick Test Barcodes
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
          {["CP-20491", "CP-20492", "CP-11842", "CP-70014", "CP-33101"].map((code) => (
            <button
              key={code}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11.5px",
                padding: "4px 8px",
                background: "var(--paper-deep)",
                borderRadius: "4px",
              }}
              onClick={() => setBarcode(code)}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsModal({ close, navigate, alerts = [] }) {
  return (
    <div>
      <h2>Operational System Alerts</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`alert-card ${a.type}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              close();
              navigate(a.target);
            }}
          >
            <div>
              <strong>{a.title}</strong>
              <p>{a.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileModal({ close }) {
  return (
    <div>
      <h2>Librarian Profile</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "16px 0" }}>
        <div
          className="avatar"
          style={{ width: "56px", height: "56px", fontSize: "20px" }}
        >
          EV
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", color: "var(--navy)" }}>
            Prof. Elena Vance
          </h3>
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>
            Chief Librarian & University Archivist
          </p>
          <span className="badge green" style={{ marginTop: "4px" }}>
            Active Session
          </span>
        </div>
      </div>
      <div className="preview-box">
        <div className="preview-row">
          <span>Staff ID</span>
          <strong>LIB-98234</strong>
        </div>
        <div className="preview-row">
          <span>Desk Assignment</span>
          <strong>Central Circulation Desk (Terminal #04)</strong>
        </div>
        <div className="preview-row">
          <span>Access Level</span>
          <strong>Super-Administrator / Full Circulation Rights</strong>
        </div>
        <div className="preview-row">
          <span>Authentication</span>
          <strong>2FA Security Key Enabled</strong>
        </div>
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button className="primary" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}

function ActivityModal({ close, logs = [] }) {
  return (
    <div>
      <h2>Desk Audit Trail</h2>
      <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px" }}>
        Real-time chronological activity logged during current session.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "360px", overflowY: "auto" }}>
        {logs.map((log, idx) => (
          <div
            key={idx}
            style={{
              padding: "10px 14px",
              background: "var(--paper)",
              borderRadius: "var(--radius-sm)",
              borderLeft: "3px solid var(--gold)",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Clock size={14} color="var(--muted)" />
            <span>{log}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button className="primary" onClick={close}>
          Done
        </button>
      </div>
    </div>
  );
}

function LogoutModal({ close, navigate }) {
  return (
    <div>
      <h2>Confirm Sign Out</h2>
      <p style={{ fontSize: "14px", color: "var(--ink-secondary)", margin: "14px 0 24px" }}>
        Are you sure you want to end your librarian workstation session? Any unsaved desk drafts will be cleared.
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button className="secondary" onClick={close}>
          Cancel
        </button>
        <button
          className="primary"
          style={{ background: "var(--red)" }}
          onClick={() => {
            sessionStorage.removeItem("archive-librarian-auth");
            close();
            navigate("/login");
          }}
        >
          <LogOut size={16} /> Sign Out Workstation
        </button>
      </div>
    </div>
  );
}

function AddBookModal({ close, addBook }) {
  const [form, setForm] = useState({
    title: "",
    isbn: "",
    author: "",
    publisher: "",
    category: "Computer Science",
    edition: "1st Edition",
    year: "2024",
    shelf: "CS-01",
    copies: 3,
    description: "",
  });
  const [error, setError] = useState("");

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  function handleSubmit(e) {
    e.preventDefault();
    const res = addBook(form);
    if (!res.ok) {
      setError(res.errors.join(", "));
    } else {
      close();
    }
  }

  return (
    <div>
      <h2>Catalog New Academic Volume</h2>
      {error && (
        <div style={{ padding: "10px 14px", background: "var(--red-bg)", color: "var(--red)", borderRadius: "var(--radius-sm)", marginBottom: "14px", fontSize: "13px" }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div className="field-group" style={{ gridColumn: "span 2" }}>
            <label>Book Title *</label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)} required placeholder="e.g. Structure and Interpretation of Computer Programs" />
          </div>
          <div className="field-group">
            <label>ISBN (13-Digit) *</label>
            <input value={form.isbn} onChange={(e) => update("isbn", e.target.value)} required placeholder="978-0262510875" />
          </div>
          <div className="field-group">
            <label>Primary Author(s) *</label>
            <input value={form.author} onChange={(e) => update("author", e.target.value)} required placeholder="Harold Abelson, Gerald Jay Sussman" />
          </div>
          <div className="field-group">
            <label>Publisher</label>
            <input value={form.publisher} onChange={(e) => update("publisher", e.target.value)} placeholder="MIT Press" />
          </div>
          <div className="field-group">
            <label>Category / Field</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)}>
              <option>Computer Science</option>
              <option>AI & Data</option>
              <option>Software Engineering</option>
              <option>Mathematics</option>
              <option>Business</option>
              <option>Science</option>
              <option>Law</option>
              <option>Arts & Humanities</option>
            </select>
          </div>
          <div className="field-group">
            <label>Shelf Location</label>
            <select value={form.shelf} onChange={(e) => update("shelf", e.target.value)}>
              <option value="CS-01">CS-01 (CompSci North)</option>
              <option value="CS-02">CS-02 (Software Eng)</option>
              <option value="AI-04">AI-04 (AI & Robotics)</option>
              <option value="BUS-01">BUS-01 (Business)</option>
              <option value="SCI-03">SCI-03 (Sciences)</option>
              <option value="ENG-02">ENG-02 (Engineering)</option>
              <option value="LAW-01">LAW-01 (Law)</option>
              <option value="MATH-03">MATH-03 (Math)</option>
            </select>
          </div>
          <div className="field-group">
            <label>Initial Physical Copies</label>
            <input type="number" min="1" max="50" value={form.copies} onChange={(e) => update("copies", e.target.value)} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button type="button" className="secondary" onClick={close}>Cancel</button>
          <button type="submit" className="primary gold-btn">Register Title & Generate Barcodes</button>
        </div>
      </form>
    </div>
  );
}

function AddCopyModal({ close, addCopy, books = [], preselectedBookId }) {
  const [bookId, setBookId] = useState(preselectedBookId || (books[0]?.id || ""));
  const [barcode, setBarcode] = useState(`CP-${Math.floor(10000 + Math.random() * 90000)}`);
  const [condition, setCondition] = useState("Excellent");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const res = addCopy({ bookId, barcode, condition });
    if (!res.ok) setError(res.errors.join(", "));
    else close();
  }

  return (
    <div>
      <h2>Add Physical Copy Barcode</h2>
      {error && <div style={{ padding: "10px", background: "var(--red-bg)", color: "var(--red)", marginBottom: "12px" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label>Target Catalog Title</label>
          <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
            {books.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title} (ISBN: {b.isbn})
              </option>
            ))}
          </select>
        </div>
        <div className="field-group">
          <label>Barcode ID</label>
          <input value={barcode} onChange={(e) => setBarcode(e.target.value)} required />
        </div>
        <div className="field-group">
          <label>Physical Condition</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option>Excellent</option>
            <option>Good</option>
            <option>Worn</option>
            <option>Fair</option>
          </select>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" }}>
          <button type="button" className="secondary" onClick={close}>Cancel</button>
          <button type="submit" className="primary">Add Copy</button>
        </div>
      </form>
    </div>
  );
}

function AddStudentModal({ close, addStudent }) {
  const [form, setForm] = useState({
    id: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
    name: "",
    department: "Computer Science",
    email: "",
    phone: "+1 (555) ",
    year: "1st Year UG",
  });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const res = addStudent(form);
    if (!res.ok) setError(res.errors.join(", "));
    else close();
  }

  return (
    <div>
      <h2>Register Student Borrower Account</h2>
      {error && <div style={{ padding: "10px", background: "var(--red-bg)", color: "var(--red)", marginBottom: "12px" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div className="field-group">
            <label>Student ID *</label>
            <input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required />
          </div>
          <div className="field-group">
            <label>Full Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Maya Lin" />
          </div>
          <div className="field-group">
            <label>Academic Department</label>
            <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
              <option>Computer Science</option>
              <option>Economics & Business</option>
              <option>Visual Arts & Humanities</option>
              <option>Physics & Astronomy</option>
              <option>Biochemistry</option>
              <option>Law</option>
              <option>Architecture & Design</option>
            </select>
          </div>
          <div className="field-group">
            <label>Academic Standing</label>
            <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
              <option>1st Year UG</option>
              <option>2nd Year UG</option>
              <option>3rd Year UG</option>
              <option>4th Year UG</option>
              <option>Postgrad MSc</option>
              <option>PhD Candidate</option>
            </select>
          </div>
          <div className="field-group" style={{ gridColumn: "span 2" }}>
            <label>Institutional Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="student@archive.edu" />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" }}>
          <button type="button" className="secondary" onClick={close}>Cancel</button>
          <button type="submit" className="primary gold-btn">Create Borrower Profile</button>
        </div>
      </form>
    </div>
  );
}

function CollectFineModal({ close, fine, collectFine }) {
  const [method, setMethod] = useState("Cash");
  if (!fine) return null;

  return (
    <div>
      <h2>Collect Fine Payment</h2>
      <div className="preview-box" style={{ margin: "16px 0" }}>
        <div className="preview-row">
          <span>Student</span>
          <strong>{fine.studentName} ({fine.studentId})</strong>
        </div>
        <div className="preview-row">
          <span>Material</span>
          <strong>{fine.book}</strong>
        </div>
        <div className="preview-row">
          <span>Outstanding Balance</span>
          <strong style={{ color: "var(--red)", fontSize: "16px" }}>${fine.amount}.00</strong>
        </div>
      </div>
      <div className="field-group">
        <label>Payment Tender Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>Cash at Desk</option>
          <option>Student Digital Wallet (ID Tap)</option>
          <option>Credit / Debit Card</option>
          <option>Department Bursary Billing</option>
        </select>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
        <button className="secondary" onClick={close}>Cancel</button>
        <button
          className="primary gold-btn"
          onClick={() => {
            collectFine(fine.id, method);
            close();
          }}
        >
          <DollarSign size={16} /> Confirm ${fine.amount}.00 Payment
        </button>
      </div>
    </div>
  );
}

function WaiveFineModal({ close, fine, waiveFine }) {
  const [reason, setReason] = useState("Academic appeal approved");
  if (!fine) return null;

  return (
    <div>
      <h2>Waive Library Penalty</h2>
      <p style={{ fontSize: "13px", color: "var(--muted)", margin: "12px 0" }}>
        Waiving will cancel the outstanding ${fine.amount} fine for {fine.studentName}.
      </p>
      <div className="field-group">
        <label>Administrative Reason for Waiver</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option>Academic appeal approved</option>
          <option>System glitch / grace period adjustment</option>
          <option>Medical exemption provided</option>
          <option>Department dean waiver</option>
        </select>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" }}>
        <button className="secondary" onClick={close}>Cancel</button>
        <button
          className="primary"
          style={{ background: "var(--amber)" }}
          onClick={() => {
            waiveFine(fine.id, reason);
            close();
          }}
        >
          Authorize Waiver
        </button>
      </div>
    </div>
  );
}

function AddShelfModal({ close, addShelf }) {
  const [form, setForm] = useState({ id: "", section: "", capacity: 50, rack: "Rack A", floor: "Level 1" });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const res = addShelf(form);
    if (!res.ok) setError(res.errors.join(", "));
    else close();
  }

  return (
    <div>
      <h2>Configure New Shelf Location</h2>
      {error && <div style={{ padding: "10px", background: "var(--red-bg)", color: "var(--red)", marginBottom: "12px" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div className="field-group">
            <label>Shelf Code *</label>
            <input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required placeholder="e.g. BIO-02" />
          </div>
          <div className="field-group">
            <label>Section Field *</label>
            <input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} required placeholder="e.g. Biophysics" />
          </div>
          <div className="field-group">
            <label>Capacity (Volumes)</label>
            <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
          </div>
          <div className="field-group">
            <label>Floor / Wing</label>
            <input value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} placeholder="Level 2 West" />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" }}>
          <button type="button" className="secondary" onClick={close}>Cancel</button>
          <button type="submit" className="primary">Create Shelf</button>
        </div>
      </form>
    </div>
  );
}

function BookDetailModal({ close, book, copies = [], navigate }) {
  if (!book) return null;
  return (
    <div>
      <span className="badge blue" style={{ marginBottom: "8px" }}>{book.category}</span>
      <h2 style={{ marginBottom: "4px" }}>{book.title}</h2>
      <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "16px" }}>
        By <b>{book.author}</b> • {book.publisher} ({book.year}) • {book.edition}
      </p>
      <div className="preview-box" style={{ marginBottom: "18px" }}>
        <div className="preview-row"><span>ISBN</span><strong>{book.isbn}</strong></div>
        <div className="preview-row"><span>Shelf Placement</span><strong>{book.shelf} ({book.rack})</strong></div>
        <div className="preview-row"><span>Inventory</span><strong>{book.available} Available / {book.copies} Total</strong></div>
        <p style={{ fontSize: "13px", color: "var(--ink-secondary)", marginTop: "8px" }}>{book.description}</p>
      </div>

      <h3>Physical Copy Barcodes ({copies.length})</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "10px 0 20px" }}>
        {copies.map((c) => (
          <span
            key={c.barcode}
            style={{
              padding: "6px 10px",
              background: c.status === "Available" ? "var(--green-bg)" : "var(--paper-deep)",
              color: c.status === "Available" ? "var(--green)" : "var(--ink)",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              borderRadius: "4px",
              border: "1px solid var(--line)",
            }}
          >
            {c.barcode} ({c.status})
          </span>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button className="secondary" onClick={close}>Close</button>
        <button
          className="primary gold-btn"
          onClick={() => {
            close();
            navigate("/issue");
          }}
        >
          Issue Copy at Desk
        </button>
      </div>
    </div>
  );
}

function StudentDetailModal({ close, student, loans = [], fines = [], navigate }) {
  if (!student) return null;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2>{student.name}</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>
            ID: <b>{student.id}</b> • {student.department} ({student.year})
          </p>
        </div>
        <span className={`badge ${student.status === "Active" ? "green" : "red"}`}>{student.status}</span>
      </div>

      <div className="preview-box" style={{ margin: "16px 0" }}>
        <div className="preview-row"><span>Email</span><strong>{student.email}</strong></div>
        <div className="preview-row"><span>Active Loans</span><strong>{student.activeLoans} / {student.limit}</strong></div>
        <div className="preview-row"><span>Total Books Borrowed</span><strong>{student.totalBorrowed}</strong></div>
        <div className="preview-row"><span>Outstanding Fine</span><strong style={{ color: student.fine > 0 ? "var(--red)" : "inherit" }}>${student.fine}.00</strong></div>
      </div>

      <h3>Current Active Loans ({loans.length})</h3>
      {loans.length === 0 ? (
        <p style={{ fontSize: "13px", color: "var(--muted)", margin: "8px 0 16px" }}>No active borrowed items.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "8px 0 16px" }}>
          {loans.map((l) => (
            <div key={l.id} style={{ padding: "8px 12px", background: "var(--paper)", borderRadius: "4px", fontSize: "13px", display: "flex", justifyContent: "space-between" }}>
              <span><b>{l.copyBarcode}</b>: {l.bookTitle}</span>
              <span style={{ fontFamily: "var(--mono)", color: l.status === "Overdue" ? "var(--red)" : "var(--muted)" }}>Due: {l.dueDate}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button className="secondary" onClick={close}>Close</button>
        <button
          className="primary"
          onClick={() => {
            close();
            navigate("/issue");
          }}
        >
          Issue New Book
        </button>
      </div>
    </div>
  );
}
