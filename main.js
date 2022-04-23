const cards = [];
let flippedCards = [];
const numOfPairs = 10;

function Card(id, frontImg) {
  this.id = id;
  this.frontImg = frontImg;
  this.disable = function () {
    this.divElement.style.backgroundColor = "grey";
    this.divElement.removeEventListener("click", flipCard);
    this.divElement.style.pointerEvents = "none";
  };
}

init();

function init() {
  for (let i = 0; i < numOfPairs * 2; i++) {
    imgInd = i >= numOfPairs ? i - numOfPairs : i;
    cards.push(new Card(i, `${imgInd}.jpg`));
  }
  //shuffle cards
  cards.sort((a, b) => 0.5 - Math.random());
  const board = document.getElementById("board");
  for (ind in cards) {
    const cardElement = createCard(cards[ind].id);
    cards[ind].divElement = cardElement;
    board.appendChild(cards[ind].divElement);
  }
}

function createCard(ind) {
  const element = document.createElement("div");
  element.id = ind;
  element.addEventListener("click", flipCard);
  element.style.backgroundImage = "url('cardBack.jpg')";
  element.classList.add("card");
  return element;
}

function flipCard() {
  if (this.style.backgroundImage == 'url("cardBack.jpg")') {
    if (flippedCards.length == 2)
      alert("Only up to two cards can be shown at once");
    else {
      let ind =
        Number(this.id) >= numOfPairs
          ? Number(this.id) - numOfPairs
          : Number(this.id);
      // this.innerHTML = cards[ind];
      cards[
        getThisInd(this.id)
      ].divElement.style.backgroundImage = `url(${ind}.jpg)`;
      flippedCards.push(cards[getThisInd(this.id)]);
      if (flippedCards.length == 2) {
        if (
          flippedCards[0].divElement.style.backgroundImage ==
          flippedCards[1].divElement.style.backgroundImage
        ) {
          // disableCard(flippedCards[0]);
          // disableCard(flippedCards[1]);
          flippedCards[0].disable();
          flippedCards[1].disable();
          // alert("Great! You found a pair!!");
          flippedCards = [];
        }
      }
    }
  } else {
    // this.innerHTML = "";
    let flippedIndex = flippedCards.findIndex(
      (v, i, arr) => `url("${v.frontImg}")` == this.style.backgroundImage
    );
    this.style.background = "url('cardBack.jpg')";
    this.style.backgroundSize = "110px 140px";
    flippedCards.splice(flippedIndex, 1);
  }
}

function getThisInd(ind) {
  for (i in cards) if (cards[i].id == ind) return i;
}

// function disableCard(card) {
//   card.style.background = "none";
//   card.style.backgroundColor = "grey";
//   card.removeEventListener("click", flipCard);
//   card.style.pointerEvents = "none";
// }
