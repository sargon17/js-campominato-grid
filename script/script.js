// -------------------------------- DOM ELEMENTS ------------------------------------
const gameBoard = document.querySelector("#mt__game-box");

// -------------------------------- / DOM ELEMENTS ------------------------------------

// -------------------------------- GENERAL VARIABLES DECLARATION ------------------------------------
let level = choseLevel.value;
let id;
// -------------------------------- / GENERAL VARIABLES DECLARATION ------------------------------------

// -------------------------------- FUNCTIONS ------------------------------------
// --------------- Function that check the level chosed by player
function levelChoice() {
  level = parseInt(choseLevel.value);
  switch (level) {
    case 1:
      startGame(100);
      break;
    case 2:
      startGame(81);
      break;
    case 3:
      startGame(49);
      break;

    default:
      startGame(100);

      break;
  }
}
// --------------- Function that start the game & all main process
function startGame(cardsNumber) {
  gameBoard.innerHTML = "";
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
  target.target.classList.add("mt__safe");
}

// -------------------------------- / FUNCTIONS ------------------------------------

// -------------------------------- ON LOAD FUNCTIONS ------------------------------------
levelChoice();
// -------------------------------- / ON LOAD FUNCTIONS ------------------------------------

// -------------------------------- EVENT LISTENERS ------------------------------------
choseLevelBtn.addEventListener("click", levelChoice);
// -------------------------------- / EVENT LISTENERS ------------------------------------
