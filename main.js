const cards = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
];
init();

let flippedCards = [];

function init() {
  //shuffle cards
  cards.sort((a, b) => 0.5 - Math.random());
  const board = document.getElementById("board");
  for (ind in cards) {
    const cardElement = createCard(ind);
    board.appendChild(cardElement);
  }
}

function createCard(ind) {
  const element = document.createElement("div");
  element.id = ind;
  element.addEventListener("click", flipCard);
  element.classList.add("card");
  return element;
}

function flipCard() {
  if (this.innerHTML == "") {
    if (flippedCards.length == 2)
      alert("Only up to two cards can be shown at once");
    else {
      let ind = Number(this.id);
      this.innerHTML = cards[ind];
      this.style.backgroundImage = "none";
      flippedCards.push(this);
      if (flippedCards.length == 2) {
        if (flippedCards[0].innerHTML == flippedCards[1].innerHTML) {
          disableCard(flippedCards[0]);
          disableCard(flippedCards[1]);
          // alert("Great! You found a pair!!");
          flippedCards = [];
        }
      }
    }
  } else {
    this.innerHTML = "";
    this.style.background = "url('cardBack.jpg')";
    this.style.backgroundSize = "110px 140px";
    let flippedIndex = flippedCards.findIndex(
      (v, i, arr) => v.innerHTML == this.innerHTML
    );
    flippedCards.splice(flippedIndex, 1);
  }
}

function disableCard(card) {
  card.style.background = "none";
  card.style.backgroundColor = "grey";
  card.removeEventListener("click", flipCard);
  card.style.pointerEvents = "none";
}
