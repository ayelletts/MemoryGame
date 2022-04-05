const cards = ["A", "B", "C", "A", "B", "C"];

shuffle(cards);

for (card of cards) {
  const element = document.createElement("span");
  const board = document.getElementById("board");
  element.innerHTML = card;
  element.classList.add("card");
  board.appendChild(element);
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
