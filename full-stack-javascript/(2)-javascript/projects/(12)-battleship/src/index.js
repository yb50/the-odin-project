import Player from './player.js';
import Ship from './ship.js';
import { renderBoard, bindEnemyBoardClicks } from './ui.js';

function $(sel) { return document.querySelector(sel); }

const player = new Player('human');
const computer = new Player('computer');

const playerBoardEl = $('#player-board');
const enemyBoardEl = $('#enemy-board');
const statusEl = $('#status');

function tryPlaceRandom(board, length) {
  const ship = new Ship(length);
  let tries = 0;
  while (tries < 200) {
    const dir = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    const maxX = dir === 'horizontal' ? board.width - length : board.width - 1;
    const maxY = dir === 'vertical' ? board.height - length : board.height - 1;
    const start = {
      x: Math.floor(Math.random() * (maxX + 1)),
      y: Math.floor(Math.random() * (maxY + 1)),
    };
    if (board.placeShip(ship, start, dir)) return true;
    tries += 1;
  }
  return false;
}

function placeRandomFleet(p) {
  const lengths = [5, 4, 3, 3, 2];
  let placedAll = false;
  while (!placedAll) {
    placedAll = true;
    for (let i = 0; i < lengths.length; i += 1) {
      const ok = tryPlaceRandom(p.board, lengths[i]);
      if (!ok) {
        p.board = new Player(p.type, p.width, p.height).board;
        placedAll = false;
        break;
      }
    }
  }
}

placeRandomFleet(player);
placeRandomFleet(computer);

function update() {
  renderBoard(playerBoardEl, player.board, { showShips: true });
  renderBoard(enemyBoardEl, computer.board, { showShips: false });
  if (player.board.areAllShipsSunk()) {
    statusEl.textContent = 'You lost. All your ships are sunk.';
  } else if (computer.board.areAllShipsSunk()) {
    statusEl.textContent = 'You win! Enemy fleet destroyed.';
  } else {
    statusEl.textContent = 'Your move.';
  }
}

function computerTurn() {
  if (computer.board.areAllShipsSunk() || player.board.areAllShipsSunk()) return;
  const move = computer.getComputerMove();
  const res = player.board.receiveAttack(move);
  computer.rememberMove(move);
  if (res && res.hit) {
    computer.noteHitAndEnqueueNeighbors(move);
  }
  update();
}

function playerTurnAttack(pos) {
  if (computer.board.areAllShipsSunk() || player.board.areAllShipsSunk()) return;
  computer.board.receiveAttack(pos);
  update();
  if (!computer.board.areAllShipsSunk()) {
    setTimeout(computerTurn, 300);
  }
}

bindEnemyBoardClicks(enemyBoardEl, playerTurnAttack);
update();

const randomizeBtn = document.getElementById('randomize');
if (randomizeBtn) {
  randomizeBtn.addEventListener('click', () => {
    player.board = new Player(player.type, player.width, player.height).board;
    placeRandomFleet(player);
    update();
  });
}
