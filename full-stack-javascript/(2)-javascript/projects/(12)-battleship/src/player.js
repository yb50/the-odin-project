import Gameboard from './gameboard.js';

export default class Player {
  constructor(type = 'human', width = 10, height = 10) {
    this.type = type;
    this.board = new Gameboard(width, height);
    this.tried = new Set();
    this.width = width;
    this.height = height;
    this.targetQueue = [];
  }

  rememberMove(pos) {
    this.tried.add(`${pos.x},${pos.y}`);
  }

  noteHitAndEnqueueNeighbors(hitPos) {
    this.pushIfValid({ x: hitPos.x + 1, y: hitPos.y });
    this.pushIfValid({ x: hitPos.x - 1, y: hitPos.y });
    this.pushIfValid({ x: hitPos.x, y: hitPos.y + 1 });
    this.pushIfValid({ x: hitPos.x, y: hitPos.y - 1 });
  }

  pushIfValid(pos) {
    const key = `${pos.x},${pos.y}`;
    const inBounds = pos.x >= 0 && pos.y >= 0 && pos.x < this.width && pos.y < this.height;
    if (inBounds && !this.tried.has(key)) {
      this.targetQueue.push(pos);
    }
  }

  getComputerMove() {
    if (this.type !== 'computer') {
      throw new Error('Only computer players can generate random moves');
    }

    while (this.targetQueue.length > 0) {
      const pos = this.targetQueue.shift();
      const k = `${pos.x},${pos.y}`;
      if (!this.tried.has(k)) return pos;
    }

    let x, y, key;
    do {
      x = Math.floor(Math.random() * this.width);
      y = Math.floor(Math.random() * this.height);
      key = `${x},${y}`;
    } while (this.tried.has(key));

    return { x, y };
  }
}
