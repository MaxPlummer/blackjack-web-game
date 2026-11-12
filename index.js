// Get elements
const titleEl = document.getElementById("title");
const dealerCardsEL = document.getElementById("dealer-cards");
const playerCardsEL = document.getElementById("player-cards");
const playBtn = document.getElementById("play-btn");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");

// Initialize dealer card variables
let dealerTotal = 0;
let dealerCard2 = 0;
let dealerCard1 = 0;
let dealerCardsString = "Dealer's Hand: ";
// Initialize player card variables
let playerTotal = 0;
let playerCard1 = 0;
let playerCard2 = 0;
let playerCardsString = "Player's Hand: ";

// Add listener for play button
playBtn.addEventListener("click", renderGame);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);

// Draw and display cards
function renderGame() {
  titleEl.textContent = "Let's Play!";
  playBtn.setAttribute("hidden", true);
  playBtn.textContent = "Play Again";
  // Dealer start
  dealerCard1 = drawCard();
  dealerCard2 = drawCard();
  dealerTotal = dealerCard1 + dealerCard2;
  dealerCardsString = "Dealer's Hand: " + dealerCard1 + " " + dealerCard2 + " ";
  dealerCardsEL.textContent = dealerCardsString;
  dealerCardsEL.removeAttribute("hidden");
  // Player start
  playerCard1 = drawCard();
  playerCard2 = drawCard();
  playerTotal = playerCard1 + playerCard2;
  playerCardsString = "Player's Hand: " + playerCard1 + " " + playerCard2 + " ";
  playerCardsEL.textContent = playerCardsString;
  playerCardsEL.removeAttribute("hidden");
  hitBtn.removeAttribute("hidden");
  standBtn.removeAttribute("hidden");
}

// Draw a card
function drawCard() {
  return Math.floor(Math.random() * 10) + 1;
}

// Handle a hit
function hit() {
  const card = drawCard();
  playerCardsString = playerCardsString + card + " ";
  playerCardsEL.textContent = playerCardsString;
  playerTotal += card;
  if (playerTotal > 21) {
    titleEl.textContent = "You Busted!";
    hitBtn.setAttribute("hidden", true);
    standBtn.setAttribute("hidden", true);
    playBtn.removeAttribute("hidden");
  } else if (playerTotal === 21) {
    titleEl.textContent = "Blackjack!";
    hitBtn.setAttribute("hidden", true);
  }
}

// Handle a stand
function stand() {
  hitBtn.setAttribute("hidden", true);
  standBtn.setAttribute("hidden", true);
  while (dealerTotal < 17) {
    const card = drawCard();
    dealerCardsString = dealerCardsString + card + " ";
    dealerCardsEL.textContent = dealerCardsString;
    dealerTotal += card;
  }
  if (dealerTotal > 21 || dealerTotal < playerTotal) {
    titleEl.textContent = "You Win!";
  } else if (dealerTotal > playerTotal) {
    titleEl.textContent = "Dealer Wins!";
  } else if (dealerTotal === playerTotal) {
    titleEl.textContent = "It's a Tie!";
  }
  hitBtn.setAttribute("hidden", true);
  standBtn.setAttribute("hidden", true);
  playBtn.removeAttribute("hidden");
  playBtn.removeAttribute("hidden");
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
