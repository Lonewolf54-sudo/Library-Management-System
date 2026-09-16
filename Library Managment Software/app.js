const books = [
  {
    id: "algo",
    title: "Introduction to Algorithms",
    spine: "Algorithms Vol 1",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    shelf: "CS-01",
    rack: "Rack C",
    shelfNo: "Shelf C04",
    copies: 3,
    isbn: "978-0262033848",
    publisher: "MIT Press",
    edition: "Third Edition",
    year: "2009",
    color: "#101112",
    text: "#fff9d9",
    height: 210,
    width: 62,
    status: "Available",
    due: "8 days left",
    description:
      "A rigorous and beloved reference for algorithms, data structures, graph theory, dynamic programming and computational thinking.",
  },
  {
    id: "os",
    title: "Operating Systems",
    spine: "Operating Systems",
    author: "Silberschatz",
    category: "Computer Science",
    shelf: "CS-01",
    rack: "Rack B",
    shelfNo: "Shelf B12",
    copies: 2,
    isbn: "978-1118063330",
    publisher: "Wiley",
    edition: "Ninth Edition",
    year: "2012",
    color: "#2b4358",
    text: "#ffffff",
    height: 228,
    width: 70,
    status: "Available",
    due: "Due tomorrow",
    description:
      "Process management, memory, storage, protection and distributed systems for serious operating-system study.",
  },
  {
    id: "clean",
    title: "Clean Architecture",
    spine: "Clean Architecture",
    author: "Robert C. Martin",
    category: "Computer Science",
    shelf: "CS-01",
    rack: "Rack A",
    shelfNo: "Shelf A03",
    copies: 1,
    isbn: "978-0134494166",
    publisher: "Pearson",
    edition: "First Edition",
    year: "2017",
    color: "#fffde2",
    text: "#151515",
    height: 196,
    width: 54,
    status: "Available",
    due: "12 days left",
    description:
      "Design principles for maintainable software systems, boundaries, components and long-lived architecture choices.",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    spine: "Artificial Intelligence",
    author: "Russell & Norvig",
    category: "AI",
    shelf: "AI-04",
    rack: "Rack C",
    shelfNo: "Shelf 04",
    copies: 0,
    isbn: "978-0134610993",
    publisher: "Pearson",
    edition: "Fourth Edition",
    year: "2020",
    color: "#050505",
    text: "#fff8d0",
    height: 230,
    width: 72,
    status: "Currently Issued",
    queue: 3,
    description:
      "The classic survey of intelligent agents, search, logic, uncertainty, learning, NLP, perception and robotics.",
  },
  {
    id: "deep",
    title: "Deep Learning",
    spine: "Deep Learning",
    author: "Goodfellow",
    category: "AI",
    shelf: "AI-04",
    rack: "Rack D",
    shelfNo: "Shelf D02",
    copies: 1,
    isbn: "978-0262035613",
    publisher: "MIT Press",
    edition: "Adaptive Computation",
    year: "2016",
    color: "#245735",
    text: "#ffffff",
    height: 194,
    width: 60,
    status: "Available",
    description:
      "A modern foundation for neural networks, optimization, sequence modeling and representation learning.",
  },
  {
    id: "data",
    title: "The Silent Data",
    spine: "Silent Data",
    author: "Marcus Thorne",
    category: "Data Science",
    shelf: "DS-02",
    rack: "Rack F",
    shelfNo: "Shelf F07",
    copies: 4,
    isbn: "978-0455012201",
    publisher: "Athenaeum Press",
    edition: "Student Folio",
    year: "2024",
    color: "#711013",
    text: "#fff5f0",
    height: 205,
    width: 52,
    status: "Available",
    description:
      "A practical introduction to interpreting datasets, finding bias and communicating uncertainty with clarity.",
  },
  {
    id: "math",
    title: "A Treatise on Celestial Mechanics",
    spine: "Celestial Mechanics",
    author: "E. Halley",
    category: "Mathematics",
    shelf: "MATH-03",
    rack: "Rack H",
    shelfNo: "Shelf H01",
    copies: 2,
    isbn: "978-0610011304",
    publisher: "Archive Classics",
    edition: "Folio Reprint",
    year: "1894",
    color: "#e8dfbd",
    text: "#17120b",
    height: 218,
    width: 64,
    status: "Available",
    description:
      "An elegant archival volume on orbital motion, mathematical models and the geometry of celestial systems.",
  },
];

