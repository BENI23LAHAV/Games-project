document.addEventListener("DOMContentLoaded", () => {
  // אתחול משתנה שמחזיק את האלמנט של רשימת הניקוד
  const scoreList = document.querySelector("#score-list");

  // שליפת חמשת המשתמשים בעלי הציון הגבוה ביותר מ-localStorage
  const users = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let user = JSON.parse(localStorage.getItem(key));
    // בדיקה שהנתונים הם של משתמש עם שם וציון
    if (user && user.user_name && user.score) {
      users.push(user);
    }
  }

  // מיון המשתמשים לפי הציון בסדר יורד וקבלת חמשת המשתמשים עם הציונים הגבוהים ביותר
  users.sort((a, b) => b.score - a.score);
  const topUsers = users.slice(0, 5);

  // יצירת והוספת פרטי המשתמשים לרשימת הציונים
  topUsers.forEach((user) => {
    // יצירת אלמנט עבור כל כניסה ברשימת הציונים
    const scoreEntry = document.createElement("div");
    scoreEntry.classList.add("score-entry");

    // יצירת אלמנט עבור שם המשתמש
    const userName = document.createElement("h2");
    userName.textContent = user.user_name;
    scoreEntry.appendChild(userName);

    // יצירת אלמנט עבור הציון של המשתמש
    const userScore = document.createElement("p");
    userScore.textContent = `Score: ${user.score}`;
    scoreEntry.appendChild(userScore);

    // הוספת הכניסה לרשימת הציונים
    scoreList.appendChild(scoreEntry);
  });

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
});
