export default class Ship {
  constructor(length) {
    if (typeof length !== 'number' || length <= 0) {
      throw new Error('Ship length must be a positive number');
    }
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1;
    }
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
