export function buildApp(root) {
  // ----- Header -----
  const heading = document.createElement("h1");
  heading.textContent = "To-Do App";

  // ----- Layout Container -----
  const layout = document.createElement("div");
  layout.style.display = "grid";
  layout.style.gridTemplateColumns = "220px 1fr";
  layout.style.gap = "16px";

  // ----- Projects Panel -----
  const projectsPanel = document.createElement("div");
  const projectsTitle = document.createElement("h2");
  projectsTitle.textContent = "Projects";
  projectsTitle.style.fontSize = "1.1rem";
  projectsTitle.style.marginBottom = "8px";

  const projectsList = document.createElement("ul");
  projectsList.style.listStyle = "none";

  const projectForm = document.createElement("form");
  projectForm.autocomplete = "off";
  projectForm.style.marginTop = "8px";
  const projectInput = document.createElement("input");
  projectInput.type = "text";
  projectInput.placeholder = "New project name";
  const projectAddBtn = document.createElement("button");
  projectAddBtn.type = "submit";
  projectAddBtn.textContent = "Add Project";
  projectForm.appendChild(projectInput);
  projectForm.appendChild(projectAddBtn);

  projectsPanel.appendChild(projectsTitle);
  projectsPanel.appendChild(projectsList);
  projectsPanel.appendChild(projectForm);

  const mainPanel = document.createElement("div");

  // ----- New Task Button -----
  const newButton = document.createElement("button");
  newButton.type = "button";
  newButton.textContent = "New Task";

  // ----- Form -----
  const form = document.createElement("form");
  form.autocomplete = "off";
  form.style.display = "none";

  const labelTitle = document.createElement("label");
  labelTitle.textContent = "Task Title (required)";
  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.name = "title";
  inputTitle.required = true;

  const labelDesc = document.createElement("label");
  labelDesc.textContent = "Description";
  const inputDesc = document.createElement("textarea");
  inputDesc.name = "description";
  inputDesc.rows = 3;

  const labelDue = document.createElement("label");
  labelDue.textContent = "Due Date";
  const inputDue = document.createElement("input");
  inputDue.type = "date";
  inputDue.name = "dueDate";

  const labelPrio = document.createElement("label");
  labelPrio.textContent = "Priority";
  const selectPrio = document.createElement("select");
  selectPrio.name = "priority";
  ["low", "medium", "high"].forEach(function (p) {
    const opt = document.createElement("option");
    opt.value = p; opt.textContent = p;
    selectPrio.appendChild(opt);
  });

  const labelProject = document.createElement("label");
  labelProject.textContent = "Project";
  const selectProject = document.createElement("select");
  selectProject.name = "projectId";

  const labelNotes = document.createElement("label");
  labelNotes.textContent = "Notes";
  const inputNotes = document.createElement("textarea");
  inputNotes.name = "notes";
  inputNotes.rows = 2;

  const labelChecklist = document.createElement("label");
  labelChecklist.textContent = "Checklist";
  const checklistControls = document.createElement("div");
  const checklistTextInput = document.createElement("input");
  checklistTextInput.type = "text";
  checklistTextInput.placeholder = "Add subtask text";
  const checklistAddBtn = document.createElement("button");
  checklistAddBtn.type = "button";
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
    checkbox.type = "checkbox";
    const span = document.createElement("span");
    span.textContent = " " + text;
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
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

  const buttonsRow = document.createElement("div");
  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.textContent = "Save";
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  buttonsRow.appendChild(saveButton);
  buttonsRow.appendChild(cancelButton);

  form.appendChild(labelTitle); form.appendChild(inputTitle);
  form.appendChild(labelDesc); form.appendChild(inputDesc);
  form.appendChild(labelDue); form.appendChild(inputDue);
  form.appendChild(labelPrio); form.appendChild(selectPrio);
  form.appendChild(labelProject); form.appendChild(selectProject);
  form.appendChild(labelNotes); form.appendChild(inputNotes);
  form.appendChild(labelChecklist); form.appendChild(checklistControls);
  form.appendChild(checklistListInForm);
  form.appendChild(buttonsRow);

  // ----- List Container -----
  const listContainer = document.createElement("div");

  // ----- Layout Assembly -----
  mainPanel.appendChild(newButton);
  mainPanel.appendChild(form);
  mainPanel.appendChild(listContainer);
  layout.appendChild(projectsPanel);
  layout.appendChild(mainPanel);

  root.appendChild(heading);
  root.appendChild(layout);

  // ----- Handlers Set By index.js -----
  var handleSubmit = null;
  var handleToggle = null;
  var handleToggleChecklist = null;
  var handleRemove = null;
  var handleClear = null;
  var handleProjectAdd = null;
  var handleProjectSelect = null;
  var handleEdit = null;

  // ----- Show/Hide Form -----
  newButton.addEventListener("click", function () { form.style.display = "block"; });
  cancelButton.addEventListener("click", function () {
    form.reset(); form.style.display = "none"; checklistListInForm.innerHTML = "";
  });

  // ----- Submit New Todo -----
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const titleValue = inputTitle.value.trim();
    const descValue = inputDesc.value.trim();
    const dueValue = inputDue.value;
    const prioValue = selectPrio.value;
    const projectId = selectProject.value;
    const notesValue = inputNotes.value.trim();

    if (!titleValue) { alert("Please fill in the required field"); return; }

    const checklistArray = [];
    const lis = checklistListInForm.querySelectorAll("li");
    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      const cb = li.querySelector('input[type="checkbox"]');
      const span = li.querySelector("span");
      const text = span ? span.textContent.trim() : "";
      checklistArray.push({ text: text, done: cb ? cb.checked : false });
    }

    const data = {
      title: titleValue,
      description: descValue,
      dueDate: dueValue,
      priority: prioValue,
      projectId: projectId,
      notes: notesValue,
      checklist: checklistArray
    };

    if (handleSubmit) handleSubmit(data);
    form.reset(); form.style.display = "none"; checklistListInForm.innerHTML = "";
  });

  // ----- Public API -----
  function renderProjects(projects, activeProjectId) {
    projectsList.innerHTML = "";
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = p.name + (p.id === activeProjectId ? " ✓" : "");
      btn.addEventListener("click", function () {
        if (handleProjectSelect) handleProjectSelect(p.id);
      });
      li.appendChild(btn);
      projectsList.appendChild(li);
    }
    
    selectProject.innerHTML = "";
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      if (p.id === activeProjectId) opt.selected = true;
      selectProject.appendChild(opt);
    }
  }

  projectForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = projectInput.value.trim();
    if (!name) return;
    if (handleProjectAdd) handleProjectAdd(name);
    projectInput.value = "";
  });

  function showEmpty() {
    listContainer.innerHTML = "<p>No to-dos yet. Click <b>New Task</b> to add one.</p>";
  }

  function renderTodos(todos) {
    if (!todos || todos.length === 0) { showEmpty(); return; }
    listContainer.innerHTML = "";
    const list = document.createElement("ul");

    for (let i = 0; i < todos.length; i++) {
      const t = todos[i];

      const item = document.createElement("li");
      item.className = "todo-item";
      if (t.done) item.classList.add("done");

      const topLine = document.createElement("div");
      let dueText = "";
      try { const d = new Date(t.dueDate); dueText = d.toISOString().slice(0, 10); } 
      catch (e) { dueText = ""; }
      topLine.textContent = (t.title || "") + " — due " + dueText;

      const pr = document.createElement("span");
      pr.textContent = " [" + (t.priority || "low") + "]";
      topLine.appendChild(pr);

      const details = document.createElement("div");
      details.style.display = "none";
      const desc = document.createElement("div");
      desc.textContent = "Description: " + (t.description || "");
      details.appendChild(desc);
      if (t.notes) {
        const notesEl = document.createElement("div");
        notesEl.textContent = "Notes: " + t.notes;
        details.appendChild(notesEl);
      }
      if (t.checklist && t.checklist.length > 0) {
        const ulChecklist = document.createElement("ul");
        ulChecklist.className = "checklist";
        for (let j = 0; j < t.checklist.length; j++) {
          const liChecklist = document.createElement("li");
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.checked = !!t.checklist[j].done;
          (function (todoId, index) {
            cb.addEventListener("change", function () {
              if (handleToggleChecklist) handleToggleChecklist(todoId, index);
            });
          })(t.id, j);
          const textNode = document.createTextNode(" " + t.checklist[j].text);
          liChecklist.appendChild(cb);
          liChecklist.appendChild(textNode);
          ulChecklist.appendChild(liChecklist);
        }
        details.appendChild(ulChecklist);
      }

      // ----- Actions -----
      const actions = document.createElement("div");
      actions.className = "todo-actions";

      const detailsBtn = document.createElement("button");
      detailsBtn.type = "button";
      detailsBtn.textContent = "Details";
      detailsBtn.addEventListener("click", function () {
        details.style.display = details.style.display === "none" ? "block" : "none";
      });

      const doneBtn = document.createElement("button");
      doneBtn.type = "button";
      doneBtn.textContent = t.done ? "Mark Undone" : "Mark Done";
      (function (todoId) {
        doneBtn.addEventListener("click", function () {
          if (handleToggle) handleToggle(todoId);
        });
      })(t.id);

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.textContent = "Edit";
      (function (todo) {
        editBtn.addEventListener("click", function () {
          
          const newTitle = prompt("Title:", todo.title);
          if (newTitle == null) return;
          const newDesc = prompt("Description:", todo.description || "");
          if (newDesc == null) return;
          const newDue = prompt("Due date (YYYY-MM-DD):", (function () {
            try { return new Date(todo.dueDate).toISOString().slice(0, 10); } 
            catch (e) { return ""; }
          })());
          if (newDue == null) return;
          const newPrio = prompt('Priority ("low", "medium", "high"):', todo.priority || "low");
          if (newPrio == null) return;
          if (handleEdit) handleEdit(todo.id, { title: newTitle.trim(), description: newDesc.trim(), dueDate: newDue, priority: newPrio.trim() });
        });
      })(t);

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "Remove";
      (function (todoId) {
        removeBtn.addEventListener("click", function () {
          if (handleRemove) handleRemove(todoId);
        });
      })(t.id);

      actions.appendChild(detailsBtn);
      actions.appendChild(doneBtn);
      actions.appendChild(editBtn);
      actions.appendChild(removeBtn);

      item.appendChild(topLine);
      item.appendChild(details);
      item.appendChild(actions);
      list.appendChild(item);
    }

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.textContent = "Clear Completed";
    clearBtn.addEventListener("click", function () {
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
    handleProjectAdd = handlers.onProjectAdd;
    handleProjectSelect = handlers.onProjectSelect;
    handleEdit = handlers.onEdit;
  }

  return {
    renderProjects: renderProjects,
    showEmpty: showEmpty,
    renderTodos: renderTodos,
    setHandlers: setHandlers
  };
}