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
  for (let [id, minScore] of Object.entries(minScores)) {
    let linkElement = document.querySelector(`#${id}`);
    if (username.score < minScore) {
      // אם הניקוד נמוך מהמינימום, שינוי הכיתוב והלינק
      linkElement.textContent = `minimum ${minScore} score`;
      linkElement.href = "";
    }
  }
});
