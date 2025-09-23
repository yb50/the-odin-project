import Ship from '../ship.js';

describe('Ship', () => {
  test('initializes with length and zero hits', () => {
    const s = new Ship(3);
    expect(s.length).toBe(3);
    expect(s.hits).toBe(0);
    expect(s.isSunk()).toBe(false);
  });

  test('hit() increases hits until sunk', () => {
    const s = new Ship(2);
    s.hit();
    expect(s.hits).toBe(1);
    expect(s.isSunk()).toBe(false);
    s.hit();
    expect(s.hits).toBe(2);
    expect(s.isSunk()).toBe(true);
  });

  test('hits do not exceed length', () => {
    const s = new Ship(1);
    s.hit();
    s.hit();
    expect(s.hits).toBe(1);
    expect(s.isSunk()).toBe(true);
  });
});
