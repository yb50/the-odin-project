import Gameboard from '../gameboard.js';
import Ship from '../ship.js';

describe('Gameboard', () => {
  let board;
  beforeEach(() => {
    board = new Gameboard(10, 10);
  });

  test('places a ship horizontally without overlap', () => {
    const ship = new Ship(3);
    const placed = board.placeShip(ship, { x: 1, y: 2 }, 'horizontal');
    expect(placed).toBe(true);
  });

  test('prevents overlapping ships', () => {
    const s1 = new Ship(2);
    const s2 = new Ship(3);
    board.placeShip(s1, { x: 0, y: 0 }, 'horizontal');
    const placed = board.placeShip(s2, { x: 1, y: 0 }, 'vertical');
    expect(placed).toBe(false);
  });

  test('receiveAttack records miss', () => {
    board.receiveAttack({ x: 5, y: 5 });
    expect(board.misses.has('5,5')).toBe(true);
  });

  test('receiveAttack hits correct ship', () => {
    const s = new Ship(2);
    board.placeShip(s, { x: 3, y: 3 }, 'vertical');
    const res1 = board.receiveAttack({ x: 3, y: 3 });
    const res2 = board.receiveAttack({ x: 3, y: 4 });
    expect(res1.hit).toBe(true);
    expect(res2.hit).toBe(true);
    expect(s.isSunk()).toBe(true);
  });

  test('does not allow attacking the same spot twice', () => {
    board.receiveAttack({ x: 0, y: 0 });
    const again = board.receiveAttack({ x: 0, y: 0 });
    expect(again.alreadyTried).toBe(true);
  });

  test('reports all ships sunk', () => {
    const s1 = new Ship(1);
    const s2 = new Ship(1);
    board.placeShip(s1, { x: 0, y: 0 }, 'horizontal');
    board.placeShip(s2, { x: 2, y: 0 }, 'horizontal');
    board.receiveAttack({ x: 0, y: 0 });
    expect(board.areAllShipsSunk()).toBe(false);
    board.receiveAttack({ x: 2, y: 0 });
    expect(board.areAllShipsSunk()).toBe(true);
  });
});
