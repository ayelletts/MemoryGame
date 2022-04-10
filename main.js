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
  "K",
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
  "K",
];
init();
function init() {
  //shuffle cards
  cards.sort((a, b) => 0.5 - Math.random());
  const board = document.getElementById("board");
  for (ind in cards) {
    const cardElement = createCard(ind);
    board.appendChild(cardElement);
  }
}

let flipCard = function () {
  if (this.innerHTML == "") {
    let ind = Number(this.id);
    this.innerHTML = cards[ind];
  } else {
    this.innerHTML = "";
  }
};

function createCard(ind) {
  const element = document.createElement("div");
  element.innerHTML = cards[ind];
  element.id = ind;
  // debugger;
  // element.addEventListener("onclick", flipCard);
  element.classList.add("card");
  return element;
}
