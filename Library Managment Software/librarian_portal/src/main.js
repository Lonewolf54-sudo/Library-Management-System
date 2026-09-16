import { bindLayout, loginView, portalView } from "./components/layout.js";
import { dashboardPage } from "./pages/dashboard.js";
import { bindIssuePage, issuePage } from "./pages/issue.js";
import { bindReturnPage, returnPage } from "./pages/return.js";
import { recordsPage } from "./pages/records.js";
import { store } from "./state/store.js";

export const navItems = [
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

const app = document.getElementById("app");

export async function renderApp() {
  if (!store.loggedIn) {
    app.innerHTML = loginView();
    bindLayout();
    return;
  }

  app.innerHTML = portalView(`<div class="loading">Loading ${store.section}...</div>`);
  bindLayout();
  const content = await routeContent();
  app.innerHTML = portalView(content);
  bindLayout();
  bindPage();
}

async function routeContent() {
  if (store.section === "dashboard") return dashboardPage();
  if (store.section === "issue") return issuePage();
  if (store.section === "return") return returnPage();
  return recordsPage(store.section);
}

function bindPage() {
  if (store.section === "issue") bindIssuePage();
  if (store.section === "return") bindReturnPage();
}

window.addEventListener("app:render", renderApp);
renderApp();
