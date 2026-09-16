import { createLoan, getCopyByBarcode, getStudentById, validateIssue } from "../api/libraryApi.js";
import { alerts, pageTitle } from "../components/ui.js";
import { renderApp } from "../main.js";
import { showToast, store } from "../state/store.js";

export async function issuePage() {
  return workflowShell("Issue Book", "Scan student ID, scan copy barcode, validate eligibility, then confirm the physical issue.", issueForm());
}

function issueForm() {
  const issue = store.issue;
  return `
    <div class="workflow-grid">
      <section class="panel workflow-panel">
        <div class="form-grid">
          <label>Student ID<input data-issue-student value="${issue.studentId}"></label>
          <label>Copy Barcode<input data-issue-copy value="${issue.copyBarcode}"></label>
        </div>
        <div class="button-row">
          <button class="small-action" data-load-issue>Load & Validate</button>
          <button class="primary inline-primary" data-confirm-issue ${issue.validation?.ok ? "" : "disabled"}>Confirm Issue</button>
        </div>
        ${issue.student ? infoBlock("Student", [`${issue.student.name} (${issue.student.id})`, `${issue.student.department}`, `Loans: ${issue.student.loans}/${issue.student.limit}`, `Fine: $${issue.student.fine}`]) : emptyHint("Load a student to see profile and limits.")}
        ${issue.copy ? infoBlock("Copy", [`${issue.copy.book.title}`, `${issue.copy.barcode}`, `${issue.copy.shelf}`, `Status: ${issue.copy.status}`]) : emptyHint("Load a copy to see availability and shelf.")}
        ${validationBlock(issue.validation)}
      </section>
      ${alerts()}
    </div>`;
}

export function bindIssuePage() {
  document.querySelector("[data-load-issue]")?.addEventListener("click", async () => {
    store.issue.studentId = document.querySelector("[data-issue-student]").value.trim();
    store.issue.copyBarcode = document.querySelector("[data-issue-copy]").value.trim();
    store.issue.student = await getStudentById(store.issue.studentId);
    store.issue.copy = await getCopyByBarcode(store.issue.copyBarcode);
    store.issue.validation = await validateIssue({ student: store.issue.student, copy: store.issue.copy });
    renderApp();
  });

  document.querySelector("[data-confirm-issue]")?.addEventListener("click", async () => {
    await createLoan({ student: store.issue.student, copy: store.issue.copy });
    showToast(`Issued ${store.issue.copy.book.title} to ${store.issue.student.name}`);
    store.section = "dashboard";
    renderApp();
  });
}

function workflowShell(title, subtitle, body) {
  return `${pageTitle("Desk Workflow", title, subtitle)}${body}`;
}

function infoBlock(title, lines) {
  return `<article class="info-block"><h3>${title}</h3>${lines.map((line) => `<p>${line}</p>`).join("")}</article>`;
}

function emptyHint(text) {
  return `<article class="info-block muted-block">${text}</article>`;
}

function validationBlock(validation) {
  if (!validation) return emptyHint("Validation result will appear here.");
  if (validation.ok) return `<article class="info-block success-block"><h3>Ready to Issue</h3><p>All policy checks passed.</p><p>Due date: 31 Aug 2026</p></article>`;
  return `<article class="info-block error-block"><h3>Blocked</h3>${validation.errors.map((error) => `<p>${error}</p>`).join("")}</article>`;
}
