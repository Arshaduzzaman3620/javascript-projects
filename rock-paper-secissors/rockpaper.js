let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let setIntervalId;

function autoPlay() {
  if (!isAutoPlaying) {
   setIntervalId = setInterval(function () {
    const playerMove = pickComputerMove();
    playGame(playerMove);

  },1000);
  isAutoPlaying = true;
} else {
  clearInterval(setIntervalId);
  isAutoPlaying = false;

}

}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  console.log("Player Move:", playerMove);
  console.log("Computer Move:", computerMove);

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `
    You 
    <img src="/project/rock-paper-secissors/img/${playerMove}-emoji.png" class="move-icon">
    <img src="/project/rock-paper-secissors/img/${computerMove}-emoji.png" class="move-icon">
    Computer
  `;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML = `
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
  `;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return "rock";
  } else if (randomNumber < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}
