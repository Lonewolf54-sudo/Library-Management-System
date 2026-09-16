import { Boxes, Building2, MapPin, Plus } from "lucide-react";
import DataTable from "../components/DataTable.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Shelves() {
  const { data, setModal } = useLibrary();

  const columns = [
    {
      label: "Shelf Code",
      render: (item) => (
        <span
          style={{
            fontFamily: "var(--mono)",
            fontWeight: 700,
            fontSize: "13px",
            color: "var(--navy)",
            background: "var(--gold-light)",
            padding: "3px 8px",
            borderRadius: "4px",
            border: "1px solid var(--gold)",
          }}
        >
          {item.id}
        </span>
      ),
    },
    {
      label: "Academic Section",
      render: (item) => (
        <strong style={{ color: "var(--ink)", fontSize: "14px" }}>{item.section}</strong>
      ),
    },
    {
      label: "Floor / Wing Placement",
      render: (item) => (
        <span style={{ fontSize: "13px", color: "var(--ink-secondary)" }}>
          <MapPin size={13} style={{ verticalAlign: "middle", marginRight: "4px" }} />
          {item.floor}
        </span>
      ),
    },
    {
      label: "Rack Allocation",
      key: "rack",
    },
    {
      label: "Occupancy Meter",
      render: (item) => {
        const pct = Math.round((item.occupied / item.capacity) * 100);
        return (
          <div style={{ minWidth: "140px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
              <span><b>{item.occupied}</b> / {item.capacity} Vols</span>
              <span style={{ fontFamily: "var(--mono)", color: pct > 85 ? "var(--amber)" : "var(--green)" }}>{pct}%</span>
            </div>
            <div style={{ width: "100%", height: "6px", background: "var(--paper-deep)", borderRadius: "3px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: pct > 85 ? "var(--amber)" : "var(--navy)",
                  borderRadius: "3px",
                }}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Spatial Organization</span>
          <h1>Shelves & Rack Directory</h1>
          <p>Organize physical library floor stacks, monitor section volume density, and optimize shelf storage allocations.</p>
        </div>
        <button className="primary gold-btn" onClick={() => setModal({ type: "addShelf" })}>
          <Plus size={15} /> Configure New Shelf
        </button>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Active Library Stack Shelves ({data.shelves.length})</h2>
        </div>
        <div className="panel-body">
          <DataTable
            columns={columns}
            data={data.shelves}
            searchPlaceholder="Search shelf code, field, or floor location..."
          />
        </div>
      </div>
    </div>
  );
}
