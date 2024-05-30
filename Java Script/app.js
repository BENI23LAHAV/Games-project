var modal = document.getElementById("myModal");

const span = document.getElementsByClassName("close")[0];

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector("#myModal").style.display = "none";
});
let user;
function xORo(event) {
  user = event.target;
  if (user.classList.contains("x")) {
    user = "x";
    document.querySelector("#myModal").style.display = "none";
  } else {
    user = "o";
    document.querySelector("#myModal").style.display = "none";
  }
  document.querySelector("#what").innerText += " " + user;
}
// document.querySelector(".x").addEventListener("click", xORo);
// document.querySelector(".o").addEventListener("click", xORo);
let children = document.querySelector(".content").children;
for (let element of children) {
  element.addEventListener("click", xORo);
}

children = document.querySelector(".bord").children;

function game(event) {
  for (let i = 0; i < children.length; i++) {
    if (i % 2 === 0) {
      document.querySelector("#turn").innerText = "Computer is playing";
      let num = getNumber();
      while (!children[num].classList.contains("square")) {
        num = getNumber();
      }
      if (user === "x") {
        children[num].classList.add("o");
        children[num].classList.remove("square");
      } else {
        children[num].classList.add("x");
        children[num].classList.remove("square");
      }
    } else {
      document.querySelector("#turn").innerText = "Your turn";
    }
  }
}
function getNumber() {
  return Math.floor(Math.random() * 9);
}

for (let element of children) {
  element.addEventListener("click", game);
}
