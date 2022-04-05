const cards = ["A", "B", "C", "A", "B", "C"];
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

function createCard(ind) {
  const element = document.createElement("div");
  element.innerHTML = cards[ind];
  element.id = ind;
  element.classList.add("card");
  return element;
}
