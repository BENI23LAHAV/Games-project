var modal = document.getElementById("myModal");

const span = document.getElementsByClassName("close")[0];

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector("#myModal").style.display = "none";
});

let user;
let gameOver = false; // משתנה שמציין אם המשחק נגמר
let isComputerTurn = false; // משתנה שמציין אם תור המחשב

function xORo(event) {
  user = event.target;
  if (user.classList.contains("x")) {
    user = "x";
    document.querySelector("#myModal").style.display = "none";
  } else {
    user = "o";
    document.querySelector("#myModal").style.display = "none";
  }
  document.querySelector("#what").innerText += " " + user;

  startGame(); // התחלת המשחק אחרי בחירת X או O
}

function startGame() {
  // הגרלת מי מתחיל
  let startingPlayer = Math.random() < 0.5 ? "user" : "computer";

  if (startingPlayer === "computer") {
    document.querySelector("#turn").innerText = "Computer starts";
    setTimeout(() => {
      computerTurn();
    }, 500); // השהיה של חצי שניה לפני המהלך של המחשב
  } else {
    document.querySelector("#turn").innerText = "Your turn";
  }
}

let children = document.querySelector(".content").children;
for (let element of children) {
  element.addEventListener("click", xORo);
}

children = document.querySelector(".bord").children;

function game(event) {
  if (isComputerTurn || gameOver) return; // בדיקה אם זה תור המחשב או אם המשחק נגמר

  let play = event.target;

  if (play.classList.contains("square")) {
    play.classList.remove("square");
    play.classList.add(user);
  } else {
    return;
  }

  endGame(); // קריאה לפונקציה endGame אחרי תור המשתמש

  if (!gameOver) {
    isComputerTurn = true;
    document.querySelector("#turn").innerText = "Computer is playing";

    setTimeout(() => {
      computerTurn();
    }, 500); // השהיה של חצי שניה לפני תור המחשב
  }
}

function computerTurn() {
  if (gameOver) return;

  // בדיקה אם יש לפחות משבצת אחת פנויה
  let freeSquares = Array.from(children).filter((child) =>
    child.classList.contains("square")
  );
  if (freeSquares.length > 0) {
    let num = getNumber(freeSquares.length);
    let chosenSquare = freeSquares[num];

    let computer = user === "x" ? "o" : "x";
    chosenSquare.classList.add(computer);
    chosenSquare.classList.add("computer");

    chosenSquare.classList.remove("square");
    document.querySelector("#turn").innerText = "Your turn";

    endGame();
  } else {
    document.querySelector("#turn").innerText = "The game ended";
  }

  isComputerTurn = false;
}

function endGame() {
  let board = document.querySelector(".bord").children;

  // תבניות ניצחון אפשריות
  let winPatterns = [
    [0, 1, 2], // מאוזן
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // מאונך
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // אלכסון
    [2, 4, 6],
  ];

  // בדיקה אם המשתמש ניצח
  for (let pattern of winPatterns) {
    if (
      board[pattern[0]].classList.contains(user) &&
      board[pattern[1]].classList.contains(user) &&
      board[pattern[2]].classList.contains(user)
    ) {
      userWin();
      gameOver = true; // סימון שהמשחק נגמר
      return;
    }
  }

  // בדיקה אם המחשב ניצח
  let computer = user === "x" ? "o" : "x";
  for (let pattern of winPatterns) {
    if (
      board[pattern[0]].classList.contains(computer) &&
      board[pattern[1]].classList.contains(computer) &&
      board[pattern[2]].classList.contains(computer)
    ) {
      computerWin();
      gameOver = true; // סימון שהמשחק נגמר
      return;
    }
  }

  // בדיקה אם המשחק הסתיים בתיקו
  if (
    Array.from(board).every(
      (cell) => cell.classList.contains("x") || cell.classList.contains("o")
    )
  ) {
    tieGame();
    gameOver = true; // סימון שהמשחק נגמר
  }
}

function userWin() {
  // משתמש ניצח
  document.querySelector("#turn").innerText = "You are the Winner";
  showRestartButton();
}

function computerWin() {
  // מחשב ניצח
  document.querySelector("#turn").innerText = "The computer is the Winner";
  showRestartButton();
}

function tieGame() {
  // תיקו
  document.querySelector("#turn").innerText = "The game ended in a tie";
  showRestartButton();
}

function showRestartButton() {
  const restartButton = document.createElement("button");
  restartButton.innerText = "Play Again"; // כפתור משחק חדש
  restartButton.addEventListener("click", () => location.reload());
  document.querySelector("#turn").appendChild(restartButton);
}

for (let element of children) {
  element.addEventListener("click", game);
}

function getNumber(max) {
  return Math.floor(Math.random() * max);
}
