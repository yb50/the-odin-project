import Player from '../player.js';

describe('Player', () => {
  test('initializes with a gameboard', () => {
    const p = new Player('human');
    expect(p.board).toBeDefined();
    expect(p.board.width).toBe(10);
    expect(p.board.height).toBe(10);
  });

  test('computer generates legal, non-repeating moves', () => {
    const c = new Player('computer', 5, 5);
    const seen = new Set();
    for (let i = 0; i < 25; i += 1) {
      const move = c.getComputerMove();
      expect(move.x).toBeGreaterThanOrEqual(0);
      expect(move.y).toBeGreaterThanOrEqual(0);
      expect(move.x).toBeLessThan(5);
      expect(move.y).toBeLessThan(5);
      const key = `${move.x},${move.y}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
      c.rememberMove(move);
    }
  });
});
