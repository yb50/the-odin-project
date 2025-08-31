const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const menu = toggle.nextElementSibling;

    menu.classList.toggle("show");

    document.querySelectorAll("dropdown-menu").forEach(m => {
      if (m !== menu) {
        m.classList.remove("show");
      }
    });
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-menu").forEach(m => {
      m.classList.remove("show");
    });
  }
});