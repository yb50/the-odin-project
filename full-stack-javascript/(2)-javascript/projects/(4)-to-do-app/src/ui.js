export function buildApp(root) {
  // ----- Title -----
  const heading = document.createElement("h1");
  heading.textContent = "To-Do App";

  // ----- NEw Task Button -----
  const newButton = document.createElement("button");
  newButton.setAttribute("type", "button");
  newButton.textContent = "New Task";

  // ----- Form -----
  const form = document.createElement("form");
  form.setAttribute("autocomplete", "off");
  form.style.display = "none";

  // ----- Task Field -----
  const labelTitle = document.createElement("label");
  labelTitle.textContent = "Task Title (required)";
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("name", "title");
  inputTitle.required = true;

  // ----- Description Field -----
  const labelDesc = document.createElement("label");
  labelDesc.textContent = "Description";
  const inputDesc = document.createElement("textarea");
  inputDesc.setAttribute("name", "description");
  inputDesc.setAttribute("rows", "3");

  // ----- Due Date Field -----
  const labelDue = document.createElement("label");
  labelDue.textContent = "Due Date";
  const inputDue = document.createElement("input");
  inputDue.setAttribute("type", "date");
  inputDue.setAttribute("name", "dueDate");

  // ----- Priority Field -----
  const labelPrio = document.createElement("label");
  labelPrio.textContent = "Priority";
  const selectPrio = document.createElement("select")
  selectPrio.setAttribute("name", "priority");

  const lowPrio = document.createElement("option");
  lowPrio.value = "low";
  lowPrio.textContent = "low";
  const medPrio = document.createElement("option");
  medPrio.value = "medium";
  medPrio.textContent = "medium";
  const highPrio = document.createElement("option");
  highPrio.value = "high";
  highPrio.textContent = "high";

  selectPrio.appendChild(lowPrio);
  selectPrio.appendChild(medPrio);
  selectPrio.appendChild(highPrio);

  // ----- Notes -----
  const labelNotes = document.createElement("label");
  labelNotes.textContent = "Notes";
  const inputNotes = document.createElement("textarea");
  inputNotes.setAttribute("name", "notes");
  inputNotes.setAttribute("rows", "2")

  // ----- Checklist -----
  const labelChecklist = document.createElement("label");
  labelChecklist.textContent = "Checklist";
  
  const checklistControls = document.createElement("div");
  
  const checklistTextInput = document.createElement("input");
  checklistTextInput.setAttribute("type", "text");
  checklistTextInput.setAttribute("place", "Add subtask text");

  const checklistAddBtn = document.createElement("button");
  checklistAddBtn.setAttribute("type", "button");
  checklistAddBtn.textContent = "Add Subtask";

  checklistControls.appendChild(checklistTextInput);
  checklistControls.appendChild(checklistAddBtn);

  const checklistListInForm = document.createElement("ul");
  checklistListInForm.className = "checklist";

  checklistAddBtn.addEventListener("click", function () {
    
  });

  // -----  -----
}