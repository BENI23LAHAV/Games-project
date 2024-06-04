let arrImages = [
  "mango",
  "watermelon",
  "lemon",
  "strawberry",
  "orange",
  "apple",
  "passionflower",
  "pineapple",
  "pomegranate",
]; // מערך של שמות האלמנטים במשחק

let index_images = 0; // אינדקס עבור הלחצנים

let arr = []; // מערך עבור האלמנטים שיוגרלו

function startGame() {
  // פונקציית התחלת המשחק
  document.querySelector("#myModal").style.display = "none"; // סגירה של המודל

  let elements = document.querySelector("#memory-row").children; // מערך האלמנטים הריקים כרגע
  elements = Array.from(elements); // הפיכתו למערך

  for (let item of elements) {
    // לולאת השמה רנדומלית לאלמנטים
    let k = Math.floor(Math.random() * arrImages.length);
    item.classList.add(arrImages[k]);
    arr.push(arrImages[k]); // הוספת האלמנטים שנבחרו למערך לצורך בדיקה בסוף המשחק
    item.classList.remove("item");
    item.innerText = "";
  }

  let timeLeft = 5;
  let timerElement = document.querySelector("#timer");
  timerElement.style.display = "block";
  timerElement.innerText = `Time left: ${timeLeft}`;

  let countdown = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time left: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerElement.style.display = "none";
      game(); // השהיה עבור משך הצפיה באלמנטים ומעבר לשלב הבא במשחק
    }
  }, 1000);

  document.querySelector("h1").style.display = "none";
}

function game() {
  // מהלך המשחק
  document.querySelector("#memory-row").style.display = "none"; // האלמנטים שנבחרו נעלמים
  document.querySelectorAll(".up-button").forEach((element) => {
    element.addEventListener("click", imagesUp); // הוספת מאזין אירוע עבור כפתור up לדפדוף בכל האלמנטים הקיימים
  });
  document.querySelectorAll(".down-button").forEach((element) => {
    // הוספת מאזין אירוע עבור כפתור down לדפדוף בכל האלמנטים הקיימים
    element.addEventListener("click", imagesDown);
  });
}

function imagesUp(event) {
  // פונקציית דפדוף למעלה לצפיה באלמנטים
  let square = event.target.parentElement.children[1];
  let currentClass = arrImages[index_images % arrImages.length];
  arrImages.forEach((imgClass) => {
    if (square.classList.contains(imgClass)) {
      square.classList.remove(imgClass);
    }
  });
  index_images++;
  square.classList.add(arrImages[index_images % arrImages.length]);
  if (square.classList.contains("input-box")) {
    square.classList.remove("input-box");
  }
}

function imagesDown(event) {
  // פונקציית דפדוף למטה לצפיה באלמנטים
  let square = event.target.parentElement.children[1];
  arrImages.forEach((imgClass) => {
    if (square.classList.contains(imgClass)) {
      square.classList.remove(imgClass);
    }
  });
  if (index_images > 0) {
    index_images--;
  }
  square.classList.add(arrImages[index_images % arrImages.length]);
  if (square.classList.contains("input-box")) {
    square.classList.remove("input-box");
  }
}

function endGame() {
  // סיום המשחק בעזרת השוואת האלמנטים שנבחרו לעומת השוואת האלמנטים שהוכנסו על ידי המשתמש
  let arr2 = document.querySelectorAll(".input-item");
  let lose = false;

  for (let i = 0; i < arr.length; i++) {
    if (!arr2[i].children[1].classList.contains(arr[i])) {
      lose = true;
      break;
    }
  }

  if (lose) {
    document.querySelector(".modal-content").innerText = "You lose the game";
    document.querySelector(".modal-content").style.color = "red";
    showLossImage();
  } else {
    document.querySelector(".modal-content").innerText = "You win the game";
    document.querySelector(".modal-content").style.color = "green";
    let user = JSON.parse(localStorage.getItem("current user"));
    user.score += 5;
    localStorage.setItem(user.user_name, JSON.stringify(user)); // עדכון ניקוד ב-local storage
    localStorage.setItem("current user", JSON.stringify(user));
  }
  document.querySelector("#memory-row").style.display = "flex";
  document.querySelector("#myModal").style.display = "block";

  let but = document.createElement("button");
  but.innerText = "Let's play again";
  but.setAttribute("id", "again"); // הוספת כפתור למשחק נוסף
  but.addEventListener("click", () => {
    location.reload();
  });

  document.querySelector(".modal-content").appendChild(but);
}
function showLossImage() {
  const lossImage = document.createElement("img");
  lossImage.src = "../images/Monster.png"; // נתיב לתמונה
  lossImage.className = "loss-image";
  document.body.appendChild(lossImage);

  setTimeout(() => {
    lossImage.style.transform = "scale(1.5)"; // מגדיל את התמונה
  }, 0);

  setTimeout(() => {
    lossImage.remove(); // מסיר את התמונה אחרי 2 שניות
  }, 2000);
}

document.querySelector("#understand").addEventListener("click", startGame);
document.querySelector(".submit-button").addEventListener("click", endGame); // הוספת מאזיני אירועים

document.querySelector("#logout").addEventListener("click", () => {
  // הוספת תפקוד לוג-אאוט
  window.location.replace("../index.html");
});

document.querySelector("#home").addEventListener("click", () => {
  // הוספת ניווט לעמוד הבית
  window.location.replace("../Pages/menu.html");
});

document.querySelector("#settings").addEventListener("click", () => {
  // הוספת ניווט לעמוד ההגדרות
  window.location.replace("../Settings/settings.html");
});
