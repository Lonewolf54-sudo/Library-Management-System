export function pageTitle(kicker, title, subtitle) {
  return `<div class="page-title"><div><span>${kicker}</span><h1>${title}</h1></div><p>${subtitle}</p></div>`;
}

export function panel(title, body, action = "") {
  return `<section class="panel"><div class="panel-head"><h2>${title}</h2>${action}</div>${body}</section>`;
}

export function table(headers, rows) {
  return `<table class="table wide-table"><thead><tr>${headers.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell, index) => `<td>${index === 0 ? `<span class="student-id">${cell}</span>` : cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

export function stat(kicker, value, label, accent) {
  return `<article class="stat" style="--accent:${accent}"><span>${kicker}</span><strong>${value}</strong><small>${label}</small></article>`;
}

export function alerts() {
  return panel("Operational Alerts", `<div class="alerts">
    ${alert("red", "Batch Overdue: 14 Books", "Law Faculty - Seminar Room A block.", ["Badge All", "View"], true)}
    ${alert("amber", "Low Stock: Reference Guides", "Medical Research Index - 2 copies left.", ["Reorder"])}
    ${alert("blue", "Reservation Request", "ID ST-5529: Quantum Field Theory.", ["Approve", "Deny"])}
    ${alert("", "Reported Missing", "Shelf L2-15: Medieval History of Art.", [])}
  </div>`);
}

function alert(tone, title, body, actions, danger = false) {
  const icon = tone === "red" ? "!" : tone === "amber" ? "STK" : tone === "blue" ? "RSV" : "MIS";
  return `<article class="alert ${tone}"><div class="alert-icon">${icon}</div><div><strong>${title}</strong><p>${body}</p><div class="alert-actions">${actions.map((item, index) => `<button class="${danger && index === 0 ? "danger" : ""}">${item}</button>`).join("")}</div></div></article>`;
}
