let Chances = 5;
let x = Math.floor(Math.random() * 9);
document.querySelectorAll(".box")[x].classList.add("win");

function game(event) {
  let clickedElement = event.target;

  if (!clickedElement.classList.contains("colored")) {
    if (clickedElement.classList.contains("win")) {
      clickedElement.classList.add("yellow");
      clickedElement.classList.remove("not");

      let el2 = document.querySelector("#Chances");
      let el = document.createElement("h1");
      el.innerText = "Congratulations, you won";
      el.style.color = "green";
      document.body.append(el);
      el2.innerText = `You earned ${Chances} points`;
      el2.style.color = "green";

      let curren_user = JSON.parse(localStorage.getItem("current user"));
      curren_user.score += Chances;
      localStorage.setItem("current user", JSON.stringify(curren_user));
      localStorage.setItem(curren_user.user_name, JSON.stringify(curren_user));

      let but = document.createElement("button");
      but.id = "playAgain";
      but.innerText = "Play Again";
      document.body.append(but);

      // הסרת מאזיני האירועים לאחר ניצחון
      document.querySelectorAll(".game .box").forEach((box) => {
        box.removeEventListener("click", game);
      });

      // מאזין לאירוע לחיצה על כפתור "שחק שוב" המעדכן את הדף
      but.addEventListener("click", () => {
        location.reload();
      });
      return;
    } else {
      if (Chances === 1) {
        let el = document.createElement("h1");
        el.innerText = "Oops, you lost the game";
        el.style.color = "red";
        document.body.append(el);

        let but = document.createElement("button");
        but.id = "playAgain";
        but.innerText = "Play Again";
        document.body.append(but);

        // הסרת מאזיני האירועים לאחר הפסד
        document.querySelectorAll(".game .box").forEach((box) => {
          box.removeEventListener("click", game);
        });

        // מאזין לאירוע לחיצה על כפתור "שחק שוב" המעדכן את הדף
        but.addEventListener("click", () => {
          location.reload();
        });
      }
      Chances--;
      clickedElement.classList.add("colored");
      clickedElement.classList.remove("not");
      clickedElement.classList.remove("imageMark"); // הסרת קלאס תמונת הרקע
    }
  }
  document.querySelector("#Chances").innerText = `Chances: ${Chances}`;
}

document.querySelectorAll(".game .box").forEach((box) => {
  box.addEventListener("click", game);
});

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

document.querySelector("#understand").addEventListener("click", () => {
  document.querySelector("#myModal").style.display = "none";
});
