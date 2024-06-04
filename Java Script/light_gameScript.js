let counter = 1; // סופר את מספר האורות שנדלקו בכל סיבוב
let sequence = []; // מערך לשמירת רשימת האורות שנדלקו לפי הסדר
let userSequence = []; // מערך לשמירת לחיצות המשתמש לפי הסדר

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startGame");
  const modal = document.getElementById("gameSettingsModal");
  const againButton = document.getElementById("again");
  const message = document.getElementById("message");

  // מאזין לכפתור התחל
  startButton.addEventListener("click", () => {
    modal.style.display = "none"; // מסתיר את המודל
    game(); // מתחיל את המשחק
  });

  // פונקציה להפעלת המשחק
  function game() {
    let i = 0;
    sequence = []; // מאפס את המערך של רצף האורות
    userSequence = []; // מאפס את המערך של רצף לחיצות המשתמש
    const lightsContainer = document.querySelector("#lights-container");
    const lights = lightsContainer.children;
    const num = lights.length;

    // מדליק את האורות אחד אחרי השני
    const interval = setInterval(() => {
      if (i < counter) {
        const index = Math.floor(Math.random() * num);
        Array.from(lights).forEach((light) => (light.style.opacity = "0.2")); // מאפס את האורות
        lights[index].style.opacity = "1"; // מדליק אור

        sequence.push(index); // שומר את המיקום של האור שנדלק

        setTimeout(() => {
          lights[index].style.opacity = "0.2"; // מכבה את האור אחרי חצי שניה
        }, 500);

        i++;
      } else {
        clearInterval(interval); // עוצר את ההדלקה אחרי שכל האורות נדלקו
        addLightEventListeners(); // מוסיף מאזינים לאורות אחרי שההדלקה הסתיימה
      }
    }, 1000);
  }

  // מוסיף מאזינים לכל האורות
  function addLightEventListeners() {
    const lights = document.querySelectorAll(".light");
    lights.forEach((light) => {
      light.addEventListener("click", handleUserClick);
    });
  }

  // פונקציה שמטפלת בלחיצות המשתמש
  function handleUserClick(event) {
    const parent = event.target.parentElement;
    const position = Array.from(parent.children).indexOf(event.target);

    userSequence.push(position); // שומר את המיקום של הלחיצה

    // בודק אם המשתמש השלים את הרצף הנדרש
    if (userSequence.length === sequence.length) {
      if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
        message.textContent = `You earned ${counter} points!`; // מציג הודעה על הנקודות
        message.style.color = "green";
        let user = JSON.parse(localStorage.getItem("current user"));
        user.score += counter;
        localStorage.setItem(user.user_name, JSON.stringify(user));
        localStorage.setItem("current user", JSON.stringify(user));
        userSequence = [];
        setTimeout(() => {
          message.textContent = ""; // מסיר את ההודעה לאחר שניה
          game(); // ממשיך לסיבוב הבא
        }, 1000);
        counter++;
      } else {
        message.textContent = "you failed!"; // מציג הודעת הפסד
        message.style.color = "red";
        showLossImage(); // מציג תמונת הפסד
        userSequence = [];
        document.getElementById("again").style.display = "block"; // מציג את כפתור המשחק שוב
      }
    }
  }

  // פונקציה להצגת תמונת הפסד
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

  // מאזין לכפתור משחק שוב
  againButton.addEventListener("click", () => {
    location.reload(); // מטעין מחדש את הדף
  });
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
