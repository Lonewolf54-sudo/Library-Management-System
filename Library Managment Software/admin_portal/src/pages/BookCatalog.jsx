import { BookPlus, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "../components/DataTable.jsx";
import { useAdmin } from "../context/AdminContext.jsx";

export default function BookCatalog() {
  const { data, setModal } = useAdmin();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredBooks = useMemo(() => {
    return data.books.filter((b) => {
      const matchSearch = `${b.title} ${b.isbn} ${b.author}`.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || b.category === category;
      return matchSearch && matchCat;
    });
  }, [data.books, search, category]);

  const columns = [
    { label: "Book Title & Author", width: "280px" },
    { label: "ISBN-13", width: "160px" },
    { label: "Category", width: "150px" },
    { label: "Shelf Code", width: "120px" },
    { label: "Copies / Avail", width: "140px" },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Central Book Catalog</h1>
          <p>Manage authoritative bibliographies, rare archival volumes, and institutional shelf stacks.</p>
        </div>
        <button className="btn-primary" onClick={() => setModal({ type: "addBook" })}>
          <BookPlus size={15} /> Catalog New Book
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input-wrap">
          <Search size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search catalog by title, ISBN, author..."
          />
        </div>

        <div className="filter-actions">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="btn-secondary"
            style={{ cursor: "pointer" }}
          >
            <option value="All">Category: All</option>
            <option value="Computer Science">Computer Science</option>
            <option value="AI & Data">AI & Data</option>
            <option value="Business & Econ">Business & Econ</option>
            <option value="Manuscripts">Manuscripts</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredBooks}
        renderRow={(book) => (
          <tr key={book.id}>
            <td><input type="checkbox" /></td>
            <td>
              <strong style={{ color: "var(--navy-primary)", display: "block" }}>{book.title}</strong>
              <small style={{ color: "var(--text-muted)" }}>{book.author}</small>
            </td>
            <td><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>{book.isbn}</span></td>
            <td><span className="badge-pill" style={{ background: "var(--blue-badge-bg)", color: "var(--blue-badge-text)" }}>{book.category}</span></td>
            <td><span style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{book.shelf}</span></td>
            <td>
              <strong style={{ color: "var(--green-badge-text)" }}>{book.available}</strong> / {book.copies} Avail
            </td>
          </tr>
        )}
      />
    </div>
  );
}
