import "./styles.css";
import { loadHome } from "./home.js";
import { loadMenu } from "./menu.js";
import { loadContact } from "./contact.js";

function clearContent() {
  const content = document.querySelector("#content");
  content.textContent = "";
}

function setActiveButton(activeId) {
  const buttonIds = ["btn-home", "btn-menu", "btn-contact"];

  buttonIds.forEach((id) => {
    const btn = document.getElementById(id);
    
    if (!btn) return;
    if (btn === activeId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function showHome() {
  clearContent();
  setActiveButton("btn-home");
  loadHome();
}

function showMenu() {
  clearContent();
  setActiveButton("btn-menu");
  loadMenu();
}

function showContact() {
  clearContent();
  setActiveButton("btn-contact");
  loadContact();
}

document.getElementById("btn-home").addEventListener("click", showHome);
document.getElementById("btn-menu").addEventListener("click", showMenu);
document.getElementById("btn-contact").addEventListener("click", showContact);

showHome();