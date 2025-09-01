const form = document.getElementById("signupForm");
const statusBox = document.getElementById("form-status");
const errorEls = document.querySelectorAll(".error");

const fields = {
  email: document.getElementById("email"),
  country: document.getElementById("country"),
  postal: document.getElementById("postal"),
  password: document.getElementById("password"),
  confirm: document.getElementById("confirm"),
};

const postalRules = {
  US: { regex: /^\d{5}(-\d{4})?$/, message: "US ZIP format: 12345 or 12345-6789." },
  CA: { regex: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i, message: "Canada format: A1A 1A1." },
  NL: { regex: /^\d{4} ?[A-Z][A-Z]$/i, message: "Dutch format: 1234 AZ" },
  OTHER: { regex: /^[A-Za-z0-9\- ]{3,12}$/, message: "Enter a valid postal code." }
};

function showError(field, message) {
  const errorEl = field.parentElement.querySelector(".error");
  errorEl.textContent = message;
  field.classList.toggle("invalid", !!message);
}

function validateEmail() {
  const value = fields.email.value.trim();
  if (!value) return "Email is required.";
  if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email.";
  return "";
}

function validateCountry() {
  return fields.country.value ? "" : "Select your country.";
}

function validatePostal() {
  const value = fields.postal.value.trim();
  if (!value) return "Postal code is required.";
  const rule = postalRules[fields.country.value] || postalRules.OTHER;
  if (!rule.regex.test(value)) return rule.message;
  return "";
}

function validatePassword() {
  const value = fields.password.value;
  if (!value) return "Password is required.";
  if (value.length < 8) return "Use at least 8 characters.";
  if (!/[A-Z]/.test(value)) return "Add an uppercase letter.";
  if (!/[a-z]/.test(value)) return "Add a lowercase letter.";
  if (!/\d/.test(value)) return "Add a number.";
  if (!/\W/.test(value)) return "Add a symbol.";
  return "";
}

function validateConfirm() {
  if (!fields.confirm.value) return "Please re-enter your password.";
  if (fields.confirm.value !== fields.password.value) return "Passwords do not match.";
  return "";
}

function validateField(field) {
  let message = "";
  if (field === fields.email) message = validateEmail();
  if (field === fields.country) message = validateCountry();
  if (field === fields.postal) message = validatePostal();
  if (field === fields.password) message = validatePassword();
  if (field === fields.confirm) message = validateConfirm();
  showError(field, message);
  return !message;
}

// Runs whenever the user types in or unfocuses the field.
Object.values(fields).forEach((field) => {
  field.addEventListener("input", () => validateField(field));
  field.addEventListener("blur", () => validateField(field));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let allValid = true;
  Object.values(fields).forEach((f) => {
    if (!validateField(f)) allValid = false;
  });
  if (!allValid) {
    statusBox.textContent = "Please fix errors and try again.";
    statusBox.className = "form-status err";
    return;
  }
  statusBox.textContent = "High five! Your form submitted successfully.";
  statusBox.className = "form-status ok";
  form.reset();
  errorEls.forEach((el) => (el.textContent = ""));
  Object.values(fields).forEach((f) => f.classList.remove("invalid"));
});
