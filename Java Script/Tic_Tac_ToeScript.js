"use strict";
if (!localStorage.getItem("current user")) {
  window.location.replace("../index.html"); //מניעת כניסת משתמש לא רשום
}
let modal = document.getElementById("myModal");

let user; //משתנה עבור מה המשתמש בחר להיות
let gameOver = false; // משתנה שמציין אם המשחק נגמר
let isComputerTurn = false; // משתנה שמציין אם תור המחשב

function xORo(event) {
  user = event.target; //הפונקציה עושה השמה למחשב ולמשתמש ע"פ בחירת המשתמש
  if (user.classList.contains("x")) {
    user = "x";
  } else {
    user = "o";
  }
  document.querySelector("#myModal").style.display = "none";

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
    }, 0.5); // השהיה של חצי שניה לפני המהלך של המחשב
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
    }, 3500); // השהיה של חצי שניה לפני תור המחשב
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
  }

  isComputerTurn = false;
}
function findBestMove(player) {
  let board = document.querySelector(".bord").children;
  let opponent = player === "x" ? "o" : "x";

  //בדיקה אם יש למשתמש מהלך מנצח
  for (let i = 0; i < board.length; i++) {
    if (board[i].classList.contains("square")) {
      board[i].classList.add(player);
      if (checkWin(player)) {
        board[i].classList.remove(player);
        return i;
      }
    }
    board[i].classList.remove(player);
  }

  //בדיקה אם יש מהלך שיחסום את המשתמש מלנצח

  for (let i = 0; i < board.length; i++) {
    if (board[i].classList.contains("square")) {
      board[i].classList.add(opponent);
      if (checkWin(opponent)) {
        board[i].classList.remove(opponent);
        return i;
      }
    }
    board[i].classList.remove(opponent);
  }

  // מהלך רנדומלי אם אין מהלך מנצח או חוסם
  let freeSquares = Array.from(children).filter((child) =>
    child.classList.contains("square")
  );
  if (freeSquares.length > 0) {
    return freeSquares[Math.floor(Math.random() * freeSquares.length)].dataset
      .index;
  }
  return -1;
}

function checkWin(player) {
  let board = document.querySelector(".bord").children;

  //תבניות ניצחון אפשריות
  let winPatterns = [
    [0, 1, 2], //מאוזן
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //מאונך
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //אלכסון
    [2, 4, 6],
  ];

  //בדיקה אם השחקן ינצח

  for (let pattern of winPatterns) {
    if (
      board[pattern[0]].classList.contains(player) &&
      board[pattern[1]].classList.contains(player) &&
      board[pattern[2]].classList.contains(player)
    ) {
      return true;
    }
  }

  return false;
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
    drawGame();
    gameOver = true; // סימון שהמשחק נגמר
  }
}

function userWin() {
  // משתמש ניצח
  document.querySelector("#turn").innerText = "You are the Winner";
  showRestartButton();
  let user = JSON.parse(localStorage.getItem("current user"));
  user.score += 5;
  localStorage.setItem(user.user_name, JSON.stringify(user));
  localStorage.setItem("current user", JSON.stringify(user));
}

function computerWin() {
  // מחשב ניצח
  document.querySelector("#turn").innerText = "The computer is the Winner";
  showLossImage();
  showRestartButton();
}

function drawGame() {
  // תיקו
  document.querySelector("#turn").innerText = "The game ended in a draw";
  showRestartButton();

  let user = JSON.parse(localStorage.getItem("current user"));
  user.score += 1;
  localStorage.setItem(user.user_name, JSON.stringify(user));
  localStorage.setItem("current user", JSON.stringify(user));
}

function showRestartButton() {
  const restartButton = document.createElement("button");
  restartButton.innerText = "Play Again"; // כפתור משחק חדש
  restartButton.addEventListener("click", () => location.reload());
  document.querySelector("#turn").appendChild(restartButton);
}

function showLossImage() {
  const lossImage = document.createElement("img");
  lossImage.src = "../images/Monster.png"; // נתיב לתמונה
  lossImage.className = "loss-image";
  document.body.appendChild(lossImage);

  setTimeout(() => {
    lossImage.remove(); // מסיר את התמונה אחרי 2 שניות
  }, 2000);
}

for (let element of children) {
  //הוספת event לכל משבצת  בלוח
  element.addEventListener("click", game);
}

function getNumber(max) {
  //מחזיר מספר רנדומלי מאפס עד הערך המסופק
  return Math.floor(Math.random() * max);
}
// פעולת כפתורי הניווט
document.querySelector("#home").addEventListener("click", () => {
  // ניווט לעמוד הבית
  window.location.replace("../Pages/menu.html");
});

document.querySelector("#logout").addEventListener("click", () => {
  // ניווט לעמוד הכניסה
  window.location.replace("../index.html");
});

document.querySelector("#top_score").addEventListener("click", () => {
  // ניווט לעמוד הניקוד
  window.location.replace("../Pages/Top_score.html");
});
