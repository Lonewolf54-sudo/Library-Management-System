import { BookPlus, Eye, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Books() {
  const { data, setModal } = useLibrary();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Computer Science", "AI & Data", "Software Engineering", "Business", "Science", "Law", "Mathematics"];

  const filteredBooks = useMemo(() => {
    if (selectedCategory === "All") return data.books;
    return data.books.filter((b) => b.category.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [data.books, selectedCategory]);

  const columns = [
    {
      label: "Volume Title & Author",
      render: (item) => (
        <div>
          <strong style={{ color: "var(--navy)", fontSize: "14px" }}>{item.title}</strong>
          <small style={{ display: "block", color: "var(--muted)", marginTop: "2px" }}>
            {item.author} • {item.publisher} ({item.year})
          </small>
        </div>
      ),
    },
    {
      label: "ISBN-13",
      render: (item) => (
        <span style={{ fontFamily: "var(--mono)", fontSize: "12.5px", color: "var(--ink-secondary)" }}>
          {item.isbn}
        </span>
      ),
    },
    {
      label: "Field / Category",
      render: (item) => (
        <span className="badge blue">
          {item.category}
        </span>
      ),
    },
    {
      label: "Shelf Location",
      render: (item) => (
        <span style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 600 }}>
          {item.shelf} ({item.rack})
        </span>
      ),
    },
    {
      label: "Availability Ratio",
      render: (item) => {
        const pct = Math.round((item.available / item.copies) * 100);
        return (
          <div style={{ minWidth: "120px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
              <span><b>{item.available}</b> / {item.copies} Avail</span>
              <span style={{ fontFamily: "var(--mono)", color: pct < 30 ? "var(--red)" : "var(--green)" }}>{pct}%</span>
            </div>
            <div style={{ width: "100%", height: "6px", background: "var(--paper-deep)", borderRadius: "3px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: pct < 30 ? "var(--red)" : "var(--green)",
                  borderRadius: "3px",
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      label: "Desk Actions",
      render: (item) => (
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            className="icon-btn"
            title="Inspect Book Details"
            onClick={() => setModal({ type: "bookDetail", book: item })}
          >
            <Eye size={15} />
          </button>
          <button
            className="icon-btn"
            title="Add Physical Copy"
            onClick={() => setModal({ type: "addCopy", bookId: item.id })}
          >
            <Plus size={15} />
          </button>
          <button
            className="secondary"
            style={{ padding: "4px 8px", fontSize: "11.5px" }}
            onClick={() => navigate("/issue")}
          >
            Issue
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Archival Records</span>
          <h1>Library Book Catalogue</h1>
          <p>Manage authoritative bibliographic records, ISBN assignments, shelf locations, and inventory counts.</p>
        </div>
        <button className="primary gold-btn" onClick={() => setModal({ type: "addBook" })}>
          <BookPlus size={15} /> Catalog New Volume
        </button>
      </div>

      {/* CATEGORY FILTER CHIPS */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "primary gold-btn" : "secondary"}
            style={{ padding: "6px 14px", fontSize: "12.5px" }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Catalog Volumes ({filteredBooks.length})</h2>
        </div>
        <div className="panel-body">
          <DataTable
            columns={columns}
            data={filteredBooks}
            searchPlaceholder="Search catalog by title, ISBN, author, or field..."
          />
        </div>
      </div>
    </div>
  );
}
