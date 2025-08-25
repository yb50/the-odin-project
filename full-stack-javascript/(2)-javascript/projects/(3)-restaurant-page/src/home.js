export function loadHome() {
  const content = document.querySelector("#content");

  const container = document.createElement("div");
  container.className = "tab tab-home";

  const title = document.createElement("h2");
  title.textContent = "Welcome to Dough n' Meat";

  const motto = document.createElement("p");
  motto.textContent = "Traditional dishes made of dough and meat, locally sourced, served with a smile";

  container.appendChild(title);
  container.appendChild(motto);

  content.appendChild(container);
}