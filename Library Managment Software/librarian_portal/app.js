const app = document.getElementById("app");

const navItems = [
  ["dashboard", "DB", "Dashboard"],
  ["issue", "IS", "Issue Book"],
  ["return", "RT", "Return Book"],
  ["renewals", "RN", "Renewals"],
  ["books", "BK", "Books"],
  ["copies", "CP", "Copies / Inventory"],
  ["students", "ST", "Students"],
  ["reservations", "RS", "Reservations"],
  ["fines", "FN", "Fines"],
  ["shelves", "SH", "Shelves"],
  ["reports", "RP", "Reports"],
];

const state = {
  loggedIn: false,
  section: "dashboard",
};

function render() {
  app.innerHTML = state.loggedIn ? portal() : login();
  bind();
}

function login() {
  return `
    <section class="login-page">
      <div>
        <article class="login-card">
          <div class="brand-mark">AR</div>
          <h1>The Archive</h1>
          <p>Librarian Portal Gateway</p>
          <div class="field">
            <label>Librarian ID / Email</label>
            <div class="input-wrap">
              <span class="field-icon">ID</span>
              <input value="LIB-98234" aria-label="Librarian ID" />
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="input-wrap">
              <span class="field-icon">PW</span>
              <input type="password" value="archive" aria-label="Password" />
              <button class="link">Show</button>
            </div>
          </div>
          <div class="login-row">
            <label><input type="checkbox" /> Remember this workstation</label>
            <button class="link">Forgot Password?</button>
          </div>
          <button class="primary" data-login>Secure Login</button>
        </article>
        <div class="login-footer">
          <span>SSL SECURED ENDPOINT</span>
          <span>V4.2.0-STABLE</span>
        </div>
      </div>
    </section>
  `;
}

function portal() {
  return `
    <section class="portal">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-icon">AR</div>
          <div>
            <strong>The Archive</strong>
            <small>LIBRARIAN PORTAL</small>
          </div>
        </div>
        <nav class="nav" aria-label="Librarian sections">
          ${navItems.map(([id, icon, label]) => navItem(id, icon, label)).join("")}
        </nav>
      </aside>
      <main class="workspace">
        <header class="topbar">
          <label class="search">
            <span class="search-icon">Search</span>
            <input placeholder="Search ISBN, book title, or student ID..." />
          </label>
          <button class="quick-scan">Quick Scan</button>
          <button class="notice" aria-label="Notifications">!</button>
          <div class="profile">
            <div>
              <strong>Prof. Elena Vance</strong>
              <small>Chief Librarian</small>
            </div>
            <div class="avatar">EV</div>
          </div>
        </header>
        <section class="dashboard">
          ${content()}
        </section>
      </main>
      <button class="fab" aria-label="Quick add">+</button>
    </section>
  `;
}

function navItem(id, icon, label) {
  const active = state.section === id ? "active" : "";
  return `
    <button class="${active}" data-section="${id}">
      <span class="nav-icon">${icon}</span>
      <span class="label">${label}</span>
    </button>
  `;
}

function content() {
  const pageMap = {
    dashboard: dashboardContent,
    issue: issueBookPage,
    return: returnBookPage,
    renewals: renewalsPage,
    books: booksPage,
    copies: copiesPage,
    students: studentsPage,
    reservations: reservationsPage,
    fines: finesPage,
    shelves: shelvesPage,
    reports: reportsPage,
  };
  return pageMap[state.section]();
}

function dashboardContent() {
  return `
    <div class="page-title">
      <div>
        <span>Librarian Operations</span>
        <h1>Dashboard</h1>
      </div>
      <p>Live circulation status, alerts, inventory pressure, and daily desk activity.</p>
    </div>
    <div class="stats">
      ${stat("Global", "42,850", "Total Catalog", "#6f7f8e")}
      ${stat("+12 today", "31,204", "Available Copies", "#16a36c")}
      ${stat("78% cap.", "11,646", "Issued Books", "#0b63a5")}
      ${stat("Urgent", "142", "Due Today", "#f2a51a")}
      ${stat("Action Req.", "58", "Overdue Items", "#d93025")}
      ${stat("New +4", "24", "Active Reservations", "#0b63a5")}
      ${stat("USD", "$1,480", "Pending Fines", "#5f6b7a")}
    </div>
    <div class="grid">
      <div>
        ${recentIssues()}
        ${recentReturns()}
      </div>
      ${alerts()}
      ${pulse()}
    </div>
  `;
}

function stat(kicker, value, label, accent) {
  return `
    <article class="stat" style="--accent:${accent}">
      <span>${kicker}</span>
      <strong>${value}</strong>
      <small>${label}</small>
    </article>
  `;
}

function issueBookPage() {
  return workflowPage(
    "Issue Book",
    "Scan student ID, scan copy barcode, validate eligibility, then confirm the physical issue.",
    [
      ["1", "Student Scan", "ST-8821 - Alex Morgan - Active membership"],
      ["2", "Book Copy Scan", "CP-20491 - Deep Learning with PyTorch"],
      ["3", "Validation", "2 of 5 loans used, no blocking fines, copy available"],
      ["4", "Confirm Issue", "Due date: 31 Aug 2026"],
    ],
    "Confirm Issue"
  );
}

