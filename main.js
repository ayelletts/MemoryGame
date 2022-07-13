const cards = [];
const players = [];
let flippedCards = [];
const numOfPairs = 10;
const numOfPlayers = 2;

var flipAudio = new Audio("./Sounds/flip.wav");
var pairAudio = new Audio("./Sounds/pairFound.wav");
var winAudio = new Audio("./Sounds/cheer.mp3");
var errorAudio = new Audio("./Sounds/error.mp3");

function Card(id, frontImg) {
  this.id = id;
  this.frontImg = frontImg;
  this.disable = function () {
    this.divElement.style.backgroundColor = "grey";
    this.divElement.removeEventListener("click", flipCard);
    this.divElement.style.pointerEvents = "none";
  };
  this.flipMe = function () {
    this.divElement.style.backgroundImage = "url('./Images/cardBack.jpg')";
  };
}

function Player(id, name, divElement) {
  this.id = id;
  this.name = name;
  this.pairs = 0;
  this.active = false;
  this.divElement = divElement;
  this.addScore = function () {
    this.pairs++;
    document.getElementById(`p${this.id}Pairs`).innerText = this.pairs;
  };
  this.showMe = function () {
    document.getElementById(
      `player${this.id}`
    ).innerHTML = `<div name="player" id="player1">${this.name} found ${this.pairs} pairs</div>`;
  };
  this.myTurn = function () {
    document.getElementById(`player${this.id}`).classList.add("activePlayer");
  };
}

// onfocusout callback - player names input element
function checkNames() {
  if (
    document.getElementById(`player1`).value != undefined &&
    document.getElementById(`player2`).value != undefined &&
    document.getElementById(`player1`).value != "" &&
    document.getElementById(`player2`).value != ""
  ) {
    document.getElementById("startGame").removeAttribute("disabled");
  }
}

function init() {
  document.getElementById("startGame").style.display = "none";

  for (let p = 0; p < numOfPlayers; p++) {
    let playerName = document.getElementById(`player${p + 1}`).value;
    players.push(
      new Player(p + 1, playerName, document.getElementById(`player${p + 1}`))
    );
  }
  players[0].active = true;
  players.forEach((v) => v.showMe());
  players[0].myTurn();
  for (let i = 0; i < numOfPairs * 2; i++) {
    imgInd = i >= numOfPairs ? i - numOfPairs : i;
    cards.push(new Card(i, `./Images/${imgInd}.JPG`));
  }

  //shuffle cards
  cards.sort((a, b) => 0.5 - Math.random());
  const board = document.getElementById("board");
  for (ind in cards) {
    const cardElement = createCard(cards[ind].id);
    cards[ind].divElement = cardElement;
    board.appendChild(cards[ind].divElement);
  }
  document.querySelector("#board").removeAttribute("hidden");
}

function createCard(ind) {
  const element = document.createElement("div");
  element.id = ind;
  element.addEventListener("click", flipCard);
  element.style.backgroundImage = "url('./Images/cardBack.jpg')";
  element.classList.add("card");
  return element;
}

function flipCard() {
  flipAudio.play();
  if (this.style.backgroundImage == 'url("./Images/cardBack.jpg")') {
    if (flippedCards.length == 2) {
      errorAudio.play();
      alert("Only up to two cards can be shown at once");
    } else {
      let ind =
        Number(this.id) >= numOfPairs
          ? Number(this.id) - numOfPairs
          : Number(this.id);
      // this.innerHTML = cards[ind];
      cards[
        getThisInd(this.id)
      ].divElement.style.backgroundImage = `url("./Images/${ind}.JPG")`;
      flippedCards.push(cards[getThisInd(this.id)]);
      if (flippedCards.length == 2) {
        if (
          flippedCards[0].divElement.style.backgroundImage ==
          flippedCards[1].divElement.style.backgroundImage
        ) {
          pairAudio.play();
          flippedCards[0].disable();
          flippedCards[1].disable();
          flippedCards = [];
          let activePlayer = players.filter((p) => p.active)[0];
          activePlayer.addScore();
          for (p of players) {
            if (p.active) {
              p.myTurn();
            } else {
              p.divElement.classList.remove("activePlayer");
            }
          }
          checkGameWon();
        } else {
          changeTurn();
        }
      }
    }
  } else {
    let flippedIndex = flippedCards.findIndex(
      (v, i, arr) => `url("${v.frontImg}")` == this.style.backgroundImage
    );
    this.style.background = "url('./Images/cardBack.jpg')";
    this.style.backgroundSize = "110px 140px";
    flippedCards.splice(flippedIndex, 1);
  }
}

function checkGameWon() {
  let boardCards = document.getElementById("board").childNodes;
  let boardCardsArray = [...boardCards];
  let isLeftCards = boardCardsArray.filter((v) =>
    v.style.backgroundImage.includes("cardBack")
  );
  if (isLeftCards.length == 0) {
    if (players[0].pairs == players[1].pairs) {
      //tie
      alert("Tie!!");
    } else if (players[0].pairs > players[1].pairs) {
      //player1 won
      winAudio.play();
      alert(`Good job ${players[0].name}, you won the game!!`);
    } else {
      //player2 won
      winAudio.play();
      alert(`Good job ${players[1].name}, you won the game!!`);
    }
  }
}

function getThisInd(ind) {
  for (i in cards) if (cards[i].id == ind) return i;
}

function changeTurn() {
  for (i of players) {
    i.active = !i.active;
    if (i.active) {
      i.myTurn();
      activePlayer = i;
    } else {
      document.getElementById(`player${i.id}`).classList.remove("activePlayer");
    }
  }
}
