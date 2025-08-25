export function loadPage() {
  const content = document.querySelector("#content");

  const message = document.createElement("h2");
  message.textContent = "Welcome to my restaurant!";

  const button = document.createElement("button");
  button.textContent = "Test";

  content.appendChild(message);
  content.appendChild(button);
}
