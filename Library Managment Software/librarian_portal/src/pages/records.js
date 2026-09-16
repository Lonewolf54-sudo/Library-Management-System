import { getTableData } from "../api/libraryApi.js";
import { pageTitle, panel, table } from "../components/ui.js";

const pageConfig = {
  renewals: ["Renewals", "Review renewal requests and policy checks.", ["Student", "Book", "Current Due", "Status"], [
    ["ST-5542", "Database Systems", "18 Aug", "Allowed"],
    ["ST-1094", "Macroeconomics", "Today", "Reservation blocks renewal"],
    ["ST-3301", "Architectural Drawing", "21 Aug", "Allowed"],
  ]],
  reports: ["Reports", "Preview and export operational reports.", ["Report", "Range", "Format", "Action"], [
    ["Issued Books", "Today", "PDF / CSV", "Preview"],
    ["Overdue Books", "7 Days", "PDF / CSV", "Preview"],
    ["Inventory Audit", "Semester", "PDF / CSV", "Preview"],
  ]],
};

export async function recordsPage(section) {
  if (section === "shelves") return shelvesPage();
  if (pageConfig[section]) {
    const [title, subtitle, headers, rows] = pageConfig[section];
    return `${pageTitle("Library Records", title, subtitle)}${panel(title, table(headers, rows), `<button class="small-action">Add / Manage</button>`)}`;
  }
  const data = await getTableData(section);
  const config = configFor(section, data);
  return `${pageTitle("Library Records", config.title, config.subtitle)}${panel(config.title, table(config.headers, config.rows), `<button class="small-action">Add / Manage</button>`)}`;
}

function configFor(section, data) {
  if (section === "books") return { title: "Books", subtitle: "Catalogue title records managed by the librarian desk.", headers: ["Title", "ISBN", "Category", "Copies"], rows: data.map((b) => [b.title, b.isbn, b.category, b.copies]) };
  if (section === "copies") return { title: "Copies / Inventory", subtitle: "Track physical copies, barcode IDs, shelf placement, and condition.", headers: ["Copy ID", "Book ID", "Shelf", "Status"], rows: data.map((c) => [c.id, c.bookId, c.shelf, c.status]) };
  if (section === "students") return { title: "Students", subtitle: "Student profiles, active loans, reservations, and fine balances.", headers: ["Student ID", "Name", "Loans", "Fine"], rows: data.map((s) => [s.id, s.name, `${s.loans}/${s.limit}`, `$${s.fine}`]) };
  if (section === "reservations") return { title: "Reservations", subtitle: "Reservation queue and pickup-pass status.", headers: ["Request", "Student", "Book", "Status"], rows: data.map((r) => [r.id, r.studentId, r.book, r.status]) };
  if (section === "fines") return { title: "Fines", subtitle: "Outstanding, paid, and waived fine records.", headers: ["Fine", "Student", "Reason", "Amount"], rows: data.map((f) => [f.id, f.studentId, f.reason, `$${f.amount}`]) };
  return { title: "Records", subtitle: "Library records.", headers: [], rows: [] };
}

function shelvesPage() {
  return `
    ${pageTitle("Physical Location", "Shelves", "Manage floor, section, rack, and shelf placement for physical copies.")}
    <div class="shelf-map">
      ${["Floor 1 - Arts", "Floor 2 - STEM", "Floor 2 - Computer Science", "Floor 3 - Law"].map((title, i) => `
        <article class="shelf-card">
          <strong>${title}</strong>
          <div class="rack-row"><span></span><span></span><span></span><span></span></div>
          <p>${[84, 126, 92, 47][i]} copies assigned</p>
          <button class="small-action">View Contents</button>
        </article>`).join("")}
    </div>`;
}
