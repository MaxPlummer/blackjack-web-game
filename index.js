let dealerCardsEL = document.getElementById("dealer-cards");
let playerCardsEL = document.getElementById("player-cards");
let playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", renderGame);

function renderGame() {
  dealerCardsEL.removeAttribute("hidden");
  playerCardsEL.removeAttribute("hidden");
}
