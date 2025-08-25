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
    
    if (!btn) {
      return;
    }

    if (btn === activeId) {
      btn.classList.add("active");
    }
  })

}



console.log("Webpack is working ✅");

loadHome();
loadMenu();
loadContact();


loadPage();
