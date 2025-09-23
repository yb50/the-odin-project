export function renderBoard(rootEl, board, { showShips = true } = {}) {
  if (!rootEl) return;
  rootEl.innerHTML = '';
  const sizeX = board.width;
  const sizeY = board.height;

  const hits = board.getHitPositions();
  const misses = board.getMissPositions();
  const ships = board.getShipPositions();

  for (let y = 0; y < sizeY; y += 1) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let x = 0; x < sizeX; x += 1) {
      const cell = document.createElement('button');
      cell.className = 'cell';
      cell.dataset.x = x;
      cell.dataset.y = y;

      const isHit = hits.some(p => p.x === x && p.y === y);
      const isMiss = misses.some(p => p.x === x && p.y === y);
      const isShip = ships.some(p => p.x === x && p.y === y);

      if (isHit) {
        cell.textContent = 'X';
      } else if (isMiss) {
        cell.textContent = '•';
      } else if (showShips && isShip) {
        cell.textContent = 'S';
      } else {
        cell.textContent = '';
      }

      row.appendChild(cell);
    }
    rootEl.appendChild(row);
  }
}

export function bindEnemyBoardClicks(rootEl, onAttack) {
  rootEl.addEventListener('click', (e) => {
    if (e.target && e.target.matches('button.cell')) {
      const x = Number(e.target.dataset.x);
      const y = Number(e.target.dataset.y);
      onAttack({ x, y });
    }
  });
}