function returnBookPage() {
  return workflowPage(
    "Return Book",
    "Process incoming copies, calculate overdue status, and mark the copy ready for shelf or hold.",
    [
      ["1", "Copy Scan", "CP-11842 - Organic Chemistry Vol. 2"],
      ["2", "Active Loan", "Issued to ST-9218 on 03 Aug 2026"],
      ["3", "Condition Check", "Worn cover, pages complete"],
      ["4", "Fine Result", "2 days late - $10 pending"],
    ],
    "Confirm Return"
  );
}

function renewalsPage() {
  return dataPage("Renewals", "Review renewal requests and policy checks.", [
    ["Student", "Book", "Current Due", "Status"],
    ["ST-5542", "Database Systems", "18 Aug", "Allowed"],
    ["ST-1094", "Macroeconomics", "Today", "Reservation blocks renewal"],
    ["ST-3301", "Architectural Drawing", "21 Aug", "Allowed"],
  ]);
}

function booksPage() {
  return dataPage("Books", "Catalogue title records managed by the librarian desk.", [
    ["Title", "ISBN", "Category", "Copies"],
    ["Deep Learning with PyTorch", "978-5270297498", "STEM", "12"],
    ["Principles of Macroeconomics", "978-3830929333", "Business", "8"],
    ["The Great Gatsby Legacy", "978-1801396839", "Arts", "5"],
  ]);
}

function copiesPage() {
  return dataPage("Copies / Inventory", "Track physical copies, barcode IDs, shelf placement, and condition.", [
    ["Copy ID", "Book", "Shelf", "Status"],
    ["CP-20491", "Deep Learning with PyTorch", "STEM-A2", "Issued"],
    ["CP-11842", "Organic Chemistry Vol. 2", "SCI-C4", "Returned - Worn"],
    ["CP-70014", "Digital Circuitry", "ENG-E1", "Available"],
  ]);
}

function studentsPage() {
  return dataPage("Students", "Student profiles, active loans, reservations, and fine balances.", [
    ["Student ID", "Name", "Loans", "Fine"],
    ["ST-8821", "Alex Morgan", "3", "$0"],
    ["ST-1094", "Nina Patel", "5", "$12"],
    ["ST-4432", "Omar Reed", "1", "$0"],
  ]);
}

function reservationsPage() {
  return dataPage("Reservations", "Reservation queue and pickup-pass status.", [
    ["Request", "Student", "Book", "Status"],
    ["R-1023", "ST-5529", "Quantum Field Theory", "Ready for pickup"],
    ["R-1024", "ST-3301", "Human Anatomy", "Waiting #3"],
    ["R-1025", "ST-9218", "Digital Circuitry", "Expires today"],
  ]);
}

function finesPage() {
  return dataPage("Fines", "Outstanding, paid, and waived fine records.", [
    ["Student", "Book", "Reason", "Amount"],
    ["ST-9218", "Organic Chemistry Vol. 2", "2 days overdue", "$10"],
    ["ST-1094", "Macroeconomics", "Damaged jacket", "$18"],
    ["ST-4432", "The Great Gatsby Legacy", "Paid", "$0"],
  ]);
}

function shelvesPage() {
  return `
    <div class="page-title">
      <div><span>Physical Location</span><h1>Shelves</h1></div>
      <p>Manage floor, section, rack, and shelf placement for physical copies.</p>
    </div>
    <div class="shelf-map">
      ${["Floor 1 - Arts", "Floor 2 - STEM", "Floor 2 - Computer Science", "Floor 3 - Law"].map((title, i) => `
        <article class="shelf-card">
          <strong>${title}</strong>
          <div class="rack-row"><span></span><span></span><span></span><span></span></div>
          <p>${[84, 126, 92, 47][i]} copies assigned</p>
          <button class="small-action">View Contents</button>
        </article>
      `).join("")}
    </div>
  `;
}

function reportsPage() {
  return dataPage("Reports", "Preview and export operational reports.", [
    ["Report", "Range", "Format", "Action"],
    ["Issued Books", "Today", "PDF / CSV", "Preview"],
    ["Overdue Books", "7 Days", "PDF / CSV", "Preview"],
    ["Inventory Audit", "Semester", "PDF / CSV", "Preview"],
  ]);
}

function workflowPage(title, subtitle, steps, action) {
  return `
    <div class="page-title">
      <div><span>Desk Workflow</span><h1>${title}</h1></div>
      <p>${subtitle}</p>
    </div>
    <div class="workflow-grid">
      <section class="panel workflow-panel">
        ${steps.map(([number, stepTitle, detail]) => `
          <article class="step">
            <b>${number}</b>
            <div>
              <strong>${stepTitle}</strong>
              <p>${detail}</p>
            </div>
          </article>
        `).join("")}
        <button class="primary inline-primary">${action}</button>
      </section>
      ${alerts()}
    </div>
  `;
}

