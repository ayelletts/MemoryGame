const cards = ["A", "B", "C", "A", "B", "C"];
init();
function init() {
  shuffle(cards);
  const board = document.getElementById("board");
  for (ind in cards) {
    const cardElement = createCard(ind);
    board.appendChild(cardElement);
  }
}

function createCard(ind) {
  const element = document.createElement("span");
  element.innerHTML = cards[ind];
  element.id = ind;
  element.classList.add("card");
  return element;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
