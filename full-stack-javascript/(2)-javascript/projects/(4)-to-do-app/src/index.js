import "./styles.css";
import { Todo } from "./todo.js";
import { TodoStore } from "./data.js";
import { buildApp } from "./ui.js";

const content = document.getElementById("content");
const store = new TodoStore();
const app = buildApp(content);

app.setHandlers({
  onSubmit: function (data) {
    const todo = new Todo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
      data.notes,
      data.checklist
    );
    
    store.add(todo, data.projectId);
    render();
  },
  onToggle: function (id) {
    store.toggle(id); render();
  },
  onToggleChecklist: function (id, index) {
    store.toggleChecklist(id, index); render();
  },
  onRemove: function (id) {
    store.remove(id); render();
  },
  onClear: function () {
    store.clearCompleted(); render();
  },
  onProjectAdd: function (name) {
    store.addProject(name); render();
  },
  onProjectSelect: function (id) {
    store.setActiveProject(id); render();
  },
  onEdit: function (id, fields) {
    store.update(id, fields); render();
  }
});

function render() {
  const projects = store.getProjects();
  const activeId = store.getActiveProjectId();
  app.renderProjects(projects, activeId);

  const items = store.all();
  if (items.length === 0) app.showEmpty();
  else app.renderTodos(items);
}

render();
