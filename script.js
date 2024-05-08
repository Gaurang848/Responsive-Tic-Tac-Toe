let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let msgcnt = document.querySelector(".winmsg");
let msg = document.querySelector("#msg");
let turnO = true;

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset button
// const resetgame = () => {
//   turnO = true;
//   enableboxes();
//   msgcnt.classList.add("hide");
// };

const resetgame = () => {
  turnO = true;
  count = 0;
  enableboxes();
  msgcnt.classList.add("hide");
  stopWinAnimation();
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const clickSound = () => {
  document.getElementById("clicksound");
  clicksound.play();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    clickSound();
  });
});

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// function for win sound
function playWinSound() {
  const winSound = document.getElementById("winSound");
  winSound.play();
}

function displayWinAnimation() {
  const winAnimation = document.getElementById("winAnimation");
  winAnimation.src = "./excited.gif"; // Set the src attribute to the path of the GIF
  winAnimation.classList.remove("hide"); // Show the animation
}
const stopWinAnimation = () => {
  const winAnimation = document.getElementById("winAnimation");
  winAnimation.src = ""; // Reset the src attribute to stop the animation
  winAnimation.classList.add("hide"); // Hide the animation
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations 🎉, Winner is ${winner}`;
  msgcnt.classList.remove("hide");
  playWinSound(); // Play the winning sound
  disableboxes(); // Disable boxes after game is won
  displayWinAnimation();
};

const checkWinner = () => {
  for (let pattern of winpatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  // Check for a tie
  let isTie = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isTie = false; // There are still empty squares
      break;
    }
  }

  if (isTie) {
    // No winner, it's a tie
    msg.innerText = "It's a tie!";
    msgcnt.classList.remove("hide");
    disableboxes();
    return true;
  }

  return false; // Game is still ongoing
};

resetbtn.addEventListener("click", resetgame);