const state = {
  authed: false,
  view: "login",
  tab: "home",
  category: "All",
  selectedId: null,
  search: "",
  mode: "shelf",
  modal: null,
  duration: 14,
  reservedBookId: null,
  saved: new Set(["clean"]),
  borrowed: ["algo", "os", "clean"],
};

const app = document.getElementById("app");

function bookById(id) {
  return books.find((book) => book.id === id);
}

function render() {
  app.innerHTML = state.authed ? renderApp() : renderLogin();
  bind();
}

function renderLogin() {
  return `
    <section class="login">
      <div class="seal" aria-hidden="true">⌂</div>
      <h1>The Archive</h1>
      <h2>University Intellectual Archive</h2>
      <div class="login-panel">
        <div class="field">
          <label for="studentId">Registration / Email</label>
          <input class="input" id="studentId" value="24-STUD-8902" />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input class="input" id="password" type="password" value="archive" />
        </div>
        <div class="row">
          <label class="check"><input type="checkbox" /> Remember me</label>
          <button class="link">Forgot Password?</button>
        </div>
        <button class="primary" data-login style="margin-top: 28px;">Login to Archive →</button>
      </div>
    </section>
  `;
}

function renderApp() {
  return `
    <section class="screen">
      ${renderTopbar()}
      ${renderMain()}
    </section>
    ${renderBottomNav()}
    ${state.modal ? renderModal() : ""}
  `;
}

function renderTopbar() {
  return `
    <header class="topbar">
      <button class="icon-btn" aria-label="Menu">☰</button>
      <h1 class="brand">The Archive</h1>
      <button class="avatar" aria-label="Profile">A</button>
    </header>
  `;
}

function renderMain() {
  if (state.tab === "explore") return renderExplore();
  if (state.tab === "loans") return renderMyShelf();
  if (state.tab === "scan") return renderScan();
  if (state.tab === "profile") return renderProfile();
  return renderHome();
}

function renderHome() {
  const borrowed = state.borrowed.map(bookById);
  return `
    <div class="content">
      <div class="home-greeting">
        <em>Welcome back,</em>
        <h2>Good evening,<br />Alex</h2>
      </div>
      <div class="stats">
        <div class="stat"><span>Currently Borrowed</span><strong>${state.borrowed.length}</strong></div>
        <div class="stat"><span>Due Soon</span><strong>1</strong></div>
        <div class="stat"><span>Outstanding Fines</span><strong>₹0</strong></div>
      </div>
      <div class="section-title"><h3>My Shelf</h3><button data-tab="loans">View All</button></div>
      <div class="rail">
        ${borrowed
          .map(
            (book) => `
          <button class="mini-book" data-preview="${book.id}">
            <div class="cover" style="background:${book.color};color:${book.text}">${book.title}</div>
            <small>${book.due || "On loan"}</small>
          </button>`
          )
          .join("")}
      </div>
      <div class="section-title"><h3>Recommended For You</h3></div>
      ${["data", "deep"].map((id) => renderRecommendation(bookById(id))).join("")}
      <div class="section-title"><h3>Popular This Week</h3></div>
      <div class="announcement" style="background:#080808;color:#fff;">
        <div class="tagline">Hot in the archive</div>
        <h3 style="font:700 27px/1.1 var(--serif);margin:8px 0;">Post-Modern Aesthetics in Digital Spaces</h3>
        <small>42 students reading</small>
      </div>
      <div class="section-title"><h3>Announcements</h3></div>
      <div class="announcement"><strong>Late Night Reading Week</strong><br /><small>The Archive remains open until 2:00 AM for finals.</small></div>
    </div>
  `;
}

function renderRecommendation(book) {
  return `
    <button class="recommendation" data-preview="${book.id}">
      <div class="tiny-cover" style="background:${book.color}"></div>
      <div>
        <div class="tagline">${book.category}</div>
        <strong>${book.title}</strong><br />
        <small>${book.author}</small>
      </div>
    </button>
  `;
}

function filteredBooks() {
  const term = state.search.trim().toLowerCase();
  return books.filter((book) => {
    const categoryMatch = state.category === "All" || book.category === state.category;
    const textMatch =
      !term ||
      [book.title, book.author, book.category, book.isbn, book.publisher].some((value) =>
        value.toLowerCase().includes(term)
      );
    return categoryMatch && textMatch;
  });
}

