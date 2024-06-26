"use strict";
localStorage.removeItem("current user"); // נועד לאיפוס המשתמש הנוכחי שמשחק

document
  .querySelector("#show-register")
  .addEventListener("click", registerPage);

document.querySelector("#show-login").addEventListener("click", loginPage);

document.querySelector("#submit_register").addEventListener("click", registe);
document.querySelector("#submit_login").addEventListener("click", login);

function registerPage(event) {
  event.preventDefault();
  document.querySelector(".login-form").style.display = "none";
  document.querySelector(".register-form").style.display = "block";
}

function loginPage(event) {
  event.preventDefault();
  document.querySelector(".register-form").style.display = "none";
  document.querySelector(".login-form").style.display = "block";
}
function login(event) {
  event.preventDefault();
  let username = document.querySelector("#login-username").value;
  let password = document.querySelector("#login-password").value;
  let user = localStorage.getItem(username);

  // בדיקה אם שם המשתמש קיים ב-localStorage
  if (user) {
    let userDetails = JSON.parse(user);

    // בדיקה אם הסיסמה שהוזנה תואמת לסיסמה ב-localStorage
    if (userDetails.password === password) {
      localStorage.setItem("current user", localStorage.getItem(username));
      window.location.replace("./Pages/menu.html");
      return;
    }
  }

  // הודעת שגיאה אם שם המשתמש או הסיסמה אינם תואמים
  document.querySelector("#dont").style.color = "red";
  setTimeout(() => {
    document.querySelector("#dont").style.color = "black";
  }, 2000);
}

function registe(event) {
  event.preventDefault();
  if (
    !localStorage.getItem(document.querySelector("#register-username").value)
  ) {
    let person = {
      first_name: document.querySelector("#register-firstname").value,
      last_name: document.querySelector("#register-lastname").value,
      user_name: document.querySelector("#register-username").value,
      email: document.querySelector("#register-email").value,
      password: document.querySelector("#register-password").value,
      score: 0,
    };
    if (
      person.first_name &&
      person.last_name &&
      person.user_name &&
      person.email &&
      person.password
    ) {
      localStorage.setItem(
        document.querySelector("#register-username").value,
        JSON.stringify(person)
      );
      let a = document.createElement("a");
      a.setAttribute("id", "show-login");
      a.setAttribute("src", "#");
      a.innerText = "Login";
      document.querySelector("#already").textContent =
        "You have successfully registered ";
      document.querySelector("#already").style.color = "green";
      document.querySelector("#already").append(a);
      a.addEventListener("click", loginPage);
      a.style.cursor = "pointer";
    }
  } else {
    let a = document.createElement("a");
    a.setAttribute("id", "show-login");
    a.setAttribute("src", "#");

    a.innerText = "Login";
    document.querySelector("#already").innerText = " Already have an account? ";
    document.querySelector("#already").style.color = "green";
    document.querySelector("#already").append(a);
    document.querySelector("#already").style.color = "red";
    a.addEventListener("click", loginPage);
    setTimeout(() => {
      document.querySelector("#already").style.color = "black";
    }, 2000);
  }
}
