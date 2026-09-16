export const store = {
  loggedIn: false,
  section: "dashboard",
  toast: "",
  issue: {
    studentId: "ST-8821",
    copyBarcode: "CP-20491",
    student: null,
    copy: null,
    validation: null,
  },
  returns: {
    copyBarcode: "CP-11842",
    loan: null,
    fine: null,
    condition: "Good",
  },
};

export function setState(patch) {
  Object.assign(store, patch);
}

export function showToast(message) {
  store.toast = message;
  window.setTimeout(() => {
    store.toast = "";
    window.dispatchEvent(new CustomEvent("app:render"));
  }, 2600);
}
