// Get elements
let dealerCardsEL = document.getElementById("dealer-cards");
let playerCardsEL = document.getElementById("player-cards");
let playBtn = document.getElementById("play-btn");

// Add listener for play button
playBtn.addEventListener("click", renderGame);

// Draw and display cards
function renderGame() {
  // Dealer start
  let dealerTotal = 0;
  let dealerCard1 = drawCard();
  let dealerCard2 = drawCard();
  let dealerCardsString =
    "Dealer Cards: " + dealerCard1 + " " + dealerCard2 + " ";
  dealerCardsEL.textContent = dealerCardsString;
  dealerCardsEL.removeAttribute("hidden");
  // Player start
  let playerTotal = 0;
  let playerCard1 = drawCard();
  let playerCard2 = drawCard();
  let playerCardsString =
    "Player Cards: " + playerCard1 + " " + playerCard2 + " ";
  playerCardsEL.textContent = playerCardsString;
  playerCardsEL.removeAttribute("hidden");
}

// Draw a card
function drawCard() {
  return Math.floor(Math.random() * 10) + 1;
}

// Add up card values
function sum(...cards) {
  let total = 0;
  for (const card of cards) {
    total += card;
  }
  return total;
}

// Check for a bust
function checkSum(sum) {
  if (sum > 21) {
    return false;
  } else {
    return true;
  }
}