function renderExplore() {
  const categories = ["All", "Computer Science", "AI", "Data Science", "Mathematics"];
  const visible = filteredBooks();
  const grouped = categories
    .filter((category) => category !== "All")
    .map((category) => ({
      category,
      books: visible.filter((book) => book.category === category),
    }))
    .filter((group) => group.books.length);

  return `
    <div class="content">
      <input class="search" data-search placeholder="Search title, author, ISBN..." value="${state.search}" />
      <div class="chips">
        ${categories
          .map(
            (category) =>
              `<button class="chip ${state.category === category ? "active" : ""}" data-category="${category}">${category}</button>`
          )
          .join("")}
      </div>
      <div class="view-toggle">
        <button class="${state.mode === "shelf" ? "active" : ""}" data-mode="shelf">Shelf View</button>
        <button class="${state.mode === "list" ? "active" : ""}" data-mode="list">List View</button>
      </div>
      ${state.mode === "list" ? renderList(visible) : grouped.map(renderShelfBlock).join("")}
    </div>
  `;
}

function renderShelfBlock(group) {
  return `
    <section class="shelf-block">
      <div class="shelf-label"><span>${group.category} - Shelf ${group.books[0].shelf}</span><span>•••</span></div>
      <div class="shelf">
        ${group.books.map(renderSpine).join("")}
      </div>
    </section>
    ${state.selectedId && group.books.some((book) => book.id === state.selectedId) ? renderSelection(bookById(state.selectedId)) : ""}
  `;
}

function renderSpine(book) {
  const term = state.search.trim().toLowerCase();
  const isMatch = term && [book.title, book.author, book.category].some((value) => value.toLowerCase().includes(term));
  const best = term && book.title.toLowerCase().includes(term);
  const dimmed = term && !isMatch;
  return `
    <button
      class="spine ${state.selectedId === book.id ? "selected" : ""} ${dimmed ? "dimmed" : ""} ${best ? "best" : ""}"
      style="--h:${book.height}px;--w:${book.width}px;--color:${book.color};--text:${book.text}"
      data-spine="${book.id}"
      aria-label="Select ${book.title}"
    >
      <span class="spine-author">${book.author}</span>
      <span class="spine-title">${book.spine}</span>
    </button>
  `;
}

function renderSelection(book) {
  return `
    <div class="selection-note">
      <h4>${book.title}</h4>
      <p>${book.author}</p>
      <p>${book.copies > 0 ? `Available • ${book.copies} copies` : `Currently issued • ${book.queue} students waiting`}</p>
    </div>
  `;
}

function renderList(visible) {
  return `
    <div class="book-list">
      ${visible
        .map(
          (book) => `
        <button class="list-row" data-preview="${book.id}">
          <div class="tiny-cover" style="background:${book.color}"></div>
          <div><strong>${book.title}</strong><br /><small>${book.author} • ${book.category}</small></div>
          <span>${book.copies} copies</span>
        </button>`
        )
        .join("")}
    </div>
  `;
}

function renderModal() {
  const book = bookById(state.selectedId);
  if (state.modal === "preview") return renderPreview(book);
  if (state.modal === "details") return renderDetails(book);
  if (state.modal === "borrow") return renderBorrow(book);
  if (state.modal === "pickup") return renderPickup(book);
  return "";
}

function renderPreview(book) {
  return `
    <section class="modal">
      <header class="topbar" style="background:transparent;border:0;">
        <button class="icon-btn" data-close aria-label="Close">×</button>
        <h1 class="brand">The Archive</h1>
        <span class="avatar">A</span>
      </header>
      <div class="floating-stage">
        <div class="floating-book" style="background:${book.color};color:${book.text}">
          <h2>${book.title}</h2>
        </div>
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <div class="pill"><span class="dot"></span>${book.copies > 0 ? `Available (${book.copies} Copies)` : `${book.queue} Students Waiting`}</div>
        <button class="primary" data-open style="margin:30px 0 16px;">Open Book</button>
        <div class="actions">
          <button class="secondary" data-save>${state.saved.has(book.id) ? "Remove Bookmark" : "Save"}</button>
          <button class="secondary" data-find>Find</button>
        </div>
      </div>
    </section>
  `;
}

