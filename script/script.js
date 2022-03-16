// -------------------------------- DOM ELEMENTS ------------------------------------
const gameBoard = document.querySelector("#mt__game-box");
const gameOverWindow = document.querySelector("#gameOverWindow");
const gameOverText = document.querySelector("#gameOverText");
const gameOverRetryBtn = document.querySelector("#gameOverRetryBtn");
const keepPlayingBtn = document.querySelector("#keepPlayingBtn");
const choseLevel = document.querySelector("#choseLevel");
const choseLevelBtn = document.querySelector("#choseLevelBtn");
const playerScorePercentageDisplay = document.querySelector(
  "#playerScorePercentageDisplay"
);
const playerHardRecordPercentageDisplay = document.querySelector(
  "#playerHardRecordPercentageDisplay"
);
const playerNormalRecordPercentageDisplay = document.querySelector(
  "#playerNormalRecordPercentageDisplay"
);
const playerEasyRecordPercentageDisplay = document.querySelector(
  "#playerEasyRecordPercentageDisplay"
);
const levelDisplay = document.querySelector("#levelDisplay");
// -------------------------------- / DOM ELEMENTS ------------------------------------

// -------------------------------- GENERAL VARIABLES DECLARATION ------------------------------------
let bombs = [];
let level = choseLevel.value;
let playerCounter = 0;
let playerRecordHard = 0;
let playerRecordHardPercentage = 0;
let playerRecordNormal = 0;
let playerRecordNormalPercentage = 0;
let playerRecordEasy = 0;
let playerRecordEasyPercentage = 0;
let winningRatio = 0;
let winningPercentage = 0;
let nearBombs = 0;
let id;
let nearCards = [];
// -------------------------------- / GENERAL VARIABLES DECLARATION ------------------------------------

// -------------------------------- FUNCTIONS ------------------------------------
// --------------- Function that check the level chosed by player
function levelChoice() {
  level = parseInt(choseLevel.value);
  switch (level) {
    case 1:
      levelDisplay.innerHTML = "Easy";
      startGame(100);
      break;
    case 2:
      levelDisplay.innerHTML = "Normal";
      startGame(81);
      break;
    case 3:
      levelDisplay.innerHTML = "Hard";
      startGame(49);
      break;

    default:
      startGame(100);

      break;
  }
}
// --------------- Function that start the game & all main process
function startGame(cardsNumber) {
  playerCounter = 0;
  winningPercentage = 0;

  //   Reset game on load & every restart
  gameBoard.innerHTML = "";
  // Reset bombs array
  bombs = [];
  //Create bombs array
  for (let index = 0; index < 10; index++) {
    bomb = Math.floor(Math.random() * cardsNumber + 1);
    bombs.push(bomb);
  }
  console.log("for cheaters", bombs);
  console.log(cardsNumber);
  winningRatio = 100 / (cardsNumber - 10);
  console.log(winningRatio);

  // Create game cards
  for (let index = 1; index <= cardsNumber; index++) {
    let gameCard = document.createElement("div");
    gameCard.classList.add("mt__game-card");
    gameCard.classList.add(`mt__game-card--${cardsNumber}`);
    gameCard.innerHTML = `<p class="mt__game-card__text d-inline-block">${index}</p>`;
    gameCard.id = index;
    gameBoard.appendChild(gameCard);

    // Append on card games the event listener
    gameCard.addEventListener("click", (target) => {
      if (target.target.id) {
        gameCampoMinato(target);
      }
    });
  }
}

// --------------- Function that contain the game logic
function gameCampoMinato(target) {
  id = parseInt(target.target.id);
  // check if the clicked card is a bomb
  if (bombs.includes(id)) {
    // Display that You lose & update the records scores
    target.target.classList.add("mt__bomb");
    scoresRecord(level);
    gameOverText.innerHTML = "Hai Perso";
    gameOverText.classList.remove("gameOverText--win");
    gameOverWindow.classList.remove("d-none");
    playerScorePercentageDisplay.classList.remove("sidebar__percentage-over");
  } else {
    //Updates the score counter & Display counter
    playerCounter++;
    scoreChecker();
    winningPercentage = playerCounter * winningRatio;
    // update the game board
    target.target.classList.add("mt__safe");
    updateScoreDisplayer();
    // check if the player has won
    nearBombChecker(id);
    winChecker();
  }
}

// --------------- Function that check if the player has won & display the win Section
function winChecker() {
  if (winningPercentage > 99) {
    gameOverText.className = "gameOverText--win";
    gameOverText.innerHTML = "Hai Vinto";
    gameOverRetryBtn.classList.add("d-none");
    keepPlayingBtn.classList.remove("d-none");
    gameOverWindow.classList.remove("d-none");
  }
}

