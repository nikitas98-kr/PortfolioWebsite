const info = document.getElementById("info");
const player = document.getElementById("player");
let position = 1;

// Define X,Y coordinates for each cell (1–100)
const boardMap = [];

for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    let x = col * 51.2; // 512px / 10 = 51.2
    let y = (9 - row) * 51.2; // flip vertically
    if (row % 2 === 1) {
      x = 512 - x - 51.2; // reverse direction on odd rows
    }
    boardMap.push({ x, y });
  }
}

// Snake and Ladder logic (adjust according to the image)
const snakes = {
  38: 20,
  45: 7,
  51: 10,
  76: 54,
  91: 73,
  97: 61
};

const ladders = {
   5: 68,
  14: 49,
  42: 60,
  53: 72,
  64: 83,
  75: 94
};


function movePlayer(pos) {
  const cell = boardMap[pos - 1];
  player.style.left = `${cell.x + 20}px`;
  player.style.top = `${cell.y + 15}px`;
  info.textContent = `Position: ${pos}`;
}
function rollDice() {
  const diceEl = document.getElementById("dice");
  const message = document.getElementById("message");

  diceEl.classList.add("blink");

  setTimeout(() => {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice${dice}.png`;
    diceEl.classList.remove("blink");

    message.textContent = `You rolled a ${dice}.`;

    // Rule: You must roll a 6 to start from position 1
    if (position === 1 && dice !== 6) {
      message.textContent += " Roll a 6 to start!";
      return;
    }

    let next = position + dice;

    if (next > 100) {
      message.textContent += " Need exact number to win.";
      return;
    }

    position = next;
    movePlayer(position);

    setTimeout(() => {
      if (snakes[position]) {
        const from = position;
        position = snakes[position];
        message.textContent = `💀 Snake killed you! Down from ${from} to ${position}`;
      } else if (ladders[position]) {
        const from = position;
        position = ladders[from];
        message.textContent = `⚡ Ladder! Up from ${from} to ${position}`;
      }

      movePlayer(position);

      if (position === 100) {
        message.textContent = "🎉 You won!";
        setTimeout(() => {
          position = 1;
          movePlayer(position);
          message.textContent = "Game restarted! Roll a 6 to begin.";
        }, 1500);
      }
    }, 300);
  }, 600);
}




// Start at position 1
movePlayer(position);
