"use strict";
if (!localStorage.getItem("current user")) {
  window.location.replace("../index.html"); //מניעת כניסת משתמש לא רשום
}

document.querySelector("#logout").addEventListener("click", () => {
  window.location.replace("../index.html");
});

document.querySelector("#top-score").addEventListener("click", () => {
  window.location.replace("../Pages/top_score.html");
});

document.addEventListener("DOMContentLoaded", () => {
  // קבלת שם המשתמש והניקוד מ-localStorage
  let username = localStorage.getItem("current user") || "User";
  let score = localStorage.getItem("score") || 0;
  username = JSON.parse(username);

  // הצגת שם המשתמש והניקוד בעמוד
  document.querySelector("#username").innerText = username.user_name;
  document.querySelector("#score").innerText = username.score;

  // הגדרות הניקוד המינימלי עבור כל משחק
  const minScores = {
    Tic_play: 50,
    Lights_play: 100,
    Treasure_play: 150,
  };

  // בדיקת הניקוד של המשתמש ושינוי הכיתוב והלינק בהתאם

  for (const key in minScores) {
    let linkElement = document.querySelector(`#${key}`);

    if (username.score < minScores[key]) {
      linkElement.innerText = `minimum ${minScores[key]} score 🔒`;
      linkElement.href = "";
    }
  }
});
