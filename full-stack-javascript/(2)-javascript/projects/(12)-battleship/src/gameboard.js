import Ship from './ship.js';

export default class Gameboard {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.ships = [];
    this.misses = new Set();
    this.attacked = new Set();
  }

  inBounds(pos) {
    const x = pos.x;
    const y = pos.y;
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  }

  key(pos) {
    return `${pos.x},${pos.y}`;
  }

  placeShip(ship, start, direction = 'horizontal') {
    if (!(ship instanceof Ship)) return false;

    const positions = [];
    const dx = direction === 'horizontal' ? 1 : 0;
    const dy = direction === 'vertical' ? 1 : 0;

    for (let i = 0; i < ship.length; i += 1) {
      const p = { x: start.x + dx * i, y: start.y + dy * i };
      if (!this.inBounds(p)) return false;
      positions.push(p);
    }

    for (let i = 0; i < this.ships.length; i += 1) {
      const placed = this.ships[i];
      for (let j = 0; j < positions.length; j += 1) {
        const p = positions[j];
        for (let k = 0; k < placed.positions.length; k += 1) {
          const q = placed.positions[k];
          if (q.x === p.x && q.y === p.y) return false;
        }
      }
    }

    this.ships.push({ ship, positions, hits: new Set() });
    return true;
  }

  receiveAttack(pos) {
    if (!this.inBounds(pos)) return { error: 'Out of bounds' };
    const k = this.key(pos);
    if (this.attacked.has(k)) return { alreadyTried: true };
    this.attacked.add(k);

    for (let i = 0; i < this.ships.length; i += 1) {
      const entry = this.ships[i];
      for (let j = 0; j < entry.positions.length; j += 1) {
        const p = entry.positions[j];
        if (p.x === pos.x && p.y === pos.y) {
          entry.hits.add(k);
          entry.ship.hit();
          return { hit: true, sunk: entry.ship.isSunk() };
        }
      }
    }

    this.misses.add(k);
    return { hit: false };
  }

  areAllShipsSunk() {
    if (this.ships.length === 0) return false;
    for (let i = 0; i < this.ships.length; i += 1) {
      if (!this.ships[i].ship.isSunk()) return false;
    }
    return true;
  }

  getShipPositions() {
    const arr = [];
    for (let i = 0; i < this.ships.length; i += 1) {
      const positions = this.ships[i].positions;
      for (let j = 0; j < positions.length; j += 1) {
        const p = positions[j];
        arr.push({ x: p.x, y: p.y });
      }
    }
    return arr;
  }

  getHitPositions() {
    const arr = [];
    for (let i = 0; i < this.ships.length; i += 1) {
      const hits = this.ships[i].hits;
      for (const k of hits) {
        const parts = k.split(',');
        const x = Number(parts[0]);
        const y = Number(parts[1]);
        arr.push({ x, y });
      }
    }
    return arr;
  }

  getMissPositions() {
    const arr = [];
    for (const k of this.misses) {
      const parts = k.split(',');
      const x = Number(parts[0]);
      const y = Number(parts[1]);
      arr.push({ x, y });
    }
    return arr;
  }
}
