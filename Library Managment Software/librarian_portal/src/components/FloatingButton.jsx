import { BookPlus, Plus, QrCode, UserPlus } from "lucide-react";
import { useState } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function FloatingButton() {
  const { setModal } = useLibrary();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 120 }}>
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "64px",
            right: "0",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-end",
          }}
        >
          <button
            className="secondary"
            style={{
              background: "#ffffff",
              boxShadow: "var(--shadow-md)",
              whiteSpace: "nowrap",
              fontSize: "13px",
            }}
            onClick={() => {
              setOpen(false);
              setModal({ type: "quickScan" });
            }}
          >
            <QrCode size={16} /> Quick Barcode Scan
          </button>
          <button
            className="secondary"
            style={{
              background: "#ffffff",
              boxShadow: "var(--shadow-md)",
              whiteSpace: "nowrap",
              fontSize: "13px",
            }}
            onClick={() => {
              setOpen(false);
              setModal({ type: "addBook" });
            }}
          >
            <BookPlus size={16} /> Catalog New Book
          </button>
          <button
            className="secondary"
            style={{
              background: "#ffffff",
              boxShadow: "var(--shadow-md)",
              whiteSpace: "nowrap",
              fontSize: "13px",
            }}
            onClick={() => {
              setOpen(false);
              setModal({ type: "addStudent" });
            }}
          >
            <UserPlus size={16} /> Register Student
          </button>
        </div>
      )}

      <button
        className="fab"
        title="Quick Actions"
        style={{
          position: "static",
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform 0.2s ease",
        }}
        onClick={() => setOpen(!open)}
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
