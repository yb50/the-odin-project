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
    const text = checklistTextInput.value.trim();
    if (!text) return;

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = false;

    const span = document.createElement("span");
    span.textContent = " " + text;

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("type", "button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      checklistListInForm.removeChild(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeBtn);
    checklistListInForm.appendChild(li);

    checklistTextInput.value = "";
    checklistTextInput.focus();
  });

  // ----- Buttons Row -----
  const buttonsRow = document.createElement("div");

  const saveButton = document.createElement("button");
  saveButton.setAttribute("type", "submit");
  saveButton.textContent = "Save";

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("type", "button");
  cancelButton.textContent = "Cancel";

  buttonsRow.appendChild(saveButton);
  buttonsRow.appendChild(cancelButton);

  // ----- Form elements appended -----
  form.appendChild(labelTitle);
  form.appendChild(inputTitle);
  form.appendChild(labelDesc);
  form.appendChild(inputDesc);
  form.appendChild(labelDue);
  form.appendChild(inputDue);
  form.appendChild(labelPrio);
  form.appendChild(selectPrio);
  form.appendChild(labelNotes);
  form.appendChild(inputNotes);
  form.appendChild(labelChecklist);
  form.appendChild(checklistControls);
  form.appendChild(checklistListInForm);
  form.appendChild(buttonsRow);

  // ----- List for all todos-----
  const listContainer = document.createElement("div");

  // ----- Root elements appended -----
  root.appendChild(heading);
  root.appendChild(newButton);
  root.appendChild(form);
  root.appendChild(listContainer);

  // ----- Event handler -----
  let handleSubmit = null;
  let handleToggle = null;
  let handleToggleChecklist = null;
  let handleRemove = null;
  let handleClear = null;

  // ----- Show Form -----
  newButton.addEventListener("click", function () {
    form.style.display = "block";
  });

  // ----- Cancel Form -----
  cancelButton.addEventListener("click", function () {
    form.reset();
    form.style.display = "none";
    checklistListInForm.innerHTML = "";
  });

  // ----- Submit Form -----
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const titleValue = inputTitle.value.trim();

    if (!titleValue) {
      alert("Please fill in the required field");
      return;
    }

    const checklistArray = [];
    const lis = checklistListInForm.querySelectorAll("li");

    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      const cb = li.querySelector('input[type="checkbox"]');
      const span = li.querySelector("span");

      let text = "";
      if (span) {
        text = span.textContent.trim();
      }

      checklistArray.push({ text: text, done: cb ? cb.checked : false });
    }

    const data = {
      title: titleValue,
      description: descValue,
      dueDate: dueValue,
      priority: prioValue,
      notes: notesValue,
      checklist: checklistArray
    };

    if (handleSubmit) handleSubmit(data);

    form.reset();
    form.style.display = "none";
    checklistListInForm.innerHTML = "";
  });

  // ----- API for index.js -----
  function showEmpty() {
    listContainer.innerHTML = "<p>No ti-dos yet. Click <b>New To-Do</b> to add one.</p>";
  }

  function renderTodos(todos) {
    if (!todos || todos.length === 0) {
      showEmpty();
      return;
    }

    listContainer.innerHTML = "";

    const list = document.createElement("ul");

    for (let i = 0; i < todos.length; i++) {
      let t = todos[i];

      const item = document.createElement("li");
      item.className = "todo-item";
      if (t.done) {
        item.classList.add("done");
      }

      const topLine = document.createElement("div");
      let dueText = "";
      try {
        let d = new Date(t.dueDate);
        dueText = d.toISOString().slice(0, 10);
      } catch (e) {
        dueText = "";
      }
      topLine.textContent = (t.title || "") + " - " + (t.priority || "") + " - due " + dueText;

      const desc = document.createElement("div");
      desc.textContent = t.description || "";

      item.appendChild(topLine);
      item.appendChild(desc);

      if (t.notes) {
        const notes = document.createElement("div");
        notes.textContent = "Notes: " + t.notes;
        item.appendChild(notes);
      }

      if (t.checklist && t.checklist.length > 0) {
        const ulChecklist = document.createElement("ul");
        ulChecklist.className = "checklist";
        for (var j = 0; j <t.checklist.length; j++) {
          const liChecklist = document.createElement("li");

          const cb = document.createElement("input");
          cb.setAttribute("type", "checkbox");
          cb.checked = !!t.checklist[j].done;

          (function (todoId, index) {
            cb.addEventListener("change", function () {
              if (handleToggleChecklist) {
                handleToggleChecklist(todoId, index);
              }
            });
          })(t.id, j);

          const textNode = document.createTextNode(" " + t.checklist[j].text);

          liChecklist.appendChild(cb);
          liChecklist.appendChild(textNode);
          ulChecklist.appendChild(liChecklist);
        }
        item.appendChild(ulChecklist);
      }

      const actions = document.createElement("div");
      actions.className = "todo-actions";

      const doneBtn = document.createElement("button");
      doneBtn.setAttribute("type", "button");
      doneBtn.textContent = t.done ? "Mark Undone" : "Mark Done";
      (function (todoId) {
        doneBtn.addEventListener("click", function () {
          if (handleToggle) handleToggle(todoId);
        });
      })(t.id);

      const removeBtn = document.createElement("button");
      removeBtn.setAttribute("type", "button");
      removeBtn.textContent = "Remove";
      (function (todoId) {
        removeBtn.addEventListener("click", function () {
          if (handleRemove) handleRemove(todoId);
        });
      })(t.id);

      actions.appendChild(doneBtn);
      actions.appendChild(removeBtn);
      item.appendChild(actions);

      item.appendChild(item);
    }

    const clearBtn = document.createElement("button");
    clearBtn.setAttribute("type", "button");
    clearBtn.textContent = "Clear";
    clearBtn.addEventListener("click", function() {
      if (handleClear) handleClear();
    });

    listContainer.appendChild(list);
    listContainer.appendChild(clearBtn);
  }

  function setHandlers(handlers) {
    handleSubmit = handlers.onSubmit;
    handleToggle = handlers.onToggle;
    handleToggleChecklist = handlers.onToggleChecklist;
    handleRemove = handlers.onRemove;
    handleClear = handlers.onClear;
  }

  return {
    showEmpty: showEmpty,
    renderTodos: renderTodos,
    setHandlers: setHandlers
  };
}