function renderDetails(book) {
  return `
    <section class="modal" style="background:var(--paper);">
      ${renderTopbar()}
      <div class="open-book">
        <article class="page">
          <div class="cover" style="width:150px;margin:0 auto;background:${book.color};color:${book.text}">${book.title}</div>
          <h2>${book.title}</h2>
          <p class="byline">By ${book.author}</p>
          <p style="text-align:center;color:var(--gold-dark);">☆ ☆ ☆ ☆ ☆ <small>(4.8 / 5)</small></p>
          <p>${book.description}</p>
          <div class="page-grid">
            <div class="fact"><span>Collection</span>${book.category}</div>
            <div class="fact"><span>Rack</span>${book.rack}</div>
            <div class="fact"><span>Shelf</span>${book.shelfNo}</div>
          </div>
          <div class="details">
            <div class="detail-row"><span>Availability</span><strong>${book.copies} Copies</strong></div>
            <div class="detail-row"><span>ISBN-13</span><strong>${book.isbn}</strong></div>
            <div class="detail-row"><span>Publisher</span><strong>${book.publisher}</strong></div>
            <div class="detail-row"><span>Edition</span><strong>${book.edition}</strong></div>
            <div class="detail-row"><span>Year</span><strong>${book.year}</strong></div>
          </div>
          <button class="primary" data-borrow>${book.copies > 0 ? "Borrow / Reserve →" : "Join Waitlist →"}</button>
          <button class="secondary" data-find style="width:100%;margin-top:14px;">Find on Shelf</button>
          <button class="link" data-save style="width:100%;margin-top:18px;">${state.saved.has(book.id) ? "Remove Bookmark" : "Add Bookmark"}</button>
        </article>
      </div>
    </section>
  `;
}

function renderBorrow(book) {
  const issue = new Date(2026, 6, 28);
  const due = new Date(issue);
  due.setDate(issue.getDate() + state.duration);
  return `
    <section class="modal borrow-page" style="background:var(--paper);">
      ${renderTopbar()}
      <div class="open-book">
        <article class="page">
          <div class="tagline">Selected Volume</div>
          <h2>How long do you need this book?</h2>
          <p class="byline">${book.title}</p>
          <div class="duration-options">
            ${[7, 14, 21]
              .map(
                (days) => `
              <button class="duration ${state.duration === days ? "active" : ""}" data-duration="${days}">
                <span class="radio"></span>
                <span><strong>${days} Days</strong><br /><small>${days === 7 ? "Quick reference" : days === 14 ? "Standard loan period" : "Extended study"}</small></span>
              </button>`
              )
              .join("")}
          </div>
          <div class="dates">
            <div class="date-card"><span>Issue Date</span><strong>${formatDate(issue)}</strong></div>
            <div class="date-card"><span>Return By</span><strong>${formatDate(due)}</strong></div>
          </div>
          <button class="primary" data-confirm>${book.copies > 0 ? "Create Pickup Pass" : "Confirm Waitlist"}</button>
        </article>
      </div>
    </section>
  `;
}

function renderPickup(book) {
  return `
    <section class="modal" style="background:var(--paper);">
      ${renderTopbar()}
      <div class="open-book">
        <article class="page pickup-pass">
          <div class="tagline" style="text-align:center;">Library Pickup</div>
          <div class="qr" aria-hidden="true"></div>
          <h2 style="font-size:34px;">${book.title}</h2>
          <p class="byline">Request #R1023</p>
          <div class="details">
            <div class="detail-row"><span>Pickup Before</span><strong>29 July, 5:00 PM</strong></div>
            <div class="detail-row"><span>Bring</span><strong>Digital Library Card</strong></div>
            <div class="detail-row"><span>Status</span><strong>Ready for librarian scan</strong></div>
          </div>
          <button class="primary" data-my-shelf>Go to My Shelf</button>
        </article>
      </div>
    </section>
  `;
}

function renderMyShelf() {
  const borrowed = state.borrowed.map(bookById);
  return `
    <div class="content">
      <div class="home-greeting">
        <em>My Library</em>
        <h2>Your Personal Shelf</h2>
      </div>
      <section class="shelf personal-shelf">
        ${borrowed
          .map(
            (book) => `
          <button class="spine" style="--h:${book.height - 20}px;--w:${book.width}px;--color:${book.color};--text:${book.text}" data-preview="${book.id}">
            <span class="due-tag">${book.due || "On Loan"}</span>
            <span class="spine-author">${book.author}</span>
            <span class="spine-title">${book.spine}</span>
          </button>`
          )
          .join("")}
      </section>
      <div class="section-title"><h3>Borrowing History</h3></div>
      ${borrowed.map(renderRecommendation).join("")}
    </div>
  `;
}

