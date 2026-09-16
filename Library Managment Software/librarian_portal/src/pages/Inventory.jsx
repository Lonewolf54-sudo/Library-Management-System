import { Boxes, PackagePlus, QrCode } from "lucide-react";
import { useState } from "react";
import DataTable from "../components/DataTable.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Inventory() {
  const { data, setModal, updateCopyStatus } = useLibrary();
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCopies = statusFilter === "All"
    ? data.copies
    : data.copies.filter((c) => c.status.toLowerCase() === statusFilter.toLowerCase());

  const columns = [
    {
      label: "Copy Barcode",
      render: (item) => (
        <span style={{ fontFamily: "var(--mono)", fontWeight: 700, color: "var(--navy)", fontSize: "13px" }}>
          {item.barcode}
        </span>
      ),
    },
    {
      label: "Catalog Volume Title",
      render: (item) => (
        <strong style={{ color: "var(--ink)", fontSize: "13.5px" }}>{item.bookTitle}</strong>
      ),
    },
    {
      label: "Shelf Placement",
      render: (item) => (
        <span style={{ fontFamily: "var(--mono)", fontSize: "12px", background: "var(--paper-deep)", padding: "2px 6px", borderRadius: "4px" }}>
          {item.shelf}
        </span>
      ),
    },
    {
      label: "Condition",
      render: (item) => (
        <span
          className={`badge ${
            item.condition === "Excellent" || item.condition === "Good"
              ? "green"
              : item.condition === "Worn"
              ? "amber"
              : "red"
          }`}
        >
          {item.condition}
        </span>
      ),
    },
    {
      label: "Circulation Status",
      render: (item) => (
        <select
          value={item.status}
          onChange={(e) => updateCopyStatus(item.barcode, e.target.value, item.condition)}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            height: "30px",
            borderRadius: "var(--radius-sm)",
            fontWeight: 600,
            color: item.status === "Available" ? "var(--green)" : item.status === "Issued" ? "var(--blue)" : "var(--red)",
          }}
        >
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Lost">Lost</option>
        </select>
      ),
    },
    {
      label: "Acquisition Date",
      key: "acquired",
    },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Physical Inventory</span>
          <h1>Copies & Barcode Inventory</h1>
          <p>Track distinct physical volumes, RFID/barcode tags, shelf locations, wear conditions, and maintenance flags.</p>
        </div>
        <div className="header-actions">
          <button className="secondary" onClick={() => setModal({ type: "quickScan" })}>
            <QrCode size={15} /> Laser Scan
          </button>
          <button className="primary gold-btn" onClick={() => setModal({ type: "addCopy" })}>
            <PackagePlus size={15} /> Add Copy Barcode
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {["All", "Available", "Issued", "Maintenance"].map((st) => (
          <button
            key={st}
            className={statusFilter === st ? "primary gold-btn" : "secondary"}
            style={{ padding: "6px 14px", fontSize: "12.5px" }}
            onClick={() => setStatusFilter(st)}
          >
            {st} Copies
          </button>
        ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Physical Copies Roster ({filteredCopies.length})</h2>
        </div>
        <div className="panel-body">
          <DataTable
            columns={columns}
            data={filteredCopies}
            searchPlaceholder="Search barcode, title, or shelf code..."
          />
        </div>
      </div>
    </div>
  );
}
