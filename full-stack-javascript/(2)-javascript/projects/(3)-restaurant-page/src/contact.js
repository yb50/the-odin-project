export function loadContact() {
  const content = document.querySelector("#content");

  const container = document.createElement("div");
  container.className = "tab tab-contact";

  const title = document.createElement("h2");
  title.textContent = "Contact";

  const phone = document.createElement("p");
  phone.textContent = "123-456-7890"

  const address = document.createElement("p");
  address.textContent = "Baklava Street 50, Kebab City";

  const hours = document.createElement("p");
  hours.textContent = "Mon-Sun: 11:00-22:00";

  container.appendChild(title);
  container.appendChild(phone);
  container.appendChild(address);
  container.appendChild(hours);

  content.appendChild(container);
}