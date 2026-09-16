import { calculateFine, getActiveLoanByCopy, returnLoan } from "../api/libraryApi.js";
import { alerts, pageTitle } from "../components/ui.js";
import { renderApp } from "../main.js";
import { showToast, store } from "../state/store.js";

export async function returnPage() {
  const r = store.returns;
  return `
    ${pageTitle("Desk Workflow", "Return Book", "Scan copy, find the active loan, calculate fine, check condition, and confirm return.")}
    <div class="workflow-grid">
      <section class="panel workflow-panel">
        <div class="form-grid">
          <label>Copy Barcode<input data-return-copy value="${r.copyBarcode}"></label>
          <label>Condition
            <select data-return-condition>
              ${["Excellent", "Good", "Worn", "Damaged"].map((item) => `<option ${r.condition === item ? "selected" : ""}>${item}</option>`).join("")}
            </select>
          </label>
        </div>
        <div class="button-row">
          <button class="small-action" data-load-return>Find Active Loan</button>
          <button class="primary inline-primary" data-confirm-return ${r.loan ? "" : "disabled"}>Confirm Return</button>
        </div>
        ${r.loan ? loanSummary(r.loan, r.fine) : `<article class="info-block muted-block">Scan a copy barcode to retrieve active loan details.</article>`}
      </section>
      ${alerts()}
    </div>`;
}

export function bindReturnPage() {
  document.querySelector("[data-load-return]")?.addEventListener("click", async () => {
    store.returns.copyBarcode = document.querySelector("[data-return-copy]").value.trim();
    store.returns.condition = document.querySelector("[data-return-condition]").value;
    store.returns.loan = await getActiveLoanByCopy(store.returns.copyBarcode);
    store.returns.fine = await calculateFine(store.returns.loan);
    renderApp();
  });

  document.querySelector("[data-confirm-return]")?.addEventListener("click", async () => {
    await returnLoan({ loan: store.returns.loan, condition: store.returns.condition });
    showToast(`Returned ${store.returns.loan.book.title}. Fine: $${store.returns.fine.amount}`);
    store.section = "dashboard";
    renderApp();
  });
}

function loanSummary(loan, fine) {
  return `<article class="info-block">
    <h3>Active Loan</h3>
    <p>${loan.book.title}</p>
    <p>${loan.student.name} (${loan.student.id})</p>
    <p>Issued: ${loan.issueDate} | Due: ${loan.dueDate}</p>
    <p>Overdue days: ${fine.overdueDays}</p>
    <p>Fine: $${fine.amount}</p>
  </article>`;
}
