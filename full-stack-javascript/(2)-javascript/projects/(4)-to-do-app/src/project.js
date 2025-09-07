export class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.createdAt = new Date();
  }
}