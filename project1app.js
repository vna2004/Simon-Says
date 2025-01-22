let gameSeq = [];
let userSeq = [];

let highScore = 0;
let score = 0;
let level = 0;
let btns = ["yellow", "red", "purple", "green"];
let started = false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

let h3 = document.querySelector("h3");

function levelUp() {
  userSeq = [];
  level++;
  h3.innerHTML = `Level ${level}`;

  let rndmIndx = Math.floor(Math.random() * 4);
  let clr = btns[rndmIndx];
  let rndmBtn = document.querySelector(`.${clr}`);
  gameSeq.push(clr);
  console.log(gameSeq);

  gameFlash(rndmBtn);
}

function checkAns(indx) {
  if (userSeq[indx] === gameSeq[indx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over, Your Score is ${level} <br> Press any key start again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);

    score = level;
    if (score >= highScore) {
      highScore = score;
    }
    h2.innerHTML = `High Score : ${highScore}`;
    reset();
  }
}

function btnPress() {
  let btn = this; //this refers to the current button which was clicked just now.
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let bttns = document.querySelectorAll(".btn");
for (btn of bttns) {
  btn.addEventListener("click", btnPress); //Flashes when user clicks on the button!!
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}
