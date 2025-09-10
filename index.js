let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#button");
let turnO = true; // true for O's turn, false for X's turn

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent !== "") return;

    const currentPlayer = turnO ? "O" : "X";
    box.textContent = currentPlayer;
    box.classList.add(currentPlayer);

    if (checkWinner(currentPlayer)) {
      setTimeout(() => {
        alert(`${currentPlayer} wins!`);
        resetGame();
      }, 100);
    } else if (isDraw()) {
      setTimeout(() => {
        alert("It's a draw!");
        resetGame();
      }, 100);
    }

    turnO = !turnO; // switch turn
  });
});

function checkWinner(player) {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      boxes[a].textContent === player &&
      boxes[b].textContent === player &&
      boxes[c].textContent === player
    );
  });
}

function isDraw() {
  return [...boxes].every(box => box.textContent !== "");
}

function resetGame() {
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.remove("X", "O");
  });
  turnO = true;
}

resetButton.addEventListener("click", resetGame);