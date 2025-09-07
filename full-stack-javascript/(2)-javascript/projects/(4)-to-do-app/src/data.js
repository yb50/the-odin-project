import { Project } from "./project.js";
import { Todo } from "./todo.js";

const KEY = "todo.app.v1";

export class TodoStore {
  constructor() {
    this.state = this.load();
    this.ensureDefaultProject();
  }

  // ----- Projects -----
  getProjects() {
    return this.state.projects.slice();
  }

  addProject(name) {
    const p = new Project(name || "Untitled");
    this.state.projects.push(p);
    this.state.activeProjectId = p.id;
    this.save();
    return p;
  }

  setActiveProject(id) {
    const exists = this.state.projects.some(function (p) { return p.id === id; });
    if (exists) {
      this.state.activeProjectId = id;
      this.save();
    }
  }

  getActiveProjectId() {
    return this.state.activeProjectId;
  }

  removeProject(id) {
    if (!id) return;
    const defId = this.getDefaultProjectId();
    if (id === defId) return; 
    
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i].projectId === id) {
        this.state.todos[i].projectId = defId;
      }
    }
    
    this.state.projects = this.state.projects.filter(function (p) { return p.id !== id; });
    
    if (this.state.activeProjectId === id) this.state.activeProjectId = defId;
    this.save();
  }

  ensureDefaultProject() {
    if (!this.state.projects || this.state.projects.length === 0) {
      const p = new Project("Inbox");
      this.state.projects = [p];
      this.state.activeProjectId = p.id;

      for (let i = 0; i < this.state.todos.length; i++) {
        if (!this.state.todos[i].projectId) this.state.todos[i].projectId = p.id;
      }
      this.save();
    }
  }

  getDefaultProjectId() {
    return this.state.projects[0] ? this.state.projects[0].id : null;
  }

  // ----- Todos -----
  all() {
    const pid = this.state.activeProjectId;
    return this.state.todos.filter(function (t) { return t.projectId === pid; });
  }

  allInProject(projectId) {
    return this.state.todos.filter(function (t) { return t.projectId === projectId; });
  }

  add(todo, projectId) {
    if (!(todo instanceof Todo)) {
      todo = new Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.notes, todo.checklist);
      if (todo.id == null) todo.id = crypto.randomUUID();
    }
    todo.projectId = projectId || this.state.activeProjectId || this.getDefaultProjectId();
    this.state.todos.push(todo);
    this.save();
  }

  update(id, fields) {
    const t = this.state.todos.find(function (x) { return x.id === id; });
    if (t) {
      if (fields.title != null) t.title = fields.title;
      if (fields.description != null) t.description = fields.description;
      if (fields.dueDate != null) t.dueDate = new Date(fields.dueDate);
      if (fields.priority != null) t.priority = fields.priority;
      if (fields.notes != null) t.notes = fields.notes;
      if (fields.checklist != null) t.checklist = fields.checklist;
      if (fields.projectId != null) t.projectId = fields.projectId;
      this.save();
    }
  }

  toggle(id) {
    const t = this.state.todos.find(function (x) { return x.id === id; });
    if (t) { t.done = !t.done; this.save(); }
  }

  toggleChecklist(id, index) {
    const t = this.state.todos.find(function (x) { return x.id === id; });
    if (t && t.checklist && t.checklist[index]) {
      t.checklist[index].done = !t.checklist[index].done;
      this.save();
    }
  }

  remove(id) {
    this.state.todos = this.state.todos.filter(function (x) { return x.id !== id; });
    this.save();
  }

  clearCompleted() {
    this.state.todos = this.state.todos.filter(function (x) { return !x.done; });
    this.save();
  }

  // ----- Persistant Storage -----
  save() {
    localStorage.setItem(KEY, JSON.stringify(this.state));
  }

  load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        
        const legacyRaw = localStorage.getItem("todo.items.v1");
        if (legacyRaw) {
          const legacyArr = JSON.parse(legacyRaw);
          return this.rehydrateFromLegacy(legacyArr);
        }
        return { projects: [], todos: [], activeProjectId: null };
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return { projects: [], todos: [], activeProjectId: null };
      }
      
      parsed.todos = this.rehydrateTodos(parsed.todos || []);
      parsed.projects = Array.isArray(parsed.projects) ? parsed.projects : [];
      return parsed;
    } catch (e) {
      console.warn("Could not load app state:", e);
      return { projects: [], todos: [], activeProjectId: null };
    }
  }

  rehydrateTodos(arr) {
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      const o = arr[i] || {};
      const t = new Todo(
        o.title || "",
        o.description || "",
        o.dueDate ? new Date(o.dueDate) : "",
        o.priority || "low",
        o.notes || "",
        Array.isArray(o.checklist) ? o.checklist : []
      );
      
      t.id = o.id || t.id;
      t.done = !!o.done;
      t.createdAt = o.createdAt ? new Date(o.createdAt) : new Date();
      t.projectId = o.projectId || null;
      out.push(t);
    }
    return out;
  }

  rehydrateFromLegacy(legacyTodos) {
    const todos = this.rehydrateTodos(Array.isArray(legacyTodos) ? legacyTodos : []);
    return { projects: [], todos: todos, activeProjectId: null };
  }
}
