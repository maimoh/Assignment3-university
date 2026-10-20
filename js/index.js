const form = document.getElementById("regForm");

// Each rule returns an error message, or "" if the value is fine.
const rules = {
  name(v) {
    if (v.trim() === "") return "Name is required.";
    if (v.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  },
  email(v) {
    if (v.trim() === "") return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Enter a valid email like name@example.com.";
    return "";
  },
  password(v) {
    if (v === "") return "Password is required.";
    if (v.length < 8) return "Password must be at least 8 characters.";
    return "";
  },
  confirm(v) {
    if (v === "") return "Please confirm your password.";
    if (v !== document.getElementById("password").value) return "Passwords do not match.";
    return "";
  },
  age(v) {
    if (v.trim() === "") return "Age is required.";
    if (!/^\d+$/.test(v.trim())) return "Age must be a whole number.";
    const n = Number(v);
    if (n < 18 || n > 120) return "Age must be between 18 and 120.";
    return "";
  }
};

function validateField(id) {
  const input = document.getElementById(id);
  const message = rules[id](input.value);
  document.getElementById(id + "Error").textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "");
  return message === "";
}

form.addEventListener("submit", function (event) {
  let allValid = true;
  for (const id of Object.keys(rules)) {
    if (!validateField(id)) allValid = false;
  }
  if (!allValid) {
    event.preventDefault(); 
    document.getElementById("success").textContent = "";
    return;
  }
  event.preventDefault(); 
  document.getElementById("success").textContent = "Form is valid and ready to send.";
});


for (const id of Object.keys(rules)) {
  const input = document.getElementById(id);
  input.addEventListener("blur", () => validateField(id));
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) validateField(id);
  });
}