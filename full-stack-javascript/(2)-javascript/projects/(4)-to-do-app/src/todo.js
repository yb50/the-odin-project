export class Todo {
  constructor(title, description, dueDate, priority, notes = "", checklist = []) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.done = false;
    this.createdAt = new Date();
  }

  toggleDone() {
    this.done = !this.done;
  }

  addChecklistItem(text) {
    this.checklist.push({ text, done: false });
  }

  toggleChecklistItem(index) {
    if (this.checklist[index]) {
      this.checklist[index].done = !this.checklist[index].done;
    }
  }

  updateNotes(newNotes) {
    this.notes = newNotes;
  }
}