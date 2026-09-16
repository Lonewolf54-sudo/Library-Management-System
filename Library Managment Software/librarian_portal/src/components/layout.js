import { navItems } from "../main.js";
import { store } from "../state/store.js";

export function loginView() {
  return `
    <section class="login-page">
      <div>
        <article class="login-card">
          <div class="brand-mark">AR</div>
          <h1>The Archive</h1>
          <p>Librarian Portal Gateway</p>
          <div class="field"><label>Librarian ID / Email</label><div class="input-wrap"><span class="field-icon">ID</span><input value="LIB-98234" /></div></div>
          <div class="field"><label>Password</label><div class="input-wrap"><span class="field-icon">PW</span><input type="password" value="archive" /><button class="link">Show</button></div></div>
          <div class="login-row"><label><input type="checkbox" /> Remember this workstation</label><button class="link">Forgot Password?</button></div>
          <button class="primary" data-login>Secure Login</button>
        </article>
        <div class="login-footer"><span>SSL SECURED ENDPOINT</span><span>V4.2.0-STABLE</span></div>
      </div>
    </section>`;
}

export function portalView(content) {
  return `
    <section class="portal">
      <aside class="sidebar">
        <div class="brand"><div class="brand-icon">AR</div><div><strong>The Archive</strong><small>LIBRARIAN PORTAL</small></div></div>
        <nav class="nav">${navItems.map(([id, icon, label]) => `<button class="${store.section === id ? "active" : ""}" data-section="${id}"><span class="nav-icon">${icon}</span><span class="label">${label}</span></button>`).join("")}</nav>
      </aside>
      <main class="workspace">
        <header class="topbar">
          <label class="search"><span class="search-icon">Search</span><input placeholder="Search ISBN, book title, or student ID..." /></label>
          <button class="quick-scan" data-section="issue">Quick Scan</button>
          <button class="notice">!</button>
          <div class="profile"><div><strong>Prof. Elena Vance</strong><small>Chief Librarian</small></div><div class="avatar">EV</div></div>
        </header>
        <section class="dashboard">${content}</section>
      </main>
      <button class="fab" data-section="books">+</button>
      ${store.toast ? `<div class="toast">${store.toast}</div>` : ""}
    </section>`;
}

export function bindLayout() {
  document.querySelector("[data-login]")?.addEventListener("click", () => {
    store.loggedIn = true;
    window.dispatchEvent(new CustomEvent("app:render"));
  });
  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      store.section = button.dataset.section;
      window.dispatchEvent(new CustomEvent("app:render"));
    });
  });
}
