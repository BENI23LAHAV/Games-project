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
]; //מערך של שמות האלמנטים במשחק

let index_images = 0; // אינדקס עבור הלחצנים

let arr = []; //מערך עבור האלמנטים שיוגרלו

function startGame() {
  // פונקציית התחלת המשחק//עושה השמה לשורת האלמנטים
  document.querySelector("#myModal").style.display = "none"; //סגירה של המודל

  let elements = document.querySelector("#memory-row").children; //מערך האלמנטים הריקים כרגע
  elements = Array.from(elements); //הפיכתו למערך

  for (let item of elements) {
    //לולאת השמה רנדומלית לאלמנטים
    let k = Math.floor(Math.random() * arrImages.length);
    item.classList.add(arrImages[k]);
    arr.push(arrImages[k]); //הוספת האלמנטים שנבחרו למערך לצורך בדיקה בסוף המשחק
    item.classList.remove("item");
    item.innerText = "";
  }
  //   let counter = 5;
  //   while (counter > 0) {
  //     setTimeout(() => {
  //       document.querySelector("h1").innerText = `you have ${counter} seconds`;

  //       counter--;
  //     }, 1000);
  //   }
  setTimeout(() => {
    game(); // השהיה עבור משך הצפיה באלמנטים ומעבר לשלב הבא במשחק
  }, 5000);

  document.querySelector("h1").style.display = "none";
}

function game() {
  // מהלך המשחק
  document.querySelector("#memory-row").style.display = "none"; //האלמנטים שנבחרו נעלמים
  document.querySelectorAll(".up-button").forEach((element) => {
    element.addEventListener("click", imagesUp); //הוספת מאזין אירוע עבור כפתור up לדפדוף בכל האלמנטים הקיימים
  });
  document.querySelectorAll(".down-button").forEach((element) => {
    //הוספת מאזין אירוע עבור כפתור down לדפדוף בכל האלמנטים הקיימים
    element.addEventListener("click", imagesDown);
  });
}

function imagesUp(event) {
  //פונקציית דפדוף למעלה לצפיה באלמנטים
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
  //פונקציית דפדוף למטה לצפיה באלמנטים
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
  //סיום המשחק בעזרת השוואת האלמנטים שנבחרו לעומת השוואת האלמנטים שהוכנסו על ידי המשתמש
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
  } else {
    document.querySelector(".modal-content").innerText = "You win the game";
    document.querySelector(".modal-content").style.color = "green";
    let user = JSON.parse(localStorage.getItem("current user"));
    user.score += 5;
    localStorage.setItem(user.user_name, JSON.stringify(user)); //עדכון ניקוד בlocal storage
    localStorage.setItem("current user", JSON.stringify(user));
  }
  document.querySelector("#memory-row").style.display = "flex";
  document.querySelector("#myModal").style.display = "block";

  let but = document.createElement("button");
  but.innerText = "Let's play again";
  but.setAttribute("id", "again"); //הוספת כפתור למשחק נוסף
  but.addEventListener("click", () => {
    location.reload();
  });

  document.querySelector(".modal-content").appendChild(but);
}
document.querySelector("#understand").addEventListener("click", startGame);
document.querySelector(".submit-button").addEventListener("click", endGame); //הוספת מאזיני אירועים

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// };

// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