function dataPage(title, subtitle, rows) {
  const [head, ...body] = rows;
  return `
    <div class="page-title">
      <div><span>Library Records</span><h1>${title}</h1></div>
      <p>${subtitle}</p>
    </div>
    <section class="panel">
      <div class="panel-head">
        <h2>${title}</h2>
        <button class="small-action">Add / Manage</button>
      </div>
      <table class="table wide-table">
        <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
        <tbody>
          ${body.map((row) => `<tr>${row.map((cell, i) => `<td>${i === 0 ? `<span class="student-id">${cell}</span>` : cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function recentIssues() {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Recent Issues</h2>
        <button class="link" data-section="issue">View All</button>
      </div>
      <table class="table">
        <thead><tr><th>Student ID</th><th>Book / ISBN</th><th>Time</th></tr></thead>
        <tbody>
          ${issue("ST-8821", "Deep Learning with PyTorch", "14:22", "978-5270297498")}
          ${issue("ST-1094", "Principles of Macroeconomics", "13:56", "978-3830929333")}
          ${issue("ST-4432", "The Great Gatsby Legacy", "13:44", "978-1801396839")}
        </tbody>
      </table>
    </section>
  `;
}

function issue(id, book, time, isbn) {
  return `
    <tr>
      <td><span class="student-id">${id}</span></td>
      <td><span class="book-title">${book}</span><br><small>${isbn}</small></td>
      <td>${time}</td>
    </tr>
  `;
}

function recentReturns() {
  return `
    <section class="panel" style="margin-top:18px;">
      <div class="panel-head">
        <h2>Recent Returns</h2>
        <button class="link" data-section="return">View All</button>
      </div>
      <table class="table">
        <thead><tr><th>Student ID</th><th>Book / ISBN</th><th>Condition</th></tr></thead>
        <tbody>
          <tr><td><span class="student-id">ST-3301</span></td><td><span class="book-title">Architectural Drawing</span><br><small>978-11102431</small></td><td><b style="color:var(--green)">Excellent</b></td></tr>
          <tr><td><span class="student-id">ST-9218</span></td><td><span class="book-title">Organic Chemistry Vol. 2</span><br><small>978-1260149923</small></td><td><b style="color:var(--amber)">Worn</b></td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function alerts() {
  return `
    <section class="panel">
      <div class="panel-head"><h2>Operational Alerts</h2></div>
      <div class="alerts">
        ${alert("red", "Batch Overdue: 14 Books", "Law Faculty - Seminar Room A block.", ["Badge All", "View"], true)}
        ${alert("amber", "Low Stock: Reference Guides", "Medical Research Index - 2 copies left.", ["Reorder"])}
        ${alert("blue", "Reservation Request", "ID ST-5529: Quantum Field Theory.", ["Approve", "Deny"])}
        ${alert("", "Reported Missing", "Shelf L2-15: Medieval History of Art.", [])}
      </div>
    </section>
  `;
}

function alert(tone, title, body, actions, danger = false) {
  const icon = tone === "red" ? "!" : tone === "amber" ? "STK" : tone === "blue" ? "RSV" : "MIS";
  return `
    <article class="alert ${tone}">
      <div class="alert-icon">${icon}</div>
      <div>
        <strong>${title}</strong>
        <p>${body}</p>
        <div class="alert-actions">
          ${actions.map((item, i) => `<button class="${danger && i === 0 ? "danger" : ""}">${item}</button>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function pulse() {
  return `
    <section class="panel">
      <div class="panel-head"><h2>Circulation Pulse</h2></div>
      <div class="pulse">
        <small style="color:var(--muted);font-weight:900;">ISSUES OVER TIME</small>
        <div class="bars">
          ${[42, 66, 55, 92, 126, 108, 84].map((h, i) => `<div class="bar ${i > 3 ? "dark" : ""}" style="height:${h}px"></div>`).join("")}
        </div>
        <small style="color:var(--muted);font-weight:900;">POPULAR CATEGORIES</small>
        <div class="legend">
          <div><span class="legend-dot stem"></span> STEM <b style="float:right">42%</b></div>
          <div><span class="legend-dot arts"></span> Arts <b style="float:right">31%</b></div>
          <div><span class="legend-dot law"></span> Law <b style="float:right">27%</b></div>
        </div>
        <div class="panel-head" style="padding:18px 0 4px;border:0;"><h2>Most Borrowed Books</h2></div>
        ${popular("Advanced Mathematics", 124)}
        ${popular("Human Anatomy", 98)}
        ${popular("Digital Circuitry", 76)}
      </div>
    </section>
  `;
}

function popular(title, count) {
  return `
    <div class="popular">
      <div class="mini-cover"></div>
      <strong>${title}</strong>
      <span>${count}</span>
    </div>
  `;
}

function bind() {
  document.querySelector("[data-login]")?.addEventListener("click", () => {
    state.loggedIn = true;
    render();
  });

  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      state.section = button.dataset.section;
      render();
    });
  });
}

render();