function renderScan() {
  return `
    <div class="content">
      <div class="home-greeting"><em>Physical to Digital</em><h2>Scan Book</h2></div>
      <div class="page" style="min-height:420px;display:grid;place-items:center;text-align:center;">
        <div>
          <div style="font-size:76px;">▦</div>
          <h3 style="font:700 28px var(--serif);">Scan a shelf QR or copy barcode</h3>
          <p>The recognized book will expand into the floating book preview.</p>
          <button class="primary" data-preview="algo">Demo Scan</button>
        </div>
      </div>
    </div>
  `;
}

function renderProfile() {
  return `
    <div class="content">
      <div class="home-greeting"><em>Digital Library Card</em><h2>Alex Morgan</h2></div>
      <article class="page pickup-pass" style="min-height:auto;">
        <div class="tagline">The Archive</div>
        <h2 style="text-align:left;font-size:34px;">Alex Morgan</h2>
        <p>24-STUD-8902<br />Computer Science • Year 3<br />Active Member</p>
        <div class="qr" aria-hidden="true"></div>
      </article>
      <button class="secondary" style="width:100%;margin-top:18px;">Change Password</button>
      <button class="secondary" style="width:100%;margin-top:12px;" data-logout>Logout</button>
    </div>
  `;
}

function renderBottomNav() {
  const items = [
    ["home", "⌂", "Home"],
    ["explore", "⌖", "Explore"],
    ["scan", "▦", "Scan"],
    ["loans", "▯", "Loans"],
    ["profile", "♙", "Profile"],
  ];
  return `
    <nav class="bottom-nav" aria-label="Primary navigation">
      ${items
        .map(
          ([id, icon, label]) => `
        <button class="nav-item ${state.tab === id ? "active" : ""} ${id === "scan" ? "scan-bump" : ""}" data-tab="${id}">
          <span>${icon}</span>${label}
        </button>`
        )
        .join("")}
    </nav>
  `;
}

function bind() {
  app.querySelector("[data-login]")?.addEventListener("click", () => {
    state.authed = true;
    state.tab = "home";
    render();
  });

  app.querySelector("[data-logout]")?.addEventListener("click", () => {
    state.authed = false;
    state.modal = null;
    render();
  });

  app.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      state.modal = null;
      render();
    });
  });

  app.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      state.selectedId = null;
      render();
    });
  });

  app.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      render();
    });
  });

  app.querySelector("[data-search]")?.addEventListener("input", (event) => {
    state.search = event.target.value;
    render();
    const input = app.querySelector("[data-search]");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  });

  app.querySelectorAll("[data-spine]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.spine;
      if (state.selectedId === id) {
        state.modal = "preview";
      } else {
        state.selectedId = id;
      }
      render();
    });
  });

  app.querySelectorAll("[data-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.preview;
      state.modal = "preview";
      render();
    });
  });

  app.querySelector("[data-close]")?.addEventListener("click", () => {
    state.modal = null;
    render();
  });

  app.querySelector("[data-open]")?.addEventListener("click", () => {
    state.modal = "details";
    render();
  });

  app.querySelector("[data-borrow]")?.addEventListener("click", () => {
    state.modal = "borrow";
    render();
  });

  app.querySelectorAll("[data-duration]").forEach((button) => {
    button.addEventListener("click", () => {
      state.duration = Number(button.dataset.duration);
      render();
    });
  });

  app.querySelector("[data-confirm]")?.addEventListener("click", () => {
    state.reservedBookId = state.selectedId;
    state.modal = "pickup";
    render();
  });

  app.querySelector("[data-my-shelf]")?.addEventListener("click", () => {
    if (!state.borrowed.includes(state.selectedId)) {
      state.borrowed.unshift(state.selectedId);
    }
    state.modal = null;
    state.tab = "loans";
    render();
  });

  app.querySelectorAll("[data-save]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.saved.has(state.selectedId)) state.saved.delete(state.selectedId);
      else state.saved.add(state.selectedId);
      render();
    });
  });

  app.querySelectorAll("[data-find]").forEach((button) => {
    button.addEventListener("click", () => {
      const book = bookById(state.selectedId);
      alert(`Floor 2 → ${book.category} → ${book.rack} → ${book.shelfNo}`);
    });
  });
}

function formatDate(date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

render();
