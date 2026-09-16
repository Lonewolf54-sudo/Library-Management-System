import { getDashboardStats } from "../api/libraryApi.js";
import { alerts, pageTitle, panel, stat, table } from "../components/ui.js";

export async function dashboardPage() {
  const stats = await getDashboardStats();
  return `
    ${pageTitle("Librarian Operations", "Dashboard", "Live circulation status, alerts, inventory pressure, and daily desk activity.")}
    <div class="stats">
      ${stat("Global", stats.totalCatalog.toLocaleString(), "Total Catalog", "#6f7f8e")}
      ${stat("+12 today", stats.availableCopies.toLocaleString(), "Available Copies", "#16a36c")}
      ${stat("78% cap.", stats.issuedBooks.toLocaleString(), "Issued Books", "#0b63a5")}
      ${stat("Urgent", stats.dueToday, "Due Today", "#f2a51a")}
      ${stat("Action Req.", stats.overdueItems, "Overdue Items", "#d93025")}
      ${stat("New +4", stats.activeReservations, "Active Reservations", "#0b63a5")}
      ${stat("USD", `$${stats.pendingFines.toLocaleString()}`, "Pending Fines", "#5f6b7a")}
    </div>
    <div class="grid">
      <div>
        ${recentIssues()}
        ${recentReturns()}
      </div>
      ${alerts()}
      ${pulse()}
    </div>`;
}

function recentIssues() {
  return panel("Recent Issues", table(["Student ID", "Book / ISBN", "Time"], [
    ["ST-8821", "Deep Learning with PyTorch<br><small>978-5270297498</small>", "14:22"],
    ["ST-1094", "Principles of Macroeconomics<br><small>978-3830929333</small>", "13:56"],
    ["ST-4432", "The Great Gatsby Legacy<br><small>978-1801396839</small>", "13:44"],
  ]), `<button class="link" data-section="issue">View All</button>`);
}

function recentReturns() {
  return `<div style="margin-top:18px">${panel("Recent Returns", table(["Student ID", "Book / ISBN", "Condition"], [
    ["ST-3301", "Architectural Drawing<br><small>978-11102431</small>", `<b style="color:var(--green)">Excellent</b>`],
    ["ST-9218", "Organic Chemistry Vol. 2<br><small>978-1260149923</small>", `<b style="color:var(--amber)">Worn</b>`],
  ]), `<button class="link" data-section="return">View All</button>`)}</div>`;
}

function pulse() {
  return panel("Circulation Pulse", `<div class="pulse">
    <small style="color:var(--muted);font-weight:900;">ISSUES OVER TIME</small>
    <div class="bars">${[42, 66, 55, 92, 126, 108, 84].map((height, index) => `<div class="bar ${index > 3 ? "dark" : ""}" style="height:${height}px"></div>`).join("")}</div>
    <small style="color:var(--muted);font-weight:900;">POPULAR CATEGORIES</small>
    <div class="legend">
      <div><span class="legend-dot stem"></span> STEM <b style="float:right">42%</b></div>
      <div><span class="legend-dot arts"></span> Arts <b style="float:right">31%</b></div>
      <div><span class="legend-dot law"></span> Law <b style="float:right">27%</b></div>
    </div>
    <div class="panel-head" style="padding:18px 0 4px;border:0;"><h2>Most Borrowed Books</h2></div>
    ${["Advanced Mathematics|124", "Human Anatomy|98", "Digital Circuitry|76"].map((item) => {
      const [title, count] = item.split("|");
      return `<div class="popular"><div class="mini-cover"></div><strong>${title}</strong><span>${count}</span></div>`;
    }).join("")}
  </div>`);
}
