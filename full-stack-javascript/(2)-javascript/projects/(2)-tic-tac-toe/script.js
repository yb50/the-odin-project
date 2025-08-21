(() => {
  // ----- Player Factory -----
  function createPlayer(name, mark) {
    return { name, mark };
  }

  // ----- Gameboard (IIFE) -----
  const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    function placeMark(index, mark) {
      if (board[index] === "") {
        board[index] = mark;
        return true;
      }
      return false;
    }

    function clearBoard() {
      for (let i = 0; i < board.length; i++) board[i] = "";
    }

    return { board, placeMark, clearBoard };
  })();

  // ----- Game Controller (IIFE) -----
  const GameController = (() => {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    let players = [createPlayer("", "X"), createPlayer("", "O")];
    let current = 0;
    let gameOver = false;
    let winner = null;
    let moveCount = 0;

    function start(options) {
      const p1 = options && options.p1;
      const p2 = options && options.p2;
      if (typeof p1 === "string") players[0].name = p1.trim();
      if (typeof p2 === "string") players[1].name = p2.trim();

      Gameboard.clearBoard();
      current = 0;
      gameOver = false;
      winner = null;
      moveCount = 0;

      return getStatus();
    }

    function playAt(index) {
      if (gameOver) return false;

      const mark = players[current].mark;
      const placed = Gameboard.placeMark(index, mark);
      if (!placed) return false;

      moveCount += 1;

      if (checkWin(mark)) {
        gameOver = true;
        winner = players[current];
      } else if (moveCount === 9) {
        gameOver = true;
      } else {
        current = 1 - current;
      }

      return true;
    }

    function checkWin(mark) {
      const board = Gameboard.board;
      for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i];
        if (board[a] === mark && board[b] === mark && board[c] === mark) {
          return true;
        }
      }
      return false;
    }

    function getStatus() {
      if (winner) {
        const name = winner.name || (winner.mark === "X" ? "Player X" : "Player O");
        return { type: "win", text: `${name} wins!` };
      }
      if (gameOver && !winner) {
        return { type: "tie", text: "It's a tie!" };
      }
      const p = players[current];
      const name = p.name || (p.mark === "X" ? "Player X" : "Player O");
      return { type: "turn", text: `${name}'s turn (${p.mark})` };
    }

    function isOver() { return gameOver; }

    function getPlayers() {
      return [
        { name: players[0].name, mark: players[0].mark },
        { name: players[1].name, mark: players[1].mark }
      ];
    }

    return { start, playAt, getStatus, isOver, getPlayers };
  })();

  // -------- Display Controller (IIFE) --------
  const DisplayController = (() => {
    const boardEl = document.getElementById("board");
    const cells = Array.from(boardEl.querySelectorAll(".cell"));
    const statusEl = document.getElementById("status");
    const setupForm = document.getElementById("setupForm");
    const startBtn = document.getElementById("startBtn");

    const status = GameController.getStatus;
    const isOver = GameController.isOver;

    function renderBoard() {
      const data = Gameboard.board;
      cells.forEach((btn, i) => {
        btn.textContent = data[i];
        btn.disabled = data[i] !== "" || isOver();
      });
    }

    function renderStatus() {
      const s = status();
      statusEl.textContent = s.text;
    }

    function handleCellClick(e) {
      const idx = Number(e.currentTarget.getAttribute("data-index"));
      const ok = GameController.playAt(idx);
      if (!ok) return;

      renderBoard();
      renderStatus();

      if (isOver()) {
        cells.forEach((btn) => (btn.disabled = true));
      }
    }

    function wireEvents() {
      cells.forEach((btn) => btn.addEventListener("click", handleCellClick));

      setupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const p1 = setupForm.p1.value.trim();
        const p2 = setupForm.p2.value.trim();
        GameController.start({ p1, p2 });
        renderBoard();
        renderStatus();
      });
    }

    function init() {
      wireEvents();
      GameController.start();
      renderBoard();
      renderStatus();
    }

    return { init };
  })();

  DisplayController.init();
})();