// --------------- Function that overwrite the previus record with the new one by level
function scoresRecord(level) {
  switch (level) {
    case 1:
      if (playerCounter > playerRecordEasy) {
        playerRecordEasy = playerCounter;
        playerRecordEasyPercentage = Math.floor(winningPercentage);
      }
      break;
    case 2:
      if (playerCounter > playerRecordNormal) {
        playerRecordNormal = playerCounter;
        playerRecordNormalPercentage = Math.floor(winningPercentage);
      }
      break;
    case 3:
      if (playerCounter > playerRecordHard) {
        playerRecordHard = playerCounter;
        playerRecordHardPercentage = Math.floor(winningPercentage);
      }
      break;
  }
  updateScoreDisplayer();
}

// --------------- Function that update the score on display
function updateScoreDisplayer() {
  playerScorePercentageDisplay.innerHTML = `${Math.floor(
    winningPercentage
  )}%<span>(${playerCounter} cards)</span>`;
  playerHardRecordPercentageDisplay.innerHTML = `${playerRecordHardPercentage}%<span>(${playerRecordHard} cards)</span>`;
  playerNormalRecordPercentageDisplay.innerHTML = `${playerRecordNormalPercentage}%<span>(${playerRecordNormal} cards)</span>`;
  playerEasyRecordPercentageDisplay.innerHTML = `${playerRecordEasyPercentage}%<span>(${playerRecordEasy} cards)</span>`;
}

// ---------------- Function that chenge the counter color when the player beat the previus record by level
function scoreChecker() {
  switch (level) {
    case 1:
      if (playerCounter > playerRecordEasy) {
        playerScorePercentageDisplay.classList.add("sidebar__percentage-over");
      }
      break;
    case 2:
      if (playerCounter > playerRecordNormal) {
        playerScorePercentageDisplay.classList.add("sidebar__percentage-over");
      }
      break;
    case 3:
      if (playerCounter > playerRecordHard) {
        playerScorePercentageDisplay.classList.add("sidebar__percentage-over");
      }
      break;
  }
}

function nearBombChecker(id) {
  switch (level) {
    case 1:
      if (id % 10 === 0) {
        nearCards = [9, 10, -1, -10, -11];
      } else if (id % 10 === 1) {
        nearCards = [1, 10, 11, -9, -10];
      } else {
        nearCards = [1, 9, 10, 11, -1, -9, -10, -11];
      }
      break;
    case 2:
      if (id % 9 === 0) {
        nearCards = [9, 8, -1, -9, -10];
      } else if (id % 9 === 1) {
        nearCards = [1, 9, 10, -9, -8];
      } else {
        nearCards = [1, 8, 9, 10, -1, -8, -9, -10];
      }
      break;
    case 3:
      if (id % 7 === 0) {
        nearCards = [7, 6, -1, -7, -8];
      } else if (id % 7 === 1) {
        nearCards = [1, 7, 8, -7, -6];
      } else {
        nearCards = [1, 6, 7, 8, -1, -6, -7, -8];
      }
      break;
  }
  nearBomb(nearCards);
}

function nearBomb(nearCards) {
  nearBombs = 0;
  nearCards = nearCards.map(addId);
  for (let i = 0; i < nearCards.length; i++) {
    if (bombs.includes(nearCards[i])) {
      nearBombs++;
    }
  }
  console.log(nearBombs);
  nearBombNumberDisplay(nearBombs);
}

function addId(n) {
  return n + id;
}

function nearBombNumberDisplay(nearBombs) {
  let clickedCard = document.getElementById(`${id}`);
  let bombDisplayer = document.createElement("h5");
  bombDisplayer.innerHTML = `${nearBombs}`;
  bombDisplayer.className = `bomb-number bomb-number--${nearBombs}`;

  clickedCard.appendChild(bombDisplayer);
}
// -------------------------------- / FUNCTIONS ------------------------------------

// -------------------------------- ON LOAD FUNCTIONS ------------------------------------
levelChoice();
// -------------------------------- / ON LOAD FUNCTIONS ------------------------------------

// -------------------------------- EVENT LISTENERS ------------------------------------
gameOverRetryBtn.addEventListener("click", () => {
  levelChoice();
  gameOverWindow.classList.add("d-none");
});
keepPlayingBtn.addEventListener("click", () => {
  gameOverWindow.classList.add("d-none");
});

choseLevelBtn.addEventListener("click", levelChoice);
// -------------------------------- / EVENT LISTENERS ------------------------------------
