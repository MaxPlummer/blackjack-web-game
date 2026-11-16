// Get elements
const titleEl = document.getElementById("title");
const dealerCardsEL = document.getElementById("dealer-cards");
const dealerTotalEL = document.getElementById("dealer-total");
const playerCardsEL = document.getElementById("player-cards");
const playerTotalEL = document.getElementById("player-total");
const playBtn = document.getElementById("play-btn");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");

// Initialize dealer variables
let dealerTotal = 0;
let dealerCard2 = 0;
let dealerCard1 = 0;
let dealerAce = false;
let dealerCardsString = "Dealer's Hand: ";
let dealerTotalString = "Total: ";
// Initialize player variables
let playerTotal = 0;
let playerCard1 = 0;
let playerCard2 = 0;
let playerAce = false;
let playerCardsString = "Player's Hand: ";
let playerTotalString = "Total: ";

// Add listener for buttons
playBtn.addEventListener("click", renderGame);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);

// Draw and display cards
function renderGame() {
  titleEl.textContent = "Let's Play!";
  hide(dealerTotalEL);
  hide(playBtn);
  playBtn.textContent = "Play Again";
  // Dealer start
  dealerTotal = 0;
  dealerAce = false;
  dealerCard1 = drawCard("dealer");
  dealerTotal += dealerCard1;
  dealerCard2 = drawCard("dealer");
  dealerTotal = dealerCard1 + dealerCard2;
  dealerCardsString = "Dealer's Hand: " + dealerCard1 + " ? ";
  dealerCardsEL.textContent = dealerCardsString;
  show(dealerCardsEL);
  // Player start
  playerTotal = 0;
  playerAce = false;
  playerCard1 = drawCard("player");
  playerTotal += playerCard1;
  playerCard2 = drawCard("player");
  playerTotal = playerCard1 + playerCard2;
  playerCardsString = "Player's Hand: " + playerCard1 + " " + playerCard2 + " ";
  playerCardsEL.textContent = playerCardsString;
  show(playerCardsEL);
  playerTotalString = "Total: " + playerTotal;
  playerTotalEL.textContent = playerTotalString;
  show(playerTotalEL);
  show(hitBtn);
  show(standBtn);
  if (playerTotal === 21) {
    titleEl.textContent = "Blackjack!";
    hide(hitBtn);
  }
}

// Draw a card
function drawCard(holder) {
  const card = Math.floor(Math.random() * 10) + 1
  return ace(card, holder);
}

// Handle a hit
function hit() {
  const card = drawCard("player");
  playerCardsString = playerCardsString + card + " ";
  playerTotal += card;
  // An ace 11 becomes 1 if the hand goes over 21
  if (playerAce === true && playerTotal > 21) {
    playerTotal -= 10;
    playerCardsString = playerCardsString.replace(/11/, 1);
    playerAce = false;
  }
  playerCardsEL.textContent = playerCardsString;
  playerTotalString = "Total: " + playerTotal;
  playerTotalEL.textContent = playerTotalString;
  if (playerTotal > 21) {
    titleEl.textContent = "You Busted!";
    hide(hitBtn);
    hide(standBtn);
    show(playBtn);
  } else if (playerTotal === 21) {
    titleEl.textContent = "Blackjack!";
    hide(hitBtn);
  }
}

// Handle a stand
function stand() {
  hide(hitBtn);
  hide(standBtn);
  dealerCardsString = dealerCardsString.replace(/\?/, dealerCard2);
  dealerCardsEL.textContent = dealerCardsString;
  dealerTotalString = "Total: " + dealerTotal;
  dealerTotalEL.textContent = dealerTotalString;
  show(dealerTotalEL);
  while (dealerTotal < 17) {
    const card = drawCard("dealer");
    dealerCardsString = dealerCardsString + card + " ";
    dealerTotal += card;
    // An ace 11 becomes 1 if the hand goes over 21
    if (dealerAce === true && dealerTotal > 21) {
    dealerTotal -= 10;
    dealerCardsString = dealerCardsString.replace(/11/, 1);
    dealerAce = false;
  }
    dealerCardsEL.textContent = dealerCardsString;
    dealerTotalString = "Total: " + dealerTotal;
    dealerTotalEL.textContent = dealerTotalString;
  }
  if (dealerTotal > 21 || dealerTotal < playerTotal) {
    titleEl.textContent = "You Win!";
  } else if (dealerTotal > playerTotal) {
    titleEl.textContent = "Dealer Wins!";
  } else if (dealerTotal === playerTotal) {
    titleEl.textContent = "It's a Tie!";
  }
  hide(hitBtn);
  hide(standBtn);
  show(playBtn);
}

// Check for Aces
function ace(card, holder) {
  if (holder === "player") {
    // A drawn 1 becomes an 11 if able
    if (card === 1 && playerTotal + 11 <= 21) {
      playerAce = true;
      return 11;
    } else {
      return card;
    }
  } else {
    if (card === 1 && dealerTotal + 11 <= 21) {
      dealerAce = true;
      return 11;
    } else {
      return card;
    }
  }
}

// Add up card values
function sum(...cards) {
  let total = 0;
  for (const card of cards) {
    total += card;
  }
  return total;
}

// hide elements
function hide(el) {
  el.setAttribute("hidden", true);
}

// show elements
function show(el) {
  el.removeAttribute("hidden");
}
