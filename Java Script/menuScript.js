document.querySelector("#logout").addEventListener("click", () => {
  // Implement logout functionality here
  // Redirect to landing page
  window.location.replace("../index.html");
});

document.addEventListener("DOMContentLoaded", () => {
  let username = localStorage.getItem("current user") || "User";
  let score = localStorage.getItem("score") || 0;
  username = JSON.parse(username);
  document.querySelector("#username").innerText = username.user_name;
  document.querySelector("#score").innerText = username.score;
});